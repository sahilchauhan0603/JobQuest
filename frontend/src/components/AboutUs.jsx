import React from 'react';

const About = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        color: '#333',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            color: '#4CAF50',
            marginBottom: '10px',
          }}
        >
          About Us
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Welcome to JobQuest, your gateway to endless career opportunities!
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        {/* Section 1 */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '400px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              color: '#4CAF50',
              marginBottom: '10px',
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: '16px',
            }}
          >
            At JobQuest, our mission is to bridge the gap between talented job
            seekers and top employers by creating an efficient, user-friendly
            platform for career growth.
          </p>
        </div>

        {/* Section 2 */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '400px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              color: '#4CAF50',
              marginBottom: '10px',
            }}
          >
            Why Choose Us?
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: '16px',
            }}
          >
            We offer personalized recommendations, real-time job alerts, and a
            seamless application process to make your job search hassle-free
            and rewarding.
          </p>
        </div>

        {/* Section 3 */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '400px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              color: '#4CAF50',
              marginBottom: '10px',
            }}
          >
            Our Vision
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: '16px',
            }}
          >
            To empower professionals worldwide by connecting them with the best
            career opportunities and fostering meaningful professional
            relationships.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: '30px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        <p
          style={{
            fontSize: '14px',
          }}
        >
          &copy; 2025 JobQuest. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
