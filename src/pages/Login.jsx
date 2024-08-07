import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import subscribe from '../assets/subscribe.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Login/Login.css';
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
// import { app } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';
// const baseURL = import.meta.env.REACT_APP_BASE_URL;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleGoogleSignIn = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth(app);

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     const token = await user.getIdToken();

  //     const response = await axios.post('http://localhost:5000/google-login', { token });

  //     localStorage.setItem('token', response.data.token);  
  //     localStorage.setItem('role', response.data.role);  // Store user role
  //     toast.success('Successfully authenticated with Google!');
  //     navigate('/process');  // Redirect to the dashboard
  //   } catch (error) {
  //     toast.error('Error signing in with Google.');
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://kyc-backend-api-bfb5ecbf820e.herokuapp.com/login`, { username, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      // localStorage.setItem('username', response.data.username);  // Store user role
      toast.success('Successfully logged in!');

      // Redirect based on user role
      const role = response.data.role;
      if (role === 'admin') {
        navigate('/admin-dashboard');  // Redirect to admin dashboard
      } else {
        navigate('/process');  // Redirect to user dashboard
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="w-100">
        <Col md={5} className="login-left">
          <div className="login-welcome">
            <h1>Login</h1>
            <p>Welcome back to DEVOSPACE. Please enter your credentials below to access your account.</p>
            <img src={subscribe} alt="Login Image" className="login-image" />
          </div>
        </Col>
        <Col md={7} className="login-right">
          <div className="login-form">
            {/* <Button variant="outline-primary" className="google-btn" onClick={handleGoogleSignIn}>
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" /> Continue with Google
            </Button> */}
            <hr className="divider" />
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="firstnam.lastnam@domain.com" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" className="login-btn">
                Login
              </Button>
              <p className="signup-link">
                Dont have an account? <Link to="/SignUp">Sign Up</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Login;
