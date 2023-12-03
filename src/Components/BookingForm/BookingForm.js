import React, { useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove as removeData,
} from "firebase/database";
import { db } from "..//../firebase";
import "./BookingForm.css";

const ManageBooking = () => {
  const [eTicket, setETicket] = useState("");
  const [bookingData, setBookingData] = useState(null);

  const handleSearch = async () => {
    try {
      // Verify eTicket with local storage
      const storedETicket = localStorage.getItem("eTicket");

      console.log("eTicket:", eTicket);
      console.log("storedETicket:", storedETicket);

      if (eTicket === storedETicket) {
        // Retrieve user data from the "booking_history" database
        const userId = localStorage.getItem("userId");
        const bookingRef = ref(db, `booking_history/${userId}`);

        console.log("userId:", userId);
        console.log("bookingRef:", bookingRef);

        // Fetch user data from the database
        onValue(bookingRef, (snapshot) => {
          const userData = snapshot.val();

          console.log("userData:", userData);

          setBookingData(userData);
        });
      } else {
        alert("Invalid eTicket");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleCancel = async () => {
    try {
      // Remove the booking from the "booking_history" database
      const userId = localStorage.getItem("userId");
      const bookingRef = ref(db, `booking_history/${userId}`);

      // Remove data from the database
      await removeData(bookingRef);

      // Clear the displayed booking data
      setBookingData(null);
    } catch (error) {
      console.error("Error during cancellation:", error);
    }
  };

  return (
    <div className="manage-booking-container">
      <h1>Manage Booking</h1>
      <div className="custom-line"></div>
      <div className="search-section">
        <div className="input-section">
          <p className="parag">Retrieve booking with E-ticket</p>
          <input
            type="text"
            value={eTicket}
            onChange={(e) => setETicket(e.target.value)}
            placeholder="E-ticket"
            className="inputs-form"
          />
        </div>
        <div className="custom-line"></div>
        <button className="small-btn" onClick={handleSearch}>
          Find Booking
        </button>
      </div>
      {bookingData && (
        <div className="bookingdata">
          <h2>Booking Details</h2>
          {/* Display user data */}
          <p>User ID: {bookingData.userId}</p>
          <p>Email: {bookingData.email}</p>
          {/* Display other user data */}
          {/* Example: */}
          <p>Flight Number: {bookingData.flightDetails.flightNumber}</p>
          <p>Departure Date: {bookingData.flightDetails.departureDate}</p>
          {/* Display other booking details */}
          <button className="small-btn" onClick={handleCancel}>
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
