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
    <form className="booking-form" onSubmit={handleSubmit}>
      <label>
        Booking Reference:
        <input
          type="text"
          value={bookingReference}
          onChange={(e) => setBookingReference(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <button type="submit">Retrieve Booking</button>
      <button type="button" onClick={handleCancel}>Cancel Flight</button>
    </form>
  );
};

export default BookingForm;
