// SignUp.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Validate password criteria
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Password must be at least 8 characters, including uppercase and lowercase letters, special characters, and digits.');
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(formData));

    // Redirect to login page
    history.push('/sign-in');
  };

  return (
    <div className="container">
      <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <div className="error-message">{emailError}</div>

        <label className="signup-label">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <div className="error-message">{passwordError}</div>

        <label className="signup-label">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <div className="error-message">{confirmPasswordError}</div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
