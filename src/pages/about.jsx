import React from 'react'
import { useNavigate } from 'react-router-dom';



 const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <h2>Welcome to about PAGE</h2>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};


export default About
