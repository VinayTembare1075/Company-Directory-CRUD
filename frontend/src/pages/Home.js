import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/companies", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const role = localStorage.getItem("role");

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="home-bg">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="gradient-orb orb4"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${12 + Math.random() * 20}s`,
            width: `${2 + Math.random() * 8}px`,
            height: `${2 + Math.random() * 8}px`
          }}></div>
        ))}
      </div>
          <br></br><br></br><br></br>
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            <svg className="hero-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text-hero">Company</span>
            <span className="hero-light"> Information</span>
          </h1>
          <p className="hero-subtitle">
            Discover and explore detailed information about registered companies
          </p>
          
          {/* Stats Section */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{companies.length}</div>
              <div className="stat-label">Total Companies</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{filteredCompanies.length}</div>
              <div className="stat-label">Showing Now</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by company name, location, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                ✕
              </button>
            )}
          </div>
          
          {/* Add Company Button for Admin */}
          {role === "admin" && (
            <button className="add-company-btn" onClick={() => navigate("/add")}>
              <svg className="add-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Add New Company
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading companies...</p>
          </div>
        )}

        {/* Companies Grid */}
        {!loading && (
          <>
            {filteredCompanies.length === 0 ? (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3>No companies found</h3>
                <p>{searchTerm ? "Try adjusting your search" : "Start by adding a new company"}</p>
              </div>
            ) : (
              <div className="companies-grid">
                {filteredCompanies.map((company, index) => (
                  <div className="company-card" key={company._id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="card-glow"></div>
                    <div className="card-header">
                      <div className="company-avatar">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="company-status">
                        <span className="status-dot"></span>
                        Active
                      </div>
                    </div>
                    
                    <h3 className="company-name">{company.companyName}</h3>
                    
                    <div className="company-details">
                      <div className="detail-item">
                        <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <div className="detail-content">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{company.email}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M22 16.92V19C22.0001 19.5304 21.7892 20.0391 21.4141 20.4142C21.039 20.7893 20.5304 21 20 21H19C10.2 21 3 13.8 3 5V4C3 2.9 3.9 2 5 2H7.08C7.54 2 7.96 2.29 8.14 2.71L9.39 5.21C9.57 5.63 9.5 6.11 9.18 6.45L7.33 8.3C8.43 10.56 10.43 12.56 12.69 13.66L14.54 11.81C14.88 11.49 15.36 11.42 15.78 11.6L18.28 12.85C18.71 13.04 19 13.46 19 13.92Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <div className="detail-content">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{company.phone}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 22C12 22 20 15 20 9C20 4.6 16.4 1 12 1C7.6 1 4 4.6 4 9C4 15 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <div className="detail-content">
                          <span className="detail-label">Location</span>
                          <span className="detail-value">{company.location}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item description-item">
                        <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M7 8H17M7 12H14M7 16H11" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <div className="detail-content">
                          <span className="detail-label">Description</span>
                          <span className="detail-value description-text">{company.description}</span>
                        </div>
                      </div>
                      
                      {company.link && (
                        <div className="detail-item">
                          <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 2C9.9 4.5 8.8 8.2 8.8 12C8.8 15.8 9.9 19.5 12 22C14.1 19.5 15.2 15.8 15.2 12C15.2 8.2 14.1 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <div className="detail-content">
                            <span className="detail-label">Website</span>
                            <a href={company.link} target="_blank" rel="noopener noreferrer" className="company-link">
                              Visit Website →
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Animated Background */
        .home-bg {
          position: fixed;
          width: 100%;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;
          z-index: 0;
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
          position: fixed;
          width: 100%;
          height: 100%;
          pointer-events: none;
          top: 0;
          left: 0;
          z-index: 0;
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

        /* Content */
        .home-content {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
        }

        .hero-badge {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 10px 30px -5px rgba(102, 126, 234, 0.4);
        }

        .hero-icon {
          width: 40px;
          height: 40px;
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

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .gradient-text-hero {
          background: linear-gradient(135deg, #fff, #a78bfa, #c084fc);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 3s ease infinite;
        }

        .hero-light {
          color: rgba(255, 255, 255, 0.9);
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        .hero-stats {
          display: inline-flex;
          align-items: center;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: #a78bfa;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* Search Section */
        .search-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 1;
          position: relative;
          min-width: 250px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 2.5rem 0.875rem 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #a78bfa;
          background: rgba(255, 255, 255, 0.08);
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          font-size: 1rem;
        }

        .add-company-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-company-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.4);
        }

        .add-icon {
          width: 18px;
          height: 18px;
        }

        /* Loading State */
        .loading-container {
          text-align: center;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #a78bfa;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Companies Grid */
        .companies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        /* Company Card */
        .company-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1.5rem;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .company-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
          border-color: rgba(167, 139, 250, 0.3);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2, #a78bfa);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .company-card:hover .card-glow {
          opacity: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .company-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .company-avatar svg {
          width: 25px;
          height: 25px;
          color: white;
        }

        .company-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #34d399;
          border-radius: 50%;
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

        .company-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.25rem;
          background: linear-gradient(135deg, #fff, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* Company Details */
        .company-details {
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          align-items: flex-start;
        }

        .detail-icon {
          width: 18px;
          height: 18px;
          color: #a78bfa;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .detail-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
        }

        .detail-value {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          word-break: break-word;
        }

        .description-text {
          line-height: 1.5;
          font-size: 0.813rem;
        }

        .description-item {
          align-items: flex-start;
        }

        .company-link {
          color: #a78bfa;
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .company-link:hover {
          color: #c084fc;
          gap: 0.5rem;
        }

        .card-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .company-id {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .empty-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 1.5rem;
          color: rgba(255, 255, 255, 0.2);
        }

        .empty-state h3 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .empty-state p {
          color: rgba(255, 255, 255, 0.6);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .home-content {
            padding: 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
          }

          .stat-divider {
            display: none;
          }

          .companies-grid {
            grid-template-columns: 1fr;
          }

          .search-section {
            flex-direction: column;
          }

          .add-company-btn {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 0.875rem;
          }

          .company-name {
            font-size: 1.25rem;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
        }
      `}</style>
    </div>
  );
}

export default Home;