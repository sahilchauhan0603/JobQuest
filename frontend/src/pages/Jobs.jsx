/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaMoneyBillWave, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Jobs.css";

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80";
const JOB_WEB_IMAGE_URL = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  // Debounced search: fetch jobs after user stops typing for 400ms
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(fetchJobs(selectedCity, selectedNiche, searchKeyword));
    }, 400);
    return () => clearTimeout(handler);
  }, [dispatch, selectedCity, selectedNiche, searchKeyword]);

  const handleSearch = () => {
    dispatch(fetchJobs(selectedCity, selectedNiche, searchKeyword));
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Agra",
    "Varanasi",
  ];

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  // Responsive: show sidebar filter on desktop, dropdown on mobile
  // Use CSS media queries to hide/show as needed

  return (
    <>
      <div className="jobs-hero yellow-hero">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Browse thousands of opportunities and apply in one click!</p>
        </div>
        <img src={HERO_IMAGE_URL} alt="Job Search" className="hero-img" />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper enhanced-search">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search by job title, company, or keyword..."
              className="search-input"
              aria-label="Search jobs"
            />
            <button onClick={handleSearch} className="search-btn yellow-btn" aria-label="Find Job">
              <FaSearch /> Find Job
            </button>
            <button
              className="dropdown-btn yellow-btn mobile-only"
              style={{ display: 'none' }}
              onClick={() => setShowMobileFilter((prev) => !prev)}
              aria-label="Show Filters"
            >
              <FaFilter /> Filters
            </button>
          </div>
          <div className="wrapper">
            {/* Sidebar filter for desktop */}
            <aside className="filter-bar enhanced-filter desktop-only">
              <h2><FaFilter /> Filter Jobs</h2>
              <div className="filter-group">
                <h3>By City</h3>
                <select className="filter-dropdown" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                  <option value="">All Cities</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <h3>By Niche</h3>
                <select className="filter-dropdown" value={selectedNiche} onChange={e => setSelectedNiche(e.target.value)}>
                  <option value="">All Niches</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>{niche}</option>
                  ))}
                </select>
              </div>
            </aside>
            {/* Mobile filter dropdown, only visible on mobile */}
            <aside
              className="filter-bar enhanced-filter mobile-filter mobile-only"
              style={{ display: showMobileFilter ? 'block' : 'none', position: 'absolute', zIndex: 20, left: 0, right: 0, margin: '0 auto', top: '7rem', maxWidth: 340 }}
            >
              <h2><FaFilter /> Filter Jobs</h2>
              <div className="filter-group">
                <h3>By City</h3>
                <select className="filter-dropdown" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                  <option value="">All Cities</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <h3>By Niche</h3>
                <select className="filter-dropdown" value={selectedNiche} onChange={e => setSelectedNiche(e.target.value)}>
                  <option value="">All Niches</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>{niche}</option>
                  ))}
                </select>
              </div>
            </aside>
            <main className="container jobs-main">
              <div className="jobs_container jobs-grid">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => {
                    return (
                      <div className="card job-card yellow-card" key={element._id}>
                        <div className="job-card-header left-header">
                          {element.hiringMultipleCandidates === "Yes" ? (
                            <span className="hiring-multiple">Hiring Multiple Candidates</span>
                          ) : (
                            <span className="hiring">Hiring</span>
                          )}
                        </div>
                        <img src={JOB_WEB_IMAGE_URL} alt="web" className="job-web-img" />
                        <h2 className="title">{element.title}</h2>
                        <p className="company"><FaBuilding /> {element.companyName}</p>
                        <p className="location"><FaMapMarkerAlt /> {element.location}</p>
                        <p className="salary">
                          <FaMoneyBillWave /> <span>Salary:</span> Rs. {element.salary}
                        </p>
                        <p className="posted">
                          <FaCalendarAlt /> <span>Posted On:</span> {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="btn-wrapper">
                          <Link
                            className="btn apply-btn yellow-btn"
                            to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: 600, color: '#ff9800', marginBottom: '1rem'}}>No jobs found</div>
                    <img src="/NoJob.png" alt="No jobs found" className="notfound-img" />
                  </div>
                )}
              </div>
            </main>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
