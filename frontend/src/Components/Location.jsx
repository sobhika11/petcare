import React, { useState } from "react";

const Location = () => {

  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);

  const getLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation({ lat, lon });

        // fetch nearby clinics
        const res = await fetch(
          `http://localhost:5000/api/clinics/nearby?lat=${lat}&lon=${lon}`
        );

        const data = await res.json();
        setClinics(data);

      },
      () => {
        alert("Permission denied");
      }
    );
  };

  return (
    <div className="location-page">
      <div className="location-hero">
        <h2>Find Nearby Pet Clinics 🏥</h2>
        <p>Allow location access to instantly discover top-rated veterinarians near you.</p>
        
        <div className="location-actions">
          <button className="btn-primary" onClick={getLocation}>
            📍 Detect My Location
          </button>
          {location && (
            <span className="location-badge">✓ Location active</span>
          )}
        </div>
      </div>

      {clinics.length > 0 && (
        <div className="clinic-results-section">
          <h3 className="section-title">Available Clinics Near You</h3>
          <div className="clinic-list">
            {clinics.map((clinic, index) => (
              <div key={index} className="clinic-card enhanced-card">
                <div className="clinic-card-header">
                  <h3>{clinic.name}</h3>
                  <span className="status-badge {clinic.bookingAvailable ? 'open' : 'call'}">
                    {clinic.bookingAvailable ? 'Accepting Bookings' : 'Call Only'}
                  </span>
                </div>
                
                <p className="clinic-address">📍 {clinic.address}</p>

                <div className="clinic-actions">
                  {clinic.bookingAvailable ? (
                    <button className="btn-book">Book Appointment</button>
                  ) : (
                    <p className="call-fallback">📞 Call clinic for appointment</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;