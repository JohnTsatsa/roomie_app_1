import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const SignupPage = ({ setIsUserLoggedIn }) => {
    //?   =====   INITIALIZE VALUES OF THE FORM ===   ?//
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // for redirecting the user

    //? ====  WHEN TYPING INTO THE FIELDS  ====  ?//
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };




    //?  ======  SUBMITTING THE FORM  ===== ?//
    const handleSubmit = async (event) => {
        event.preventDefault();

        //using built-in FormData object to retrieve user's inputs
        const formData = new FormData(event.target);
        const userData = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
        //+ alternative way instead of using FormData
        //  const userData = {
        //     username: username,
        //     email: email,
        //     password: password,
        // };

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData), //This is required when sending data in JSON format, as the server needs to know how to parse the incoming data.
            });
            // if we have response from the server that means a new user signed in.
            // we log him automatically and direct him to home page
            if (response.ok) {
                setIsUserLoggedIn(true);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </>

    );
};

export default SignupPage;
