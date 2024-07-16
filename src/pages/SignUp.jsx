import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import subscribe from '../assets/subscribe.png';
import { Link } from 'react-router-dom';
import '../components/Login/Login.css';

const SignUp = () => {
  return (
    <Container fluid className="login-container">
      <Row className="w-100">
        <Col md={5} className="login-left">
          <div className="login-welcome">
            <h1>Sign Up</h1>
            <p>Welcome back to DEVOSPACE. Please enter your credentials below to access your account.</p>
            <img src={subscribe} alt="Login Image" className="login-image" />
          </div>
        </Col>
        <Col md={7} className="login-right">
          <div className="login-form">
            <Button variant="outline-primary" className="google-btn">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" /> Sign in with Google
            </Button>
            <hr className="divider" />
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-right">
                  <a href="#" className="forgot-password">Forgot password?</a>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formCheckbox">
                <Form.Check type="checkbox" label="Stay logged in for one week" />
              </Form.Group>
              <Link to="/Login">
              <Button variant="primary" type="submit" className="login-btn">
                Sign Up
              </Button>
              </Link>
              <p className="signup-link">
                do you  have an account? <Link to="/Login">Login</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
