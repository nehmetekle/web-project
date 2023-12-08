import React, { useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  get,
  remove as removeData,
  child,
} from "firebase/database";
import { db } from "..//../firebase";
import "./BookingForm.css";
import { useEffect } from "react";



const ManageBooking = () => {
  const [historyData, setHistoryData] = useState([]);
  const [specialData, setSpecialData] = useState([]);
  const [userFlights, setUserFlights] = useState([])

  const user = JSON.parse(window.localStorage.getItem('user'))


  const History = ({ his }) => {
    const listOffers = his.map((data) => (
      <DataHis key={data.eTicket} flight={data} />
    ));
    return listOffers;
  };
  
  const DataHis = ({ flight }) => (
    <div className="test">
      <table className="flight-table">
        <thead>
          <tr>
            <th>eTicket</th>
            <th>Arrival Date</th>
            <th>Departure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{flight.eTicket}</td>
            <td>{flight.data.arrival}</td>
            <td>{flight.data.depature}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  useEffect(() => {
    const fetchData = () => {

      try {
     
        const dbRef = ref(getDatabase());
      
        get(child(dbRef, `booking_history`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.values(snapshot.val());
                    
            let newUserHistories = []
            data.forEach((data) => {
              if(data.user_id == user.userId) {
                newUserHistories.push(data)
              }
            })
            setHistoryData(newUserHistories);

            let userFlights = []
            get(child(dbRef, `special_offers`)).then((snapshot) => {
              if (snapshot.exists()) {
                const data = Object.values(snapshot.val());
                setSpecialData(data);
               
                  newUserHistories.forEach((history) => {
                    data.forEach((data) => {
                      if(data.id === history.offerId) {
                        let newData = {
                          data,
                          eTicket: history.eTicket 
                        }
                        userFlights.push(newData)
                      }
                  })
                })
              }

              console.log(userFlights)
              setUserFlights(userFlights)
            }).catch((error) => {
              console.error(error);
            });
    


          }
        }).catch((error) => {
          console.error(error);
        });

      } catch (error) {
        console.error("Error fetching special offers:", error.message);
      }
    };
    fetchData();
  }, []);
  // const handleCancel = async () => {
  //   try {
  //     // Remove the booking from the "booking_history" database
  //     const userId = localStorage.getItem("userId");
  //     const bookingRef = ref(db, `booking_history/${userId}`);

  //     // Remove data from the database
  //     await removeData(bookingRef);

  //     // Clear the displayed booking data
  //     setBookingData(null);
  //   } catch (error) {
  //     console.error("Error during cancellation:", error);
  //   }
  // };
   

  return (
    <div className="manage-booking-container">
      <h1>Manage Booking</h1>
      <div className="custom-line"></div>
      <div className="search-section">
        <div className="input-section">
          <p className="parag">Retrieve booking with E-ticket</p>
          {/* <input
            type="text"
            value={eTicket}
            onChange={(e) => setETicket(e.target.value)}
            placeholder="E-ticket"
            className="inputs-form"
          /> */}
        </div>
        <div className="custom-line"></div>
        {/* <button className="small-btn" onClick={handleSearch}>
          Find Booking
        </button> */}
      </div>
      <History his={userFlights}/>
      {/* {bookingData && (
        <div className="bookingdata">
          <h2>Booking Details</h2>
          {/* Display user data */}
          {/* <p>User ID: {bookingData.userId}</p> */}
          {/* <p>Email: {bookingData.email}</p> */}
          {/* Display other user data */}
          {/* Example: */}
          {/* <p>Flight Number: {bookingData.flightDetails.flightNumber}</p> */}
          {/* <p>Departure Date: {bookingData.flightDetails.departureDate}</p> */}
          {/* Display other booking details */}
          {/* <button className="small-btn" > */}
            {/* Cancel Booking */}
          {/* </button> */}
        {/* </div> */}
      {/* ) */}
      {/* } */}
    </div>
  );
};

export default ManageBooking;