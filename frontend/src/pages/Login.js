import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    setIsVisible(true);
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        // Save token & role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", form.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Show success animation
        const btn = document.querySelector('.btn-login');
        btn.classList.add('success-animation');
        
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        alert(data.message || "Invalid credentials ❌");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="gradient-orb orb4"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${12 + Math.random() * 20}s`,
            width: `${2 + Math.random() * 8}px`,
            height: `${2 + Math.random() * 8}px`
          }}></div>
        ))}
      </div>

      <div className={`login-card-wrapper ${isVisible ? 'fade-in-up' : ''}`}>
        <div className="login-card">
          {/* Decorative Elements */}
          <div className="card-glow"></div>
          <div className="card-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          {/* Header */}
          <div className="login-header">
            <div className="logo-badge">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="login-title">
              <span className="gradient-text-login">Welcome Back</span>
            </h2>
            <p className="login-subtitle">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            {/* Email Field */}
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
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 8C17.1 5.9 15.1 4.5 12.8 4.1C10.5 3.7 8.2 4.3 6.4 5.7C4.6 7.1 3.5 9.3 3.5 11.7C3.5 14.1 4.6 16.3 6.4 17.7C8.2 19.1 10.5 19.7 12.8 19.3C15.1 18.9 17.1 17.5 18 15.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 5C5.6 5 2 12 2 12C2 12 5.6 19 12 19C18.4 19 22 12 22 12C22 12 18.4 5 12 5Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M2 2L22 22M6.7 6.7C4.2 8.2 2.5 10.9 2 12C2 12 5.6 19 12 19C13.6 19 15.1 18.6 16.4 17.9M9.9 9.9C8.8 10.5 8 11.7 8 13C8 15.2 9.8 17 12 17C13.3 17 14.5 16.2 15.1 15.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15 9C15 7.3 13.7 6 12 6C11.2 6 10.5 6.3 9.9 6.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <span className="btn-text">
                  Sign In
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          </form>

          

          {/* Footer */}
          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Create account
              <svg className="link-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
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
        .login-bg {
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
        .login-card-wrapper {
          width: 100%;
          max-width: 480px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .login-card-wrapper.fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card */
        .login-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 3rem 2rem;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-card:hover {
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
        .login-header {
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

        .login-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .gradient-text-login {
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

        .login-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        /* Form */
        .login-form {
          margin-bottom: 1.5rem;
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

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #10b981;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .error-message {
          position: absolute;
          bottom: -20px;
          left: 0;
          font-size: 0.75rem;
          color: #ef4444;
        }

        /* Password Toggle */
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle svg {
          width: 18px;
          height: 18px;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s;
        }

        .password-toggle:hover svg {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          position: relative;
        }

        .checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkbox-custom {
          width: 18px;
          height: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          transition: all 0.3s;
          position: relative;
        }

        .checkbox-input:checked + .checkbox-custom {
          background: #10b981;
          border-color: #10b981;
        }

        .checkbox-input:checked + .checkbox-custom::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
        }

        .checkbox-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .forgot-link {
          color: #34d399;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s;
        }

        .forgot-link:hover {
          color: #6ee7b7;
        }

        /* Login Button */
        .btn-login {
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
        }

        .btn-login::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn-login:hover::before {
          left: 100%;
        }

        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }

        .btn-login:disabled {
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

        .btn-login:hover .btn-arrow {
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

        /* Divider */
        .divider {
          position: relative;
          text-align: center;
          margin: 1.5rem 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .divider-text {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          padding: 0 1rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
          backdrop-filter: blur(10px);
        }

        /* Social Buttons */
        .social-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-btn svg {
          width: 18px;
          height: 18px;
        }

        .social-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Footer */
        .login-footer {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .register-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #34d399;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .register-link:hover {
          color: #6ee7b7;
          gap: 0.5rem;
        }

        .link-arrow {
          width: 14px;
          height: 14px;
          transition: transform 0.3s;
        }

        .register-link:hover .link-arrow {
          transform: translateX(3px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-container {
            padding: 1rem;
          }
          
          .login-card {
            padding: 2rem 1.5rem;
          }
          
          .login-title {
            font-size: 1.75rem;
          }
          
          .social-buttons {
            flex-direction: column;
          }
          
          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #059669, #10b981);
        }
      `}</style>
    </div>
  );
}

export default Login;