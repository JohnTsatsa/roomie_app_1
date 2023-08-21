import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function HomePage({ isUserLoggedIn }) {

  const navigate = useNavigate(); // for redirecting the user


  return (
    <div>
      <h1>Home page</h1>
      <button onClick={() => navigate('/rooms')}>View Rooms</button>
      <button onClick={() => isUserLoggedIn ? navigate('/addNewRoom') : navigate('/login')}>Add New Room</button>
    </div>
  )
}
