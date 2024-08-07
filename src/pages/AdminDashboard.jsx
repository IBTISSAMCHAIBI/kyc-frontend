import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [clientError, setClientError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [clients, setClients] = useState([]);
  const [emailSendingStatus, setEmailSendingStatus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://kycsystemdevtospace-f5d176f256d2.herokuapp.com/admin_dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setMessage(response.data.message);
        setUsername(response.data.username); // Correctly set the username
      } catch (err) {
        if (err.response && err.response.status === 403) {
          toast.error('Access denied. You do not have permission to view this page.'); // Error notification
          navigate('/login'); // Redirect to login if access is denied
        } else {
          toast.error('An error occurred while fetching dashboard data.'); // Error notification
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, [navigate]);
  
  const handleAddClient = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://kycsystemdevtospace-f5d176f256d2.herokuapp.com/add_client', {
        company: newClientCompany,
        email: newClientEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Client added successfully');
      setSuccessMessage(response.data.success);
      setNewClientCompany('');
      setNewClientEmail('');
      setClientError(null);
      fetchClients(); // Fetch clients after adding a new one
    } catch (error) {
      toast.error('An error occurred while adding the client.');
      setClientError('An error occurred while adding the client.');
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://kycsystemdevtospace-f5d176f256d2.herokuapp.com/clients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(response.data.clients);
      toast.success('Clients fetched successfully');
    } catch (err) {
      toast.error('An error occurred while fetching clients.'); 
      setClientError('An error occurred while fetching clients.');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://kycsystemdevtospace-f5d176f256d2.herokuapp.com/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Clear localStorage on logout
      localStorage.removeItem('token');
      localStorage.removeItem('username'); // Correctly remove username

      // Redirect to login
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out'); 
      console.error('Error logging out:', error);
    }
  };

  const handleSendEmails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://kycsystemdevtospace-f5d176f256d2.herokuapp.com/send-client-emails', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Emails sent successfully');
      setEmailSendingStatus(response.data.success); // Display status message
    } catch (error) {
      toast.error('An error occurred while sending emails.');
      setEmailSendingStatus('An error occurred while sending emails.');
    }
  };

  return (
    <Container fluid className="admin-dashboard">
    <ToastContainer />
      <Row>
        <Col>
          <h1>Admin Dashboard</h1>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Welcome Message</Card.Header>
            <Card.Body>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <div>
                  <p>{message}</p>
                  <p>Username: {username}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Add New Client</Card.Header>
            <Card.Body>
              <form onSubmit={handleAddClient}>
                <div className="mb-3">
                  <label htmlFor="clientCompany" className="form-label">Company</label>
                  <input
                    type="text"
                    id="clientCompany"
                    className="form-control"
                    value={newClientCompany}
                    onChange={(e) => setNewClientCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    id="clientEmail"
                    className="form-control"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    required
                  />
                </div>
                {/* {clientError && <Alert variant="danger">{clientError}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}  */}
                <Button type="submit" variant="primary">Add Client</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {clients.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>Client List</Card.Header>
              <Card.Body>
                <ul>
                  {clients.map(client => (
                    <li key={client.email}>{client.company} - {client.email}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Send Emails to All Clients</Card.Header>
            <Card.Body>
              <Button variant="primary" onClick={handleSendEmails}>Send Emails</Button>
              {/* {emailSendingStatus && <Alert variant="info" className="mt-3">{emailSendingStatus}</Alert>} */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
