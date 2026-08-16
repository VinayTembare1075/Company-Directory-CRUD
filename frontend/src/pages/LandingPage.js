import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-sphere sphere1"></div>
        <div className="gradient-sphere sphere2"></div>
        <div className="gradient-sphere sphere3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className={`overlay ${isVisible ? 'fade-in' : ''}`}>
        {/* Premium Badge */}
        <div className="premium-badge">
          <span className="badge-text">⚡ Next-Gen Company Intelligence Platform</span>
        </div>

        <h1 className="landing-title">
          <span className="gradient-text">Company</span>
          <span className="title-light"> Connect</span>
        </h1>

        <p className="landing-subtitle">
          Discover and manage company information in one place.
        </p>

        <p className="landing-desc">
          Experience seamless company management with our advanced analytics,
          real-time insights, and powerful collaboration tools.
        </p>

        {/* Feature Highlights */}
        <div className="feature-highlights">
          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <span>Real-time Analytics</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <span>Enterprise Security</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <span>Lightning Fast</span>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn-premium-primary"
            onClick={() => navigate("/register")}
          >
            <span className="btn-content">
              Get Started
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>

          <button
            className="btn-premium-secondary"
            onClick={() => navigate("/login")}
          >
            <span className="btn-content">
              Sign In
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M15 9L20 12L15 15M20 12H9M12 19C10.2 19 8.5 18.2 7.3 16.8C6.1 15.4 5.5 13.7 5.5 12C5.5 10.3 6.1 8.6 7.3 7.2C8.5 5.8 10.2 5 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-item">
            <div className="trust-number">10K+</div>
            <div className="trust-label">Active Companies</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">99.9%</div>
            <div className="trust-label">Uptime SLA</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">24/7</div>
            <div className="trust-label">Premium Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;