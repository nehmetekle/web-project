import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
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

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const dataRef = ref(db, "users");
        onValue(dataRef, (snapshot) => {
          const fetchedData = snapshot.val();
          if (fetchedData) {
            const users = Object.values(fetchedData);
            setUsersData(users);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsersData();
  }, []);

  const userExists = usersData.some(
    (user) => user.email === formData.email && user.password === formData.password
  );

  const currentUser = usersData.find(
    (user) => user.email === formData.email && user.password === formData.password
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
      });
      return;
    }

    if (!userExists) {
      setErrors({
        password: 'Incorrect password',
      });
      return;
    } else {

      setErrors({
        ...errors,
        password: '',
      });

      const { userID } = currentUser;
      

      window.localStorage.setItem("user", JSON.stringify(currentUser));
      window.location.href = "/";
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
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label className="login-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

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
