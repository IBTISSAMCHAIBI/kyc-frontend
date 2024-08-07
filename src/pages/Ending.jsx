
import { Container } from 'react-bootstrap';
import head_rightImg from '../assets/headerRght.png';
import '../components/Dataverification/Ending.css'

const Ending= () => {
  return (
    <Container fluid >
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
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Data Verification</h3>
          <p className="text-center">
            Based on the results of the comparison between facial recognition and your ID card document, we have determined that you are not the same person.
          </p>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Document Verification</th>
                <th>Face Recognition</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EyeLookOutLeft</td>
                <td>0.2346719</td>
                <td>0.673975</td>
                <td>
                  <span className="text-danger">&#x2716;</span>
                </td>
              </tr>
              <tr>
                <td>EyeLookInRight</td>
                <td>0.1747629</td>
                <td>0.284729</td>
                <td>
                  <span className="text-danger">&#x2716;</span>
                </td>
              </tr>
              <tr>
                <td>Smile</td>
                <td>0.1987292</td>
                <td>0.1987292</td>
                <td>
                  <span className="text-success">&#x2714;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary">Continue</button>
      </div>
    
      </Container>
  );
};

export default Ending;
