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
        <h3>Vet on Call</h3>
        <p>Expert Veterinary Service At Your Home and Online</p>
        <p>Call 9093290766</p>
      </div>

    </div>
  );
}

export default Services;
