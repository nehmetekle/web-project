import React, { useState } from 'react';
import './FlightStatus.css';
import airplane from '../../images/airplane.jpg';

const FlightStatus = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [date, setDate] = useState('');
    const [flightStatus, setFlightStatus] = useState(null);

    const [flightNumberError, setFlightNumberError] = useState('');
    const [departureAirportError, setDepartureAirportError] = useState('');
    const [arrivalAirportError, setArrivalAirportError] = useState('');
    const [dateError, setDateError] = useState('');

    const handleSearch = () => {
        let isValid = true;

        const flightNumberPattern = /^[A-Za-z]{2}\d{3}$/;
        if (!flightNumber || !flightNumberPattern.test(flightNumber)) {
            setFlightNumberError('Please enter a valid flight number (e.g., AA123)');
            isValid = false;
        } else {
            setFlightNumberError('');
        }

        const airportCodePattern = /^[A-Za-z]{3}$/;
        if (!departureAirport || !arrivalAirport || !airportCodePattern.test(departureAirport) || !airportCodePattern.test(arrivalAirport)) {
            setDepartureAirportError('Please enter valid 3-letter airport codes');
            setArrivalAirportError('Please enter valid 3-letter airport codes');
            isValid = false;
        } else {
            setDepartureAirportError('');
            setArrivalAirportError('');
        }

        const currentDate = new Date().toISOString().split('T')[0];
        if (!date || date < currentDate) {
            setDateError('Please select a valid future date');
            isValid = false;
        } else {
            setDateError('');
        }

        if (isValid) {
            // Valid input, proceed to set flight status
            const status = {
                flightNumber,
                departureAirport,
                arrivalAirport,
                date,
                departureTime: '10:00 AM',
                arrivalTime: '1:00 PM',
                status: 'On Time',
                gate: 'A12',
                terminal: 'T2',
                airline: 'NJP Airways',
                duration: '3 hours 30 minutes',
            };
            setFlightStatus(status);
        }
    };

    return (
        <div className="flight-status-container">
            <div className="image">
                <img src={airplane} alt="Airplane" />
            </div>
            <h1>Flight Status</h1>
            <div className="search-form">
                <input type="text" value={flightNumber} placeholder="Flight Number" onChange={(e) => setFlightNumber(e.target.value)} />
                <p className="error">{flightNumberError}</p>
                <input type="text" value={departureAirport} placeholder="Departure Airport" onChange={(e) => setDepartureAirport(e.target.value)} />
                <p className="error">{departureAirportError}</p>
                <input type="text" value={arrivalAirport} placeholder="Arrival Airport" onChange={(e) => setArrivalAirport(e.target.value)} />
                <p className="error">{arrivalAirportError}</p>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <p className="error">{dateError}</p>
                <button className='btn-search' onClick={handleSearch}>Search</button>
            </div>
            {flightStatus && (
                <div className="flight-details">
                <h2>Flight Status</h2>
                <p>Flight Number: {flightStatus.flightNumber}</p>
                <p>Departure Time: {flightStatus.departureTime}</p>
                <p>Arrival Time: {flightStatus.arrivalTime}</p>
                <p>Status: {flightStatus.status}</p>
                <p>Gate: {flightStatus.gate}</p>
                <p>Terminal: {flightStatus.terminal}</p>
                <p>Airline: {flightStatus.airline}</p>
                <p>Duration: {flightStatus.duration}</p>
                   {/* Display other relevant flight status details here */}
                </div>
            )}
            <div className="text">
                <li>Flight schedule shows the local time at each city/airport.</li>
                <li>Flight status is not available for NJP Airways flights operated by codeshare partners.</li>
            </div>
        </div>
    );
};

export default FlightStatus;
