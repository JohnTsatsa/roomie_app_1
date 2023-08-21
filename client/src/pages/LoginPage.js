import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = ({ setIsUserLoggedIn }) => {
    //?   =====   INITIALIZE VALUES   ===   ?//
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(''); // New state to store the user ID


    const navigate = useNavigate(); // for redirecting the user


    //? ====  WHEN TYPING INTO THE FIELDS  ====  ?//
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };



    //?  ======  SUBMITTING THE FORM  ===== ?//
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the data to be sent in the request body
        const userData = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            //If security is a significant concern, using a state management library like Redux or React Context API with server-side session management would be a more secure solution.
            if (response.ok) {
                console.log('Login successful');
                setIsUserLoggedIn(true);
                window.localStorage.setItem("isLoggedin", true)
                const data = await response.json();
                window.localStorage.setItem('userId', data.userId); // Save the userId to localStorage
                navigate('/')
            } else if (response.status === 401) {
                console.log('Invalid credentials');
            } else {
                console.log('Error during login');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }

        // Clear the input fields after the form is submitted
        setUsername('');
        setPassword('');
    };



    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default LoginPage;
