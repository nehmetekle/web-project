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
import "./SpecialOffers.css";
import video1 from "..//../images/video1.mp4";
import frankfurt from "..//../images/frankfurt.jpg";

const countries = [
  "Beirut",
  "Kuwait",
  "Frankfurt",
  "Paris",
  "London",
  "Jeddah",
  "Amsterdam",
  "Basra",
  "Geneva",
  "Milan",
  "Madrid",
  "Copenhangen",
];
const OfferDetail = ({ offer }) => (
  <div className="offer">
    <img
      className="img"
      src={require("..//../images/" + offer.image)}
      alt={frankfurt}
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
    <button className="special-button">Book</button>
  </div>
);

const OfferDetails = ({ offersData }) => {
  const listOffers = offersData.map((offer) => (
    <OfferDetail key={offer.id} offer={offer} />
  ));
  return listOffers;
};

const SpecialOffers = () => {
  // const [fromCountry, setFromCountry] = useState("");
  // const [toCountry, setToCountry] = useState("");
  const [filteredOffers, setFilteredOffers] = useState([]);
  // const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(getDatabase());

      try {
        const snapshot = await get(child(dbRef, "special_offers"));

        if (snapshot.exists()) {
          const data = snapshot.val();
          // setOffersData(data);
          setFilteredOffers(data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching special offers:", error.message);
      }
    };

    fetchData();
  }, []);

  // const handleFilter = () => {
  //   const filtered = offersData.filter(
  //     (offer) =>
  //       (!fromCountry || offer.depature === fromCountry) &&
  //       (!toCountry || offer.arrival === toCountry)
  //   );

  //   setFilteredOffers(filtered);
  // };

  return (
    <div className="special-offers-page">
      <div className="first-section">
        <video className="video-background" autoPlay muted loop>
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="header-special">
          <p className="title">Special Offers</p>
          <h1 className="main-title">Latest travel deals and offers</h1>
          <p className="description">Discover your next adventure with us!</p>
        </div>
        {/* <div className="filter-section">
          <label>From:</label>
          <select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
          >
            <option value="">Select</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <label>To:</label>
          <select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
          >
            <option value="">Select</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className="btn-filter">
            <button className="special-button" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div> */}
      </div>

      {/* <OfferDetails offersData={filteredOffers} /> */}
      <div className="offer-details">
        <OfferDetails offersData={filteredOffers} />
      </div>
    </div>
  );
};

export default SpecialOffers;
