import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if not authenticated
          return;
        }

        const response = await axios.get('http://localhost:5000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data.user_data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('screenshot', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/save-screenshot', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const handleFileRetrieval = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/get-screenshot', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for receiving file content
      });

      const url = URL.createObjectURL(new Blob([response.data]));
      setImageUrl(url);
    } catch (error) {
      console.error('Error retrieving file:', error);
      alert('Error retrieving file');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token'); // Clear the token
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Welcome, {userData.first_name}!</h1>
          <p>Email: {userData.email}</p>
          <Form.Group controlId="fileUpload">
            <Form.Label>Upload Screenshot</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleFileUpload}>Upload Screenshot</Button>
          <Button variant="secondary" onClick={handleFileRetrieval} style={{ marginLeft: '10px' }}>Retrieve Screenshot</Button>
          {imageUrl && <img src={imageUrl} alt="Uploaded screenshot" style={{ marginTop: '20px', maxWidth: '100%' }} />}
          <Button variant="danger" onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</Button>
          <Link to="/process">
          <Button>
            start verification process 
          </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
