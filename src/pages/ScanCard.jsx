import React from 'react';
import '../components/Dataverification/ScanFacePage.css'
import { Link } from 'react-router-dom';

const ScanCrad = () => {
    return (
      <div className="scan-container">
        <div className="left-section">
        <h1>Verification Steps</h1>
      <ul>
        <li>
          <input type="checkbox" /> Turn your eyes to the right, then to the left
        </li>
        <li>
          <input type="checkbox" /> Turn your face to the right
        </li>
        <li>
          <input type="checkbox" /> Turn your face to the left
        </li>
        <li>
          <input type="checkbox" /> The front of the Document.
        </li>
      </ul>
          <h2 className="heading">Scanning your face</h2>
          <p className="description">Please Wait for the Scan to Complete Before Proceeding to the Next Step</p>
          <div className="input-group">
            <label htmlFor="eyeLookOutLeft">EyeLookOutLeft</label>
            <input type="text" id="eyeLookOutLeft" name="eyeLookOutLeft" disabled />
          </div>
          <div className="input-group">
            <label htmlFor="eyeLookInRight">EyeLookInRight</label>
            <input type="text" id="eyeLookInRight" name="eyeLookInRight" disabled />
          </div>
          <div className="input-group">
            <label htmlFor="smile">Smile</label>
            <input type="text" id="smile" name="smile" disabled />
          </div>
        </div>
        <div className="right-section">
          <img src='/card.png' alt="Scanning Face" className="scan-image" />
          <button className="continue-button">take picture</button>
          <div className="button-container">
            <Link to="/dataverficationcompleted">
              <button className="continue-button">CONTINUE</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

export default ScanCrad;
