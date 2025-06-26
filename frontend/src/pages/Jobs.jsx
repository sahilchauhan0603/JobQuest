/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaMoneyBillWave, FaCalendarAlt, FaFilter, FaChevronDown } from "react-icons/fa";
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
  const [showFilter, setShowFilter] = useState(false);

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, city, niche, searchKeyword]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
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
            />
            <button onClick={handleSearch} className="search-btn yellow-btn">
              <FaSearch /> Find Job
            </button>
            {/* <button className="dropdown-btn yellow-btn" onClick={() => setShowFilter((prev) => !prev)}>
              <FaFilter /> j <FaChevronDown style={{marginLeft: 4}}/>
            </button> */}
          </div>
          <div className="wrapper">
            <aside className={`filter-bar enhanced-filter dropdown-filter${showFilter ? " show" : ""}`}>
              <h2><FaFilter /> Filter Jobs</h2>
              <div className="filter-group">
                <h3>By City</h3>
                <select className="filter-dropdown" value={selectedCity} onChange={e => handleCityChange(e.target.value)}>
                  <option value="">All Cities</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <h3>By Niche</h3>
                <select className="filter-dropdown" value={selectedNiche} onChange={e => handleNicheChange(e.target.value)}>
                  <option value="">All Niches</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>{niche}</option>
                  ))}
                </select>
              </div>
            </aside>
            <main className="container jobs-main">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
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
                  <img src="./notfound.png" alt="job-not-found" className="notfound-img" />
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
