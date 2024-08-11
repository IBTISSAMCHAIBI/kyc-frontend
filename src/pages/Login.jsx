import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import subscribe from '../assets/subscribe.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Login/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CONFIG } from './config';
const baseURL = CONFIG.BASE_URL;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, { username, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      toast.success('Successfully logged in!');
      const role = response.data.role;
      if (role === 'admin') {
        navigate('/admin-dashboard'); 
      } else {
        navigate('/process');  
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
            <img src={subscribe} alt="Login Image" className="login-image d-none d-md-block" />
          </div>
        </Col>
        <Col md={7} className="login-right">
          <div className="login-form">
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
