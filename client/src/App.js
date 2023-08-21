
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RoomsPage from './pages/RoomsPage';
import Navbar from './pages/Navbar';
import AddNewRoom from './pages/AddNewRoom';
import RoomDetail from './pages/RoomDetail';
import EditRoom from './pages/EditRoom';

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(window.localStorage.isLoggedin);
  const [rooms, setRooms] = useState([]);
  const [newRoomSaved, setNewRoomSaved] = useState(false)

  useEffect(() => {
    // Fetch rooms from the backend when the component mounts
    fetch('http://localhost:3001/rooms')
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, [newRoomSaved]);

  useEffect(() => {
    // Send a GET request to check the authentication status
    fetch('http://localhost:3001/checkAuth', {
      credentials: 'include', // Explicitly include credentials
    })
      .then((response) => {
        console.log(window.localStorage)
        if (window.localStorage.isLoggedin && response.ok) {
          setIsUserLoggedIn(true); // User is authenticated
        } else {
          setIsUserLoggedIn(false); // User is not authenticated
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <>
      <Router>
        <Navbar isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
        <Routes>
          <Route exact path='/' element={<HomePage isUserLoggedIn={isUserLoggedIn} />} />
          <Route exact path='/login' element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />} />
          <Route exact path='/signup' element={<SignupPage setIsUserLoggedIn={setIsUserLoggedIn} />} />
          <Route exact path='/rooms' element={<RoomsPage rooms={rooms} setRooms={setRooms} isUserLoggedIn={isUserLoggedIn} />} />
          <Route exact path='/addNewRoom' element={<AddNewRoom setNewRoomSaved={setNewRoomSaved} />} />
          <Route path="/room/:roomId" element={<RoomDetail rooms={rooms} setNewRoomSaved={setNewRoomSaved}/>} />
          <Route path="/room/edit/:roomId" element={<EditRoom rooms={rooms} setNewRoomSaved={setNewRoomSaved}/>} />
        </Routes>
      </Router >
    </>

  )
}

export default App;
