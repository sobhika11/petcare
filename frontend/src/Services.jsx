import { useNavigate }  from "react-router-dom";

function Services() {
  const Navigate=useNavigate();
  return (
    <div className="services-wrapper">
      
      <div className="service-card">
        <div className="icon-circle">
          🐾
        </div>
        <h3>Pet Grooming</h3>
        <p>Book In-Home Cat and Dog Grooming Service</p>
        <button onClick={()=> Navigate("/dogGroom")}>Book Appointment</button>
      </div>

      <div className="service-card">
        <div className="icon-circle">
          🐕
        </div>
        <h3>Dog Training</h3>
        <p>Join Our Dog Training Course</p>
        <button>Book Appointment</button>
      </div>

      <div className="service-card">
        <div className="icon-circle">
          🩺
        </div>
        <h3>Vet Appointmnent</h3>
        <p>Book Appointments to the nearby vet hospitals</p>
        <button onClick={
          () => Navigate("/Location")
        }>Book Now</button>
      </div>

    </div>
  );
}

export default Services;
