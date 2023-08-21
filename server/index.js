const express = require('express')
const app = express()
const cors = require('cors');   // usefull for sending requests to server
const mongoose = require('mongoose'); // for using database Mongo
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const path = require('path'); // for rendering react pages

app.use(express.static(path.join(__dirname, 'build')));  // the path that serves rendering React pages //?????   NEEDS  ??????
app.use(express.json());   //  Parse JSON data that come from the body when submitting the form
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions))  // usefull for taking requests from react


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    key: "userId",
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 7
    }
}))


//?   ==============    CONNECTING TO DATABASE  =================  ?//
mongoose.connect('mongodb://127.0.0.1:27017/roomiesUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//?   ==============    CONFIGURE DATABASE FOR USERS   =================  ?//
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


//?   ==============    CONFIGURE DATABASE FOR ROOMS   =================  ?//
const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    creatorId: { type: String, required: true }
});

const Room = mongoose.model('Room', roomSchema);


app.get('/checkAuth', (req, res) => {
    if (req.session.userId) {
        // User is authenticated, send a success response with user details if needed
        // For example, here we are just sending a boolean value indicating authentication status.
        res.status(200).json({ authenticated: true });
    } else {
        // User is not authenticated, send a failure response
        res.status(401).json({ authenticated: false });
    }
});


/// =========   SUBMITTING THE SIGNUP FORM  =============  ///
//. TODO: CHECK IF MAIL OR USERNAME ALREADY EXISTS
//. TODO: ENCRYPT PASSWORD

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    // creates the id
    const newUser = new User({
        username,
        email,
        password,
    });
    await newUser.save();
    res.send('new user signed up')
});

/// =========   SUBMITTING THE LOGIN FORM  =============  ///
//.TODO: BASIC PROTECTION OF THE INPUTS
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('this is id of user: ', req.session)
    try {
        // Find the user in the database with the given username and password
        const user = await User.findOne({ username, password });
        if (user) {
            // If a user is found with the provided username and password, we have a match
            console.log('we have a match');
            req.session.userId = user._id;
            console.log(req.session.userId)
            res.status(200).json({ userId: user._id }); // Send user ID in the response
        } else {
            // If no user is found with the provided credentials, login failed
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


/// ===============   DISPLAY ALL ROOMS  ==================== ///
app.get('/rooms', async (req, res) => {

    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

app.get('/addNewRoom', (req, res) => {
    res.send('todo bien')
})


/// ====================   ADDING  NEW  ROOM   =====================  ///
app.post('/addNewRoom', async (req, res) => {

    const { title, description, phoneNumber } = req.body;
    const userId = req.session.userId; // Use the userId from the session

    const newRoom = new Room({
        title,
        description,
        phoneNumber,
        creatorId: userId
    });
    await newRoom.save();
    res.json({ room: newRoom, creatorId: userId });
});


app.post('/room/edit/:id', async (req, res) => {
    const roomId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
       return res.status(400).json({ error: 'Invalid roomId' });
    }
 
    try {
       const room = await Room.findById(roomId);
       if (!room) {
        console.log(room)
          return res.status(404).json({ error: 'Room not found' });
       }
 
       // Update the room fields with new values
       const { title, description, phoneNumber } = req.body;
       
       room.title = title; // Set the new title
       room.description = description; // Set the new description
       room.phoneNumber = phoneNumber;
      
 
       // Save the updated room back to the database
       await room.save();
 
       return res.status(200).json({ message: 'Room updated successfully' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal server error' });
    }
 });


 app.delete('/room/delete/:id', async (req, res) => {
    const roomId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ error: 'Invalid roomId' });
    }
  
    try {
      // Find the room by ID and delete it from the database
      const deletedRoom = await Room.findByIdAndRemove(roomId);
      if (!deletedRoom) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      return res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  



// app.post('/logout', (req, res) => {
//     console.log('logout handler')
//     // Check if the user is logged in
//     if (req.session.userId) {
//       // Destroy the session to log the user out
//       req.session.destroy((err) => {
//         if (err) {
//           console.error('Error destroying session:', err);
//           res.status(500).json({ error: 'Failed to logout' });
//         } else {
//           res.status(200).json({ message: 'Logout successful' });
//         }
//       });
//     } else {
//       // If the user is not logged in, send a failure response
//       res.status(401).json({ error: 'Not logged in' });
//     }
//   });




/// =================  ALL REQUESTS  =================== ///   
//!  for rendering react pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.listen(3001, () => {  //  needs to be different port from the react that is running in 3000
    console.log('Listening on port 3001')
})
