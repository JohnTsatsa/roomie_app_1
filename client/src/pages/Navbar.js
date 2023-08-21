import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Navbar({ isUserLoggedIn, setIsUserLoggedIn }) {

    const login_logout = isUserLoggedIn ? 'Logout' : 'Login'

    const navigate = useNavigate(); // for redirecting the user


    const handleLoginLogout = () => {
        if (isUserLoggedIn) {
            console.log('user logged out')
            window.localStorage.clear("isLoggedin")
            setIsUserLoggedIn(false)
        } else {
            console.log('user about to login')
            navigate('/login');
        }
    }


    // const handleLoginLogout = () => {
    //     if (isUserLoggedIn) {
    //         console.log('user logged out');
    //         // Make a POST request to the logout route on the backend
    //         fetch('http://localhost:3001/logout', {
    //             method: 'POST',
    //             credentials: 'include', // To include cookies in the request
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 setIsUserLoggedIn(false);
    //                 // Redirect the user to the home page
    //                 navigate('/');
    //             })
    //             .catch((error) => {
    //                 console.error('Error during logout:', error);
    //             });
    //     } else {
    //         console.log('user about to login');
    //         navigate('/login');
    //     }
    // };


    const handleSignup = () => {
        console.log('user about to signup')
        navigate('/signup')
    }


    return (
        <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/rooms')}>Rooms</li>
            {!isUserLoggedIn && <li onClick={handleSignup}>Signup</li>}
            <li onClick={handleLoginLogout}>{login_logout}</li>
        </ul>
    )
}
