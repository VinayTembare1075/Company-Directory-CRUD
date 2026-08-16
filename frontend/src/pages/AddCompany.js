import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddCompany() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    link: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (form.companyName.length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (form.link && !/^https?:\/\/.+/.test(form.link)) {
      newErrors.link = "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        // Show success animation
        const btn = document.querySelector('.btn-submit');
        btn.classList.add('success-animation');
        
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to add company ❌");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="add-company-container">
      {/* Animated Background */}
      <div className="add-bg">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="gradient-orb orb4"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${12 + Math.random() * 20}s`,
            width: `${2 + Math.random() * 8}px`,
            height: `${2 + Math.random() * 8}px`
          }}></div>
        ))}
      </div>

      <div className={`add-card-wrapper ${isVisible ? 'fade-in-up' : ''}`}>
        <div className="add-card">
          {/* Card Glow Effect */}
          <div className="card-glow"></div>
          
          {/* Decorative Elements */}
          <div className="card-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
            <br></br><br></br>
          {/* Header */}
          <div className="add-header">
            <div className="logo-badge">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="add-title">
              <span className="gradient-text-add">Add New Company</span>
            </h2>
            <p className="add-subtitle">
              Fill in the details to register a new company
            </p>
          </div>

          {/* Form */}
          <div className="add-form">
            {/* Company Name */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12L12 10.5L15 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Company Name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-input ${errors.companyName ? 'error' : ''}`}
                  name="companyName"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  name="email"
                  placeholder="Enter company email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19C22.0001 19.5304 21.7892 20.0391 21.4141 20.4142C21.039 20.7893 20.5304 21 20 21H19C10.2 21 3 13.8 3 5V4C3 2.9 3.9 2 5 2H7.08C7.54 2 7.96 2.29 8.14 2.71L9.39 5.21C9.57 5.63 9.5 6.11 9.18 6.45L7.33 8.3C8.43 10.56 10.43 12.56 12.69 13.66L14.54 11.81C14.88 11.49 15.36 11.42 15.78 11.6L18.28 12.85C18.71 13.04 19 13.46 19 13.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Phone Number
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C12 22 20 15 20 9C20 4.6 16.4 1 12 1C7.6 1 4 4.6 4 9C4 15 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Location
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  name="location"
                  placeholder="Enter company location"
                  value={form.location}
                  onChange={handleChange}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 8H17M7 12H14M7 16H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Description
              </label>
              <div className="input-wrapper">
                <textarea
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  name="description"
                  placeholder="Enter company description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
            </div>

            {/* Website */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2C9.9 4.5 8.8 8.2 8.8 12C8.8 15.8 9.9 19.5 12 22C14.1 19.5 15.2 15.8 15.2 12C15.2 8.2 14.1 4.5 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Company Website
              </label>
              <div className="input-wrapper">
                <input
                  type="url"
                  className={`form-input ${errors.link ? 'error' : ''}`}
                  name="link"
                  placeholder="https://www.example.com"
                  value={form.link}
                  onChange={handleChange}
                />
                {errors.link && <span className="error-message">{errors.link}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="btn-submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <span className="btn-text">
                  Add Company
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .add-company-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* Animated Background */
        .add-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.5;
          animation: floatOrb 20s infinite ease-in-out;
        }

        .orb1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.4));
          top: -300px;
          left: -300px;
        }

        .orb2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.6), rgba(16, 185, 129, 0.3));
          bottom: -250px;
          right: -250px;
          animation-delay: -5s;
        }

        .orb3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.3));
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -10s;
        }

        .orb4 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3));
          top: 20%;
          right: 10%;
          animation-delay: -15s;
        }

        @keyframes floatOrb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        /* Floating Particles */
        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Card Wrapper */
        .add-card-wrapper {
          width: 100%;
          max-width: 700px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .add-card-wrapper.fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card */
        .add-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 3rem 2.5rem;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .add-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }

        /* Card Glow */
        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 32px;
          background: radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.1), transparent);
          pointer-events: none;
        }

        /* Card Decoration */
        .card-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
          border-radius: 32px 32px 0 0;
        }

        .decoration-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }

        .decoration-dots {
          position: absolute;
          top: -4px;
          right: 20px;
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 0.3s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        /* Header */
        .add-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-badge {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .add-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .gradient-text-add {
          background: linear-gradient(135deg, #fff, #34d399, #6ee7b7);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .add-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        /* Form */
        .add-form {
          margin-top: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .input-icon {
          width: 16px;
          height: 16px;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: #10b981;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-input.error,
        .form-textarea.error {
          border-color: #ef4444;
        }

        .error-message {
          position: absolute;
          bottom: -20px;
          left: 0;
          font-size: 0.75rem;
          color: #ef4444;
        }

        /* Submit Button */
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .btn-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn-submit:hover::before {
          left: 100%;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.3s;
        }

        .btn-submit:hover .btn-arrow {
          transform: translateX(5px);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .success-animation {
          animation: successPulse 0.5s ease;
        }

        @keyframes successPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.98);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .add-company-container {
            padding: 1rem;
          }
          
          .add-card {
            padding: 2rem 1.5rem;
          }
          
          .add-title {
            font-size: 1.75rem;
          }
          
          .form-group {
            margin-bottom: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default AddCompany;