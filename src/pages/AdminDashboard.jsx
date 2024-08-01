import { useState ,useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [clientError, setClientError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Added state for success message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin_dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMessage(response.data.message);
        setUsername(response.data.username); // Correctly set the username
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Access denied. You do not have permission to view this page.');
          navigate('/login'); // Redirect to login if access is denied
        } else {
          setError('An error occurred while fetching dashboard data.');
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
      const response = await axios.post('http://localhost:5000/add_client', {
        company: newClientCompany,
        email: newClientEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccessMessage(response.data.success); // Display success message
      setNewClientCompany('');
      setNewClientEmail('');
      setClientError(null);
    } catch (error) {
      setClientError('An error occurred while adding the client.');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Clear localStorage on logout
      localStorage.removeItem('token');
      localStorage.removeItem('username'); // Correctly remove username

      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container fluid className="admin-dashboard">
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
                {clientError && <Alert variant="danger">{clientError}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}
                <Button type="submit" variant="primary">Add Client</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
