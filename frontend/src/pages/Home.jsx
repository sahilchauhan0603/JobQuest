import React from "react";
import Hero from "../components/Hero";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <>
      <div className="marquee-container">
        <div className="marquee-static-text">
          <p>Top job roles you can search out for:</p>
        </div>
        <div className="marquee-content">
          <p className="marquee-text">Web Development</p>
          <p className="marquee-text">Machine Learning</p>
          <p className="marquee-text">Data Science</p>
          <p className="marquee-text">Mobile App Development</p>
          <p className="marquee-text">Cloud Computing</p>
          <p className="marquee-text">AI & Robotics</p>
          {/* <p className="marquee-text">Software Development</p>
          <p className="marquee-text">Mobile App Development</p>
          <p className="marquee-text">Blockchain</p> */}
        </div>
      </div>

      <Hero />
      <TopNiches />
      <HowItWorks />
    </>
  );
};

export default Home;
