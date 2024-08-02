
import { Container} from 'react-bootstrap';
import head_rightImg from '../assets/headerRght.png';
import '../components/Dataverification/ErrorPage.css';


function Linkexpired() {
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
        <h1 className="error-title">sorry your link is  expired</h1>
        <p className="error-message">
            ask your monitore to send link again
        </p>
        <div className="error-buttons">
        </div>
      </div>
    </div>
    </Container>
  );
}

export default Linkexpired;