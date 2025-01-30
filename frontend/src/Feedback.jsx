import React, { useState } from 'react';

const Feedback = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jobquest-backend-v4d2.onrender.com/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Thank you for your feedback!');
        setFormData({ name: '', email: '', feedback: '' });
        setIsFormOpen(false);
      } else {
        setMessage('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {/* Feedback Button */}
      <button
  onClick={() => setIsFormOpen(!isFormOpen)}
  title="Submit your views about the website" // Tooltip text
  style={{
    position: 'fixed',
    bottom: '25px',
    left: '13px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}
>
  ✉️
</button>



      {/* Feedback Form Modal */}
      {isFormOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '300px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Feedback</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <label style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <label style={{ display: 'block', marginBottom: '10px' }}>Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'none',
              }}
              rows="4"
            ></textarea>
            <button
              type="submit"
              style={{
                width: '80%',
                padding: '10px',
                marginLeft: '25px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => setIsFormOpen(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            ✖️
          </button>
          {message && <p style={{ marginTop: '15px', color: 'green', textAlign: 'center' }}>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Feedback;
