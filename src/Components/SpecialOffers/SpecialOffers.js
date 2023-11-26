import React, { useState } from "react";
import "./SpecialOffers.css"; // Import your CSS file for styling
import video1 from "..//../images/video1.mp4";
import basra from "..//../images/basra.jpg";
import copenhagen from "..//../images/copenhagen.jpg";
import amsterdam from "..//../images/amsterdam.jpg";
import geneva from "..//../images/geneva.jpg";
import jeddah from "..//../images/jeddah.jpg";
import kuwait from "..//../images/kuwait.jpg";
import london from "..//../images/london.jpg";
import madrid from "..//../images/madrid.jpg";
import milan from "..//../images/milan.jpg";
import frankfurt from "..//../images/frankfurt.jpg";
import beirut from "..//../images/beirut.jpg";
import paris from "..//../images/paris.jpg";

const countries = [
  "USA",
  "Canada",
  "UK",
  "France",
  "Germany",
  "Japan",
  "Australia",
];

const SpecialOffers = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");

  const handleFilter = () => {
    // Implement filtering logic here based on selected countries
    console.log(`Filtering from ${fromCountry} to ${toCountry}`);
  };

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
            <button onClick={handleFilter}>Filter</button>
            </div>
        </div>
      </div>

      <div className="offer-details">
        {/* {[...Array(9)].map((_, index) => ( key={index} */}
        <div className="offer">
          <img src={frankfurt} alt={frankfurt} />
          <p>Travel between: 09 Jun 2023 to 30 Dec 2024</p>
          <h2>Beirut-Frankfurt</h2>
          <p>Round Trip</p>
          <p>From Eur 1142 *</p>
          <button>Book</button>
        </div>

        <div className="offer">
          <img src={kuwait} alt={kuwait} />
          <p>Travel between: 07 Sep 2023 to 08 Dec 2023</p>
          <h2>Beirut-Kuwait</h2>
          <p>Round Trip</p>
          <p>From USD 1038 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={beirut} alt={beirut} />
          <p>Travel between: 21 Sep 2023 to 20 Sep 2024</p>
          <h2>Paris-Beirut</h2>
          <p>Round Trip</p>
          <p>From USD 468 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={paris} alt={paris} />
          <p>Travel between: 21 Sep 2023 to 20 Sep 2024</p>
          <h2>Beirut-Paris</h2>
          <p>Round Trip</p>
          <p>From USD 514 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={jeddah} alt={jeddah} />
          <p>Travel between: 26 Sep 2023 to 14 Jun 2024</p>
          <h2>London-Jeddah</h2>
          <p>Round Trip</p>
          <p>From GBP 600 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={amsterdam} alt={amsterdam} />
          <p>Travel between: 26 Sep 2023 to 14 Jun 2024</p>
          <h2>London-Amsterdam</h2>
          <p>Round Trip</p>
          <p>From GBP 574 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={basra} alt={basra} />
          <p>Travel between: 26 Sep 2023 to 14 Jun 2024</p>
          <h2>London-Basra</h2>
          <p>Round Trip</p>
          <p>From GBP 525 *</p>
          <button>Book</button>
        </div>

        <div className="offer">
          <img src={london} alt={london} />
          <p>Travel between: 19 Oct 2023 to 01 Dec 2023</p>
          <h2>beirut-London</h2>
          <p>Round Trip</p>
          <p>From USD 370 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={geneva} alt={geneva} />
          <p>Travel between: 06 Nov 2023 to 06 Nov 2024</p>
          <h2>Beirut-Geneva</h2>
          <p>Round Trip</p>
          <p>From USD 540 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={milan} alt={milan} />
          <p>Travel between: 06 Nov 2023 to 06 Nov 2024</p>
          <h2>Beirut-Milan</h2>
          <p>Round Trip</p>
          <p>From USD 517 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={madrid} alt={madrid} />
          <p>Travel between: 06 Nov 2023 to 06 Nov 2024</p>
          <h2>Beirut-Madrid</h2>
          <p>Round Trip</p>
          <p>From USD 569 *</p>
          <button>Book</button>
        </div>
        <div className="offer">
          <img src={copenhagen} alt={copenhagen} />
          <p>Travel between: 06 Nov 2023 to 06 Nov 2024</p>
          <h2>Beirut-Copenhagen</h2>
          <p>Round Trip</p>
          <p>From USD 517 *</p>
          <button>Book</button>
        </div>

        {/* ))} */}
      </div>
    </div>
  );
};

export default SpecialOffers;
