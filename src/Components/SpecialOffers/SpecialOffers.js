import React, { useState, useEffect } from "react";
import { getDatabase, set, get, child, ref, remove } from 'firebase/database';
import { db } from '..//../firebase';
import "./SpecialOffers.css";
import video1 from "..//../images/video1.mp4";
import frankfurt from "..//../images/frankfurt.jpg";



const countries = [
  "USA",
  "Canada",
  "UK",
  "France",
  "Germany",
  "Japan",
  "Australia",
];
const OfferDetail = ({offer}) => (
  <div className="offer-details">
          <div className="offer">
            <img src={require('..//../images/' + offer.image)} alt={frankfurt} />
            <p>Travel between: {offer.departure_date} to {offer.arrival_date} </p>
            <h2>{offer.depature}-{offer.arrival}</h2>
            <p>{offer.type}</p>
            <p>From Eur {offer.price} €</p>
            <button className="special-button">Book</button>
          </div></div>
    )
   
  const OfferDetails = ({ offersData }) => {
      const listOffers = offersData.map((offer) => <OfferDetail key={offer.id} offer={offer}/>)
      return listOffers;
  }


const SpecialOffers = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");

  const handleFilter = () => {
    // Implement filtering logic here based on selected countries
    console.log(`Filtering from ${fromCountry} to ${toCountry}`);
  };

  const [offersData, setOffersData] = useState([])

  useEffect(() => {
    
const dbRef = ref(getDatabase());
        get(child(dbRef, `special_offers`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setOffersData(data)
                console.log(data)
            }
        })
}, [])
  return (

    <div className="special-offers-page">
      <div className="first-section">
        <video className="video-background" autoPlay muted loop>
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="header">
          <p className="title">Special Offers</p>
          <h1 className="main-title">Latest travel deals and offers</h1>
          <p className="description">Discover your next adventure with us!</p>
        </div>

        <div className="filter-section">
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
            <button className="special-button" onClick={handleFilter}>Filter</button>
            </div>
        </div>
      </div>

      <OfferDetails offersData={offersData}/>

    </div>
  );
};

export default SpecialOffers;
