import React, { useState } from 'react';
import './HomePage.css';
import img from '../../images/bg-img.jpeg'

const HomePage = () => {
  const [fromDestination, setFromDestination] = useState('');
  const [toDestination, setToDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {

    console.log('Search clicked');
  };

  return (
    <div className="home-page">
      <div className="header">
        <img src={img} alt="bg-img" cover />
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
    </div>
  );
};

export default HomePage;
