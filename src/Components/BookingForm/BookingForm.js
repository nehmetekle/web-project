// BookingForm.js
import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onSubmit, onCancel }) => {
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit the form data
    if (bookingReference && lastName) {
      onSubmit({ bookingReference, lastName });
    }
  };

  const handleCancel = () => {
    // Handle cancel action
    onCancel();
  };

  return (
    <div className="container">
      <form className="booking-form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        Booking Reference:
        <input
          className="form-input"
          type="text"
          value={bookingReference}
          onChange={(e) => setBookingReference(e.target.value)}
        />
      </label>
      <label className="form-label">
        Last Name:
        <input
          className="form-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
     <div className="buttons">
     <button className="form-button" type="submit">Retrieve Booking</button>
      <button className="cancel-booking" type="button" onClick={handleCancel}>Cancel Flight</button>
     </div>
    </form>
    </div>
  );
};

export default BookingForm;
