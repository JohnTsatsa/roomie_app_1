import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AddNewRoom({ setNewRoomSaved }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate(); // for redirecting the user

    /// ======== SUBMITTING THE FORM FOR ADDING A NEW ROOM ============ ///
    const handleSubmit = async (event) => {
        event.preventDefault();


        const formData = new FormData(event.target);
        const roomData = {
            title: formData.get("title"),
            description: formData.get("description"),
            phoneNumber: formData.get("phoneNumber"),
        };

        try {
            const response = await fetch('http://localhost:3001/addNewRoom', {
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
                setTitle('');
                setDescription('');
                setPhoneNumber('');
            }
        } catch (err) {
            console.log(err);
        }


        setNewRoomSaved(prevState => !prevState);
        navigate('/rooms');

    };






    return (
        <div>
            <h2>Add a New Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default AddNewRoom;
