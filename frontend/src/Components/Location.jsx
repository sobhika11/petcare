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

      <h2>Find Nearby Pet Clinics 🐾</h2>

      <button onClick={getLocation}>
        Use My Location
      </button>

      {location && (
        <p>
          Your Location: {location.lat}, {location.lon}
        </p>
      )}

      <div className="clinic-list">

        {clinics.map((clinic, index) => (
          <div key={index} className="clinic-card">

            <h3>{clinic.name}</h3>
            <p>{clinic.address}</p>

            {clinic.bookingAvailable ? (
              <button>Book Appointment</button>
            ) : (
              <p>Call clinic for appointment</p>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default Location;