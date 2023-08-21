///  CREATE TWO FOLDERS (CLIENT & SERVER) ///
//+ client is for the front end, server is for the backend

//+ in client folder in the terminal type 'npx create-react-app projectName
//+ in server folder int the terminal type 'npm init -y'


/// ==========  SERVING REACT PAGES ================== ///
//+ in react project in the terminal 'npm run build'
//+ this will create a 'build' folder. Copy paste it to 'server' folder

//+ serve static files so it will render react pages
//+ in server => index.js
const path = require('path'); // for rendering react pages

app.use(express.static(path.join(__dirname, 'build'))); // the path that serves rendering React pages

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); //for rendering react pages
});



///  ===================    WORKING ON SERVER FOLDER  ===================  ///
//+ create an index file.
//+ Install express and nodemon
//+ Start the server with the following commands
const express = require('express')
const app = express()

app.listen(3001, () => {  // different port from the react that is running in 3000
    console.log('Listening on port 3001')
})

//+ serve static files so it will render react pages
const path = require('path'); // for rendering react pages

app.use(express.static(path.join(__dirname, 'build'))); // the path that serves rendering React pages

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); //for rendering react pages
});


  //+ in order to accept requests from react you need to install 'cors' and use it




