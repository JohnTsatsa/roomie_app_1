import React from 'react';

import RoomCard from './RoomCard'

export default function RoomsPage({ rooms,setRooms,isUserLoggedIn }) {

 
  
  return (
    <div>
      <h1>Rooms page</h1>
      <RoomCard rooms={rooms} isUserLoggedIn={isUserLoggedIn}/>
    </div>
  )
}
