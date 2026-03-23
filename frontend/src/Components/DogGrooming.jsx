import React from 'react';
import { useNavigate } from 'react-router-dom';

// Renamed for clarity: ServiceCard instead of Components
const ServiceCard = ({ title, img, text }) => {
  const navigate = useNavigate();
  
  return (
    <div className='grooming-card fade-in-up'>
      <div className="grooming-image-wrapper">
        <img src={img} alt={title} />
      </div>
      <div className="grooming-content">
        <h3 className='grooming-title'>{title}</h3>
        <p className='grooming-desc'>{text}</p>
        <button 
          className="btn-book-grooming"
          onClick={() => navigate("/Popup", { state: { servicename: title } })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const DogGrooming = () => {
  const services = [
    { title: "Paw trim", img: "/Images/dog hair cut_groom.webp", text: "Expert trimming for a clean and stylish coat. Keeps your dog cool and neat. 🐶" },
    { title: "Kitty cut", img: "/Images/cat haircut.jpg", text: "Gentle grooming tailored for your feline friend. Soft and perfectly shaped fur. 🐱" },
    { title: "Paw tint", img: "/Images/vet3.jpeg", text: "Safe, pet-friendly colors for a bold new look. Adds shine and fun. 🐾" },
    { title: "Kitty tint", img: "/Images/c1.jpg", text: "Carefully applied color for a graceful finish. Enhances natural elegance. 🍃" },
    { title: "Pet Glow-Up", img: "/Images/vet2.jpeg", text: "Includes a refreshing bath and gentle nail trimming for a polished look. ✨" },
    { title: "Pet Caretaker", img: "/Images/petcaaresitter.webp", text: "Loving supervision and playtime while you're away. Comfort and care. 💕" },
  ];

  return (
    <section className='grooming-container'>
      <div className='grooming-header-section'>
        <h1>Our Professional Grooming ✨</h1>
        <p>Give your furry friends the luxury spa treatment they deserve.</p>
      </div>
      <div className='grooming-services-grid'>
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default DogGrooming;