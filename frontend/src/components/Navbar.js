import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Move useEffect before any conditional returns
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on login & register pages - moved after hooks
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className={`premium-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo Section */}
          <div className="nav-brand" onClick={() => navigate("/home")}>
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-gradient">Company</span>
              <span className="brand-light">Connect</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>

          {/* Navigation Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {/* Admin Links */}
            {role === "admin" && (
              <>
                <Link 
                  to="/home" 
                  className={`nav-link ${location.pathname === "/home" ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21V12L12 10.5L15 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Dashboard</span>
                </Link>

                <Link 
                  to="/add" 
                  className={`nav-link ${location.pathname === "/add" ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Add Company</span>
                </Link>

                <Link 
                  to="/manage" 
                  className={`nav-link ${location.pathname === "/manage" ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Manage</span>
                </Link>
              </>
            )}

            {/* User Links */}
            {role === "user" && (
              <Link 
                to="/home" 
                className={`nav-link ${location.pathname === "/home" ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12L12 10.5L15 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>View Companies</span>
              </Link>
            )}

            {/* User Profile & Logout */}
            {role && (
              <div className="nav-actions">
                <div className="user-profile">
                  <div className="user-avatar">
                    {role === "admin" ? (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 20V19C5 15.1 8.1 12 12 12C15.9 12 19 15.1 19 19V20" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <div className="user-info">
                    <span className="user-role">{role === "admin" ? "Administrator" : "User"}</span>
                    <span className="user-status">Online</span>
                  </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                  <svg className="logout-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .premium-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(15, 12, 41, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-navbar.scrolled {
          background: rgba(15, 12, 41, 0.98);
          backdrop-filter: blur(25px);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
          border-bottom-color: rgba(255, 255, 255, 0.2);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Brand Section */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s ease;
        }

        .nav-brand:hover {
          transform: scale(1.05);
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .brand-icon svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .brand-text {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .brand-gradient {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .brand-light {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1001;
        }

        .menu-line {
          width: 25px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.active .menu-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-menu-btn.active .menu-line:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active .menu-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Navigation Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
          color: white;
          border: 1px solid rgba(102, 126, 234, 0.5);
        }

        .nav-icon {
          width: 18px;
          height: 18px;
        }

        /* Nav Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: 1rem;
          padding-left: 1rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.4rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s;
        }

        .user-profile:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar svg {
          width: 18px;
          height: 18px;
          color: white;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-role {
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: capitalize;
        }

        .user-status {
          font-size: 0.65rem;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .user-status::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Logout Button */
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          color: #ef4444;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.2);
        }

        .logout-icon {
          width: 18px;
          height: 18px;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .nav-container {
            padding: 0.875rem 1.5rem;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 320px;
            height: 100vh;
            background: rgba(15, 12, 41, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: stretch;
            padding: 80px 1.5rem 2rem;
            transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            gap: 0.5rem;
            z-index: 1000;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-links.open {
            right: 0;
          }

          .nav-link {
            justify-content: flex-start;
            padding: 1rem;
          }

          .nav-actions {
            flex-direction: column;
            border-left: none;
            margin-left: 0;
            padding-left: 0;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .user-profile {
            width: 100%;
            justify-content: center;
          }

          .logout-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0.75rem 1rem;
          }

          .brand-text {
            font-size: 1rem;
          }

          .brand-icon {
            width: 30px;
            height: 30px;
          }

          .brand-icon svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;