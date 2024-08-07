import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogin = () => {
    const [message, setMessage] = useState('Logging you in...');
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const email = params.get('email');

        console.log('Token:', token); // Debugging output
        console.log('Email:', email); // Debugging output

        // Store the token and email in local storage
        if (token) {
            localStorage.setItem('token', token);
        } else {
            console.error('Token is missing');
        }

        if (email) {
            localStorage.setItem('username', email);
        } else {
            console.error('Email is missing');
        }

        // Check if both token and email are present
        if (token && email) {
            // POST request to the backend
            fetch('https://kycsystemdevtospace-f5d176f256d2.herokuapp.com/auto-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, email }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response data:', data);
                if (data.status === 'success') {
                    // Redirect after successful login
                    navigate('/process');
                } else if (data.message === 'Token has already been used' || data.message === 'Token has expired') {
                    // Display link expired message
                    navigate('/Linkexpired');
                } else {
                    // Redirect to login on other errors
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Error during auto-login:', error);
                // Redirect to login on error
                navigate('/login');
            });
        } else {
            console.log('Redirecting to /login due to missing token or email');
            navigate('/login');
        }
    }, [navigate]);

    return <div>{message}</div>;
};

export default AutoLogin;
