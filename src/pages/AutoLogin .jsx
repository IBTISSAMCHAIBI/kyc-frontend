import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogin = () => {
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
            fetch('http://localhost:5000/auto-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, email }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response data:', data);
                // Redirect after successful login
                navigate('/process');
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

    return <div>Logging you in...</div>;
};

export default AutoLogin;
