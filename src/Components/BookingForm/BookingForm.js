
import React, { useState, useEffect } from "react";
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

const ManageBooking = () => {
  const [historyData, setHistoryData] = useState([]);
  const [specialData, setSpecialData] = useState([]);
  const [userFlights, setUserFlights] = useState([]);

  const user = JSON.parse(window.localStorage.getItem("user"));

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{flight.eTicket}</td>
            <td>{flight.data.arrival}</td>
            <td>{flight.data.depature}</td>
            <td>
              <button onClick={() => handleCancel(flight.id)}>
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const handleCancel = async (id) => {
    try {
      const dbRef = ref(getDatabase());
      
      // Remove the booking history
      await removeData(child(dbRef, `booking_history/${id}`));

      // If necessary, update other related data in the database

      // Update the state to reflect the changes
      const updatedUserFlights = userFlights.filter((item) => item.id !== id);
      setUserFlights(updatedUserFlights);
    } catch (error) {
      console.error("Error canceling booking:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, `booking_history`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = Object.values(snapshot.val());

            let newUserHistories = [];
            data.forEach((data) => {
              if (data.user_id === user.userId) {
                newUserHistories.push(data);
              }
            });
            setHistoryData(newUserHistories);

            let userFlights = [];
            get(child(dbRef, `special_offers`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const data = Object.values(snapshot.val());
                  setSpecialData(data);

                  newUserHistories.forEach((history) => {
                    data.forEach((data) => {
                      if (data.id === history.offerId) {
                        let newData = {
                          data,
                          eTicket: history.eTicket,
                          id: history.id
                        };
                        userFlights.push(newData);
                        console.log(newData)
                      }
                    });
                  });
                }

                setUserFlights(userFlights);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });

      } catch (error) {
        console.error("Error fetching special offers:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="manage-booking-container">
      <h1>Manage Booking</h1>
      <div className="custom-line"></div>
      <div className="search-section">
        <div className="input-section">
          <p className="parag">Retrieve booking with E-ticket</p>
        </div>
        <div className="custom-line"></div>
      </div>
      <History his={userFlights} />
    </div>
  );
};

export default ManageBooking;

