import React from 'react';
import './Training.css';
import TrainingCard from './TrainingCard';

const TrainingHome = () => {
  const trainingCategories = [
    {
      id: 1,
      title: 'Basic Commands',
      icon: '🐾',
      description: 'Master the essentials like Sit, Stay, Come, and Down to build a strong foundation of communication with your pet.',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
      link: '/training/basic'
    },
    {
      id: 2,
      title: 'Behavior Control',
      icon: '🧠',
      description: 'Learn gentle and effective ways to stop unwanted behaviors like excessive barking, biting, and leash pulling.',
      image: 'https://images.unsplash.com/photo-1595535373305-64bac9b881eb?auto=format&fit=crop&w=600&q=80',
      link: '/training/behavior'
    },
    {
      id: 3,
      title: 'Tricks & Fun',
      icon: '🎾',
      description: 'Teach fun, reward-based tricks to keep your dog mentally stimulated like shaking hands, rolling over, and spinning.',
      image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=600&q=80',
      link: '/training/tricks'
    },
    {
      id: 4,
      title: 'Puppy Training',
      icon: '🍼',
      description: 'The ultimate guide for new puppy parents: potty training, crate training, socialization, and simple daily routines.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      link: '/training/puppy'
    }
  ];

  return (
    <div className="training-container">
      <div className="training-header">
        <h1>Dog Training Center</h1>
        <p>Unlock your dog's full potential with our positive reinforcement training guides. Select a category below to get started on your training journey!</p>
      </div>
      
      <div className="training-grid">
        {trainingCategories.map((category) => (
          <TrainingCard 
            key={category.id}
            title={category.title}
            description={category.description}
            image={category.image}
            link={category.link}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainingHome;
