import React, { useState, useEffect } from "react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  const speed = 80; // Speed of the typing effect

  useEffect(() => {
    const texts = [
      "Connecting Talent with Opportunities Across the Nation",
      "For Every Skill Level",
      "Find Your Dream Job Today"
    ];

    let textIndex = 0;
    const typeWriter = () => {
      if (index < texts[textIndex].length) {
        setDisplayedText((prevText) => prevText + texts[textIndex][index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
        setTimeout(() => {
          setDisplayedText(""); // Clear the text for the next one
          setIndex(0); // Reset index
        }, 1000); // Pause before typing next text
      }
    };

    const timer = setTimeout(typeWriter, speed);
    return () => clearTimeout(timer);
  }, [index, speed]); // Only include dependencies that are changing

  return (
    <section className="hero">
      <h1>Find Your Dream Job Today</h1>
      <h4 className="typewriter">{displayedText}</h4>
      <div className="box">
        Explore a vast array of job listings in diverse industries. Whether
        you are a seasoned professional or just starting out, find the perfect
        role to advance your career. Our platform makes job searching easy and
        efficient, bringing you closer to your next big opportunity.
      </div>
    </section>
  );
};

export default Hero;
