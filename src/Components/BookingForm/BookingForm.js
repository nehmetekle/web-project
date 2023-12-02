import React, { useState } from 'react';
import './BookingForm.css';

const ManageBooking = () => {
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookingData, setBookingData] = useState(null);

  const handleSearch = () => {
    // Sample data for demonstration purposes
    const sampleBooking = {
      // Sample booking data...
      bookingReference,
      lastName,
      flightDetails: {
        departureDate: '2023-12-01',
        departureTime: '08:00 AM',
        arrivalTime: '12:00 PM',
        departureAirport: 'DOH',
        arrivalAirport: 'LHR',
        flightNumber: 'QR123',
        seatNumber: '21A',
    },
        passengerDetails: {
        passengerName: 'Zeina',
        ticketClass: 'Business',
        baggageAllowance: '24 kg',
    },
      // Other booking details...
    
    };

    setBookingData(sampleBooking);
  };

  return (
    <div className="manage-booking-container">
      <h1>Manage Booking</h1> 
      <div className="custom-line"></div>
      <div className="search-section">
      <div className="input-section">
        <p className='parag'>Retrieve booking with Booking reference (PNR) <br />
                            Or E-ticket number</p>
        <input
          type="text"
          value={bookingReference}
          onChange={(e) => setBookingReference(e.target.value)}
          placeholder="Booking Reference (PNR) or E-ticket number"
          className='inputs-form'
        />
        <span className="spirit-icons query-icon"></span>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          className='inputs-form'
        />
        </div>
        <div className="custom-line"></div>
        <button className="small-btn" onClick={handleSearch}>Find Booking</button>
      </div>
    <div className="bookingdata">
      {bookingData && (
        <div>
        <h2>Booking Details</h2>
        <p>Booking Reference: {bookingData.bookingReference}</p>
        {/* Display other booking details */}
        {/* Example: */}
        <p>Flight Number: {bookingData.flightDetails.flightNumber}</p>
        <p>Departure Date: {bookingData.flightDetails.departureDate}</p>
        <p>Departure Time: {bookingData.flightDetails.departureTime}</p>
        <p>Arrival Time: {bookingData.flightDetails.arrivalTime}</p>
        <p>Departure Airport: {bookingData.flightDetails.departureAirport}</p>
        <p>Arrival Airport: {bookingData.flightDetails.arrivalAirport}</p>
        <p>Seat Number: {bookingData.flightDetails.seatNumber}</p>
        {/* Display passenger details */}
        {/* Example: */}
        <p>Passenger Name: {bookingData.passengerDetails.passengerName}</p>
        <p>Ticket Class: {bookingData.passengerDetails.ticketClass}</p>
        <p>Baggage Allowance: {bookingData.passengerDetails.baggageAllowance}</p>
        {/* Display other passenger details */}
      </div>
      )}
    </div>
    </div>
  );
};

export default ManageBooking;
