import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function EditRoom({ rooms, setNewRoomSaved }) {
   const navigate = useNavigate(); // for redirecting the user

   const { roomId } = useParams();
   const [selectedRoom, setSelectedRoom] = useState(null);

   // if I hadnt done it like this,whenever a user refreshed the page would show'room not found'
   useEffect(() => {
      // Find the selected room when the rooms prop changes
      const room = rooms.find((room) => room._id === roomId);
      setSelectedRoom(room);
   }, [rooms, roomId]);




   if (!selectedRoom) {
      return <div>Room not found</div>;
   }

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSelectedRoom((prevRoom) => ({
         ...prevRoom,
         [name]: value,
      }));
   };


   const handleSave = async (event) => {
      event.preventDefault();
      console.log('saving the edit form')
      const formData = new FormData(event.target);
      const roomData = {
         title: formData.get("title"),
         description: formData.get("description"),
         phoneNumber: formData.get("phoneNumber"),
      };
      try {
         const response = await fetch(`http://localhost:3001/room/edit/${selectedRoom._id}`, {
            method: "POST",
            credentials: 'include',
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(roomData), //This is required when sending data in JSON format, as the server needs to know how to parse the incoming data.
         });
         // if we have response from the server that means a new user signed in.
         // we log him automatically and direct him to home page
         if (response.ok) {
            console.log('new room added')
            setNewRoomSaved(prevState => !prevState);
            navigate('/rooms');
         }
      } catch (err) {
         console.log(err);
      }
   }




   return (
      <div>
         <h2>Edit Room</h2>
         <form onSubmit={handleSave}>
            <div>
               <label htmlFor="title">Title:</label>
               <input
                  type="text"
                  id="title"
                  name="title"
                  value={selectedRoom.title}
                  onChange={handleInputChange}
                  required
               //readOnly // Set the input to read-only to prevent editing
               />
            </div>
            <div>
               <label htmlFor="description">Description:</label>
               <textarea
                  id="description"
                  name="description"
                  value={selectedRoom.description}
                  onChange={handleInputChange}
                  required
               //readOnly // Set the textarea to read-only to prevent editing
               />
            </div>
            <div>
               <label htmlFor="phoneNumber">Phone Number:</label>
               <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={selectedRoom.phoneNumber}
                  onChange={handleInputChange}
                  required
               //readOnly // Set the input to read-only to prevent editing
               />
            </div>
            <button>Save</button>
            <button type="button" onClick={() => navigate(`/room/${selectedRoom._id}`)}>Cancel</button>
         </form>
      </div>
   );
}

export default EditRoom;
