import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBullseye, FaStar, FaEye, FaUsers, FaHandshake } from 'react-icons/fa';
import axios from 'axios';
import './About.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const About = () => {
  const [stats, setStats] = useState({ users: 0, companies: 0 });

  useEffect(() => {
    // Fetch number of users
    axios.get(`${API_BASE_URL}/user/count`).then(res => {
      setStats(prev => ({ ...prev, users: res.data.count }));
    }).catch(() => {
      setStats(prev => ({ ...prev, users: 10000 }));
    });
    // Fetch number of companies (employers)
    axios.get(`${API_BASE_URL}/job/getall`).then(res => {
      // Count unique company names from jobs
      const companies = new Set((res.data.jobs || []).map(j => j.companyName));
      setStats(prev => ({ ...prev, companies: companies.size }));
    }).catch(() => {
      setStats(prev => ({ ...prev, companies: 500 }));
    });
  }, []);

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1 className="about-title">About JobQuest</h1>
        <p className="about-subtitle">
          Empowering your career journey with innovative tools and personalized opportunities
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3 className="stat-number">{stats.users.toLocaleString()}+</h3>
          <p className="stat-description">Active Users</p>
        </div>
        <div className="stat-card">
          <FaHandshake className="stat-icon" />
          <h3 className="stat-number">{stats.companies}+</h3>
          <p className="stat-description">Partner Companies</p>
        </div>
        <div className="stat-card">
          <FaStar className="stat-icon" />
          <h3 className="stat-number">95%</h3>
          <p className="stat-description">Satisfaction Rate</p>
        </div>
        <div className="stat-card">
          <FaBullseye className="stat-icon" />
          <h3 className="stat-number">4.8/5</h3>
          <p className="stat-description">Average Rating</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-container">
            <FaBullseye className="feature-icon" />
          </div>
          <h2 className="feature-title">Our Mission</h2>
          <p className="feature-description">
            To revolutionize the job search process by creating an intelligent platform that connects
            talented professionals with their ideal career opportunities through advanced matching algorithms.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-container">
            <FaEye className="feature-icon" />
          </div>
          <h2 className="feature-title">Our Vision</h2>
          <p className="feature-description">
            To become the global leader in career development by 2030, helping millions of professionals
            worldwide find meaningful work that aligns with their skills and aspirations.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-container">
            <FaStar className="feature-icon" />
          </div>
          <h2 className="feature-title">Why Choose Us</h2>
          <p className="feature-description">
            AI-powered job matching, real-time application tracking, career coaching resources,
            and a community of professionals to network with - all in one platform.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to transform your career?</h2>
        {/* <p className="cta-subtitle">Join thousands of professionals who found their dream jobs through JobQuest</p> */}
        <Link to="/login" className="cta-button">Get Started Today</Link>
      </div>
    </div>
  );
};

export default About;