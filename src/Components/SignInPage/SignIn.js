// Login.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the corresponding error when the user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   setErrors({
    //     ...errors,
    //     email: 'Invalid email address',
    //   });
    //   return;
    // }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      history.push('/home');
    } else {
      setErrors({
        ...errors,
        msg: 'Invalid username or password',
      });
    }
  };

  const handleCreateAccount = () => {
    history.push('/sign-up');
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="login-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />

          <label className="login-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          {errors.msg && <p className="error-message">{errors.msg}</p>}

          <div className="buttons">
            <button type="submit" className="login-button">
              Login
            </button>
            <button onClick={handleCreateAccount} className="create-account-button">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
