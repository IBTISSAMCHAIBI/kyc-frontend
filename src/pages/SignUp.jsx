import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import subscribe from '../assets/subscribe.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Login/Login.css';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google User Info:', user);
      setMessage('Successfully signed up with Google!');
      setSuccess(true);
      // Redirect to login page
      navigate('/Login');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setMessage('Error signing up with Google.');
      setSuccess(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Sign-Up Button Clicked'); // Debug log
    try {
      const response = await axios.post('http://localhost:5000/create_user', { username: username, password: password });
      console.log('Response:', response.data); // Debug log
      setMessage('Successfully signed up!');
      setSuccess(true);
      // Redirect to login page
      navigate('/Login');
    } catch (error) {
      console.error('Error:', error); // Debug log
      setMessage(error.response?.data?.error || 'An error occurred');
      setSuccess(false);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="w-100">
        <Col md={5} className="login-left">
          <div className="login-welcome">
            <h1>Sign Up</h1>
            <p>Welcome to DEVOSPACE. Please enter your credentials below to create a new account.</p>
            <img src={subscribe} alt="Login Image" className="login-image" />
          </div>
        </Col>
        <Col md={7} className="login-right">
          <div className="login-form">
            <Button variant="outline-primary" className="google-btn" onClick={handleGoogleSignUp}>
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" /> Continue with Google
            </Button>
            <hr className="divider" />
            <Form onSubmit={handleSignUp}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Form.Text className="text-right">
                  <a href="#" className="forgot-password">Forgot password?</a>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formCheckbox">
                <Form.Check type="checkbox" label="Stay logged in for one week" />
              </Form.Group>
              <Button variant="primary" type="submit" className="login-btn">
                Sign Up
              </Button>
              <p className="signup-link">
                Do you have an account? <Link to="/Login">Login</Link>
              </p>
              {message && <p className={success ? 'text-success' : 'text-danger'}>{message}</p>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
