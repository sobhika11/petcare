import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainingCard = ({ service, onReadMore }) => {
  return (
    <div className='grooming-card fade-in-up'>
      <div className="grooming-image-wrapper">
        <img src={service.img} alt={service.title} />
      </div>
      <div className="grooming-content">
        <h3 className='grooming-title'>{service.title}</h3>
        <p className='grooming-desc'>{service.text}</p>
        <button
          className="btn-book-grooming"
          onClick={() => onReadMore(service)}
        >
          Read Tips & Tricks
        </button>
      </div>
    </div>
  );
};

const DogTraining = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const services = [
    {
      title: "Puppy Basics",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
      text: "Start your puppy right with essential obedience commands like sit, stay, and come. 🐾",
      tips: [
        "Keep training sessions short (5-10 minutes) so your puppy doesn't lose focus.",
        "To teach 'Sit', hold a treat close to their nose and slowly move it up and back.",
        "Consistency is key: use the exact same word for the command every single time."
      ]
    },
    {
      title: "Advanced Obedience",
      img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
      text: "Take your dog's skills to the next level with advanced off-leash training and complex commands. 🐕",
      tips: [
        "Practice off-leash commands in a safe, fully enclosed area first.",
        "Introduce silent hand signals alongside verbal commands.",
        "Gradually increase the level of distraction when practicing 'Stay'."
      ]
    },
    {
      title: "Behavior Modification",
      img: "https://images.unsplash.com/photo-1595535373305-64bac9b881eb?auto=format&fit=crop&w=600&q=80",
      text: "Expert guidance to help overcome anxiety, aggression, and other behavioral challenges. 🧠",
      tips: [
        "Identify the specific triggers before attempting counter-conditioning.",
        "Never punish a dog for fear-based reactions; it reinforces the anxiety.",
        "Use high-reward treats to build positive associations with the trigger."
      ]
    },
    {
      title: "Agility Training",
      img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=600&q=80",
      text: "A fun, high-energy course teaching your dog to navigate agility obstacles with speed. 🏃‍♂️",
      tips: [
        "Start with poles laid flat on the ground before raising them for jumps.",
        "Always warm up your dog with a brisk walk before agility exercises.",
        "Keep the tone extremely positive and energetic."
      ]
    },
    {
      title: "Clicker Training",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
      text: "Positive reinforcement techniques using a clicker for precise and fast learning. 🎯",
      tips: [
        "First, 'load the clicker' by clicking and immediately treating 10+ times.",
        "The click must happen the exact second the desired behavior occurs.",
        "Never use the clicker to get your dog's attention—it is a reward marker only."
      ]
    },
    {
      title: "Therapy Dog Prep",
      img: "https://images.unsplash.com/photo-1537151608804-ea2f14140087?auto=format&fit=crop&w=600&q=80",
      text: "Prepare your gentle pup for certification as a comforting therapy dog. 💖",
      tips: [
        "Expose your dog to medical equipment like wheelchairs and crutches slowly.",
        "Train them to politely accept clumsy petting or loud sudden noises.",
        "Practice the 'Leave it' command intensely for dropped medication or food."
      ]
    },
  ];

  return (
    <section className='grooming-container'>
      <div className='grooming-header-section'>
        <h1>Dog Training Tips & Tricks 🐕</h1>
        <p>Explore our expert-curated guides to unlock your dog's full potential.</p>
      </div>

      <div className='grooming-services-grid'>
        {services.map((service, index) => (
          <TrainingCard key={index} service={service} onReadMore={setSelectedCourse} />
        ))}
      </div>

      {/* Reusing the popup styling from earlier */}
      {selectedCourse && (
        <div className="popup" onClick={() => setSelectedCourse(null)}>
          <div className="popupp" onClick={e => e.stopPropagation()}>
            <h3 className="popup-header">{selectedCourse.title} Tips</h3>
            <div className="popup-info" style={{ marginBottom: '20px' }}>
              <img
                src={selectedCourse.img}
                alt={selectedCourse.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' }}
              />
              <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: '#444' }}>
                {selectedCourse.tips.map((tip, i) => (
                  <li key={i} style={{ marginBottom: '10px', fontSize: '0.95rem' }}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="actions" style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="btn-book-grooming"
                style={{ width: 'auto', padding: '10px 30px' }}
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DogTraining;
