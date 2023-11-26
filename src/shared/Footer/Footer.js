import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@njp.com</p>
          <p>Phone: +961 70 000 000</p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/flights">Flights</a></li>
            <li><a href="/destinations">Destinations</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Stay connected with us on social media:</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="icon" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h2>NJP    Airlines</h2>
          <p>&copy; 2023 NJP Airlines</p>
          <p>Website: <a href="https://www.njp.com/">www.njp.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
