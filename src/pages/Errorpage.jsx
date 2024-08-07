
import { Container ,Button } from 'react-bootstrap';
import head_rightImg from '../assets/headerRght.png';
import '../components/Dataverification/ErrorPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ErrorPage() {
    const navigate=useNavigate()
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
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
  return (
    <Container fluid >
    <div className="error-page">
    <div className="header">
        <div className="header-content">
          {/* <img src={logo} alt="Devospace Logo" className="logo" /> */}
          <div className="text-content">
            <h1>DEVOSPACE</h1>
            {/* <img src={logo} alt="Devospace Logo" className="logo" /> */}
            <p>Seamless Real-time <span className="highlight">Identity</span> Verification</p>
          </div>
        </div>
        <div className="image-container">
          <img src={head_rightImg} alt="Verification Process" className="verification-image" />
        </div>
      </div>
      <div className="error-content">
        <div className="error-icon-container">
          <div className="error-icon">⚠️</div>
        </div>
        <h1 className="error-title">sorry we coudnt unsure that you are the reel person</h1>
        <p className="error-message">
          your image card not conforme with your live picture
        </p>
        <div className="error-buttons">
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
    </Container>
  );
}

export default ErrorPage;