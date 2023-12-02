// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from '../src/shared/Navbar/Navbar';
import HomePage from '../src/Components/HomePage/HomePage';
import SignIn from '../src/Components/SignInPage/SignIn';
import SignUp from '../src/Components/SignUpPage/SignUp'; // Assuming you have a SignUp component
import Footer from '../src/shared/Footer/Footer';
import ContactUs from '../src/Components/ContactUs/ContactUs';
import BookingForm from '..//src/Components/BookingForm/BookingForm';
import SpecialOffers from './Components/SpecialOffers/SpecialOffers';
import FlightStatus from './Components/FllightStatus/FlightStatus';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div>
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
        <Switch>
          <Route exact path="/sign-in">
            {loggedInUser ? <Redirect to="/sign-in" /> : <SignIn onLogin={handleLogin} />}
          </Route>
          <Route exact path="/sign-up">
            {loggedInUser ? <Redirect to="/signup" /> : <SignUp onLogin={handleLogin} />}
          </Route>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/flight-status" component={FlightStatus}/>
          <Route exact path="/contact-us" component={ContactUs} />  
          <Route exact path="/manage-booking" component={BookingForm}></Route>
          <Route exact path="/special-offers" component={SpecialOffers}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
