import React from 'react';
import { Link } from 'react-router-dom';

const TrainingCard = ({ title, description, image, link, icon }) => {
  return (
    <div className="training-card">
      <img src={image} alt={title} className="training-card-img" />
      <div className="training-card-content">
        <h3 className="training-card-title">
          {icon} {title}
        </h3>
        <p className="training-card-desc">{description}</p>
        <Link to={link || '#'} className="training-card-btn">
          Explore Training
        </Link>
      </div>
    </div>
  );
};

export default TrainingCard;
