import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function RoomDetail({ rooms, setNewRoomSaved }) {
  const { roomId } = useParams();
  const [isUserAuthorised, setIsUserAuthorised] = useState(false)
  const userLoggedInId = window.localStorage.getItem('userId');


  const navigate = useNavigate(); // for redirecting the user

  // Find the selected room based on the roomId from the rooms array
  const selectedRoom = rooms.find((room) => room._id === roomId);
  let creatorOfRoom



  useEffect(() => {
    if (selectedRoom) {
      const creatorOfRoom = selectedRoom.creatorId;
      if (creatorOfRoom === userLoggedInId) {
        setIsUserAuthorised(true);
      }
    }
  }, [selectedRoom, userLoggedInId]);

  if (!selectedRoom) {
    return <div>Room not found</div>;
  }



  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend API to delete the room
      const response = await fetch(`http://localhost:3001/room/delete/${selectedRoom._id}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies in the request (since you are using sessions)
      });

      // After successful deletion, navigate back to the rooms list
      if (response.ok) {
        console.log('room deleted')
        setNewRoomSaved(prevState => !prevState);
        navigate('/rooms');
      }

    } catch (error) {
      console.error('Error while deleting room:', error);
      // Handle error if needed
    }
  };


  return (
    <div>
      <h2>{selectedRoom.title}</h2>
      <h3>Description</h3>
      <p>{selectedRoom.description}</p>
      <h4>Phone Number</h4>
      <p>{selectedRoom.phoneNumber}</p>
      <button onClick={() => navigate('/rooms')}>Back</button>
      {isUserAuthorised && (
        <>
          <button onClick={() => navigate(`/room/edit/${selectedRoom._id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default RoomDetail;
