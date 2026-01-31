import React from 'react';
import './Team.css';

const Team = () => {
  return (
    <section className="team-section">
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        <p className="section-subtitle">Meet the people behind Fresh&Organic</p>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Milan Khanchi" />
            <h3>Milan Khanchi</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/66.jpg" alt="Mayank Garg" />
            <h3>Mayank Garg</h3>
            <p>Quality Manager</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Balreet Kaur" />
            <h3>Balreet Kaur</h3>
            <p>Operations Head</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team; 