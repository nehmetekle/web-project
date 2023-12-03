import React, { useState, useEffect } from "react";
import {
  getDatabase,
  set,
  get,
  child,
  ref,
  remove,
  onValue,
} from "firebase/database";
import { db } from "..//../firebase";
import './HomePage.css';
import img from '../../images/bg-img.jpeg'

const user = JSON.parse(localStorage.getItem('user'));

const generateETicket = () => {
  const firstLetter = user.email.charAt(0).toUpperCase();
  const randomNumbers = Math.floor(100 + Math.random() * 900);
  return `${firstLetter}${randomNumbers}`;
};

const handleBook = async (offerId) => {
  try {
    const dbRef = ref(getDatabase());
    const bookingHistoryRef = child(dbRef, "booking_history");

    const data = await get(bookingHistoryRef);

    if (data.exists()) {
      const flightHistory = Object.values(data.val());

      const isFlightBooked = flightHistory.some(
        (entry) => entry.offerId === offerId && entry.user_id.userId === user.userId
      );

      if (!isFlightBooked) {
        const db = getDatabase();
        const length = flightHistory.length;
        const lastId = length > 0 ? flightHistory[length - 1].id + 1 : 1;

        const eTicket = generateETicket();

        set(ref(db, `booking_history/${lastId.toString()}`), {
          id: lastId,
          offerId: offerId,
          user_id: user,
          eTicket: eTicket,
        });

        console.log(`Flight with offer ID ${offerId} booked for user ${user.userId}. E-ticket: ${eTicket}`);
      }
    } else {
      const eTicket = generateETicket();

      

      set(ref(db, "booking_history/1"), {
        id: 1,
        offerId: offerId,
        user_id: user,
        eTicket: eTicket,
      });

      window.localStorage.setItem("eTicket", eTicket);
      console.log(`Flight with offer ID ${offerId} booked for user ${user.userId}. E-ticket: ${eTicket}`);
    }
  } catch (error) {
    console.error("Error booking the flight:", error.message);
  }
};


const OfferDetail = ({ offer }) => (
  <div className="offer">
    <img
      className="img"
      src={require("..//../images/" + offer.image)}
    />
    <p>
      Departure Date: {offer.departure_date}
    </p>
    <p>
    Arrival Date: {offer.arrival_date}{" "}
    </p>
    <h2>
      {offer.depature}-{offer.arrival}
    </h2>
    <p>{offer.type}</p>
    <p>For {offer.price} €</p>
    <button className="special-button" onClick={() => handleBook(offer.id)}>
      Book
    </button>
  </div>
);

const OfferDetails = ({ offersData }) => {
  const listOffers = offersData.map((offer) => (
    <OfferDetail key={offer.id} offer={offer} />
  ));
  return listOffers;
};

const HomePage = () => {
  const [fromDestination, setFromDestination] = useState('');
  const [toDestination, setToDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(getDatabase());

      try {
        const snapshot = await get(child(dbRef, "special_offers"));

        if (snapshot.exists()) {
          const data = snapshot.val();
          setOffersData(data);
          // setFilteredOffers(data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching special offers:", error.message);
      }
    };

    fetchData();
  }, []);

  
  

  const handleSearch = () => {
    const filtered = offersData.filter(
      (offer) =>
        (!fromDestination || offer.depature === fromDestination) &&
        (!toDestination || offer.arrival === toDestination)
    );

    setFilteredOffers(filtered);
  };

  return (
    <div className="home-page">
      <div className="header">
        <img className="img-bg" src={img} alt="bg-img" cover />
        <div className="slogan">Where do you want to explore?</div>
      </div>

      <div className="tabs">
        <div className="tab">
          <label htmlFor="from">From</label>
          <input
            className="input-field"
            type="text"
            id="from"
            value={fromDestination}
            onChange={(e) => setFromDestination(e.target.value)}
          />

          <label htmlFor="to">To</label>
          <input
            className="input-field"
            type="text"
            id="to"
            value={toDestination}
            onChange={(e) => setToDestination(e.target.value)}
          />

          <div className="date-fields">
            <div className="date-field">
              <label htmlFor="startDate">From Date</label>
              <input
                className="input-field"
                type="datetime-local"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="date-field">
              <label htmlFor="endDate">To Date</label>
              <input
                className="input-field"
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="offer-details">
        <OfferDetails
          offersData={filteredOffers}
        />
      </div>
    </div>
  );
};

export default HomePage;
