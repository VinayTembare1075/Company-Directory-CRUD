import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
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

  const deleteCompany = async (id) => {
    setDeletingId(id);
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:8080/api/companies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Show success animation
      const btn = document.querySelector(`.delete-btn-${id}`);
      if (btn) btn.classList.add('success-animation');
      
      setTimeout(() => {
        fetchCompanies();
        setShowDeleteModal(false);
        setSelectedCompany(null);
      }, 500);
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  return (
    <div className="manage-container">
      {/* Animated Background */}
      <div className="manage-bg">
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
          <br></br><br></br><br></br>
      <div className="manage-content">
        {/* Header Section */}
        <div className="manage-header">
          <div className="header-badge">
            <svg className="header-icon" viewBox="0 0 24 24" fill="none">
              <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="manage-title">
            <span className="gradient-text-manage">Manage Companies</span>
          </h1>
          <p className="manage-subtitle">
            View, edit, and manage all registered companies
          </p>
        </div>

        {/* Search Bar */}
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
          <div className="stats-badge">
            <span className="stats-count">{filteredCompanies.length}</span>
            <span className="stats-text">Companies Found</span>
          </div>
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
          <div className="companies-grid">
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
              filteredCompanies.map((company) => (
                <div className="company-card" key={company._id}>
                  <div className="card-glow"></div>
                  <div className="card-header">
                    <div className="company-avatar">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="company-badge">
                      {company.link ? "Active" : "Standard"}
                    </div>
                  </div>
                  
                  <h3 className="company-name">{company.companyName}</h3>
                  
                  <div className="company-details">
                    <div className="detail-item">
                      <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C12 22 20 15 20 9C20 4.6 16.4 1 12 1C7.6 1 4 4.6 4 9C4 15 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{company.location}</span>
                    </div>
                    <div className="detail-item">
                      <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{company.email}</span>
                    </div>
                    <div className="detail-item">
                      <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92V19C22.0001 19.5304 21.7892 20.0391 21.4141 20.4142C21.039 20.7893 20.5304 21 20 21H19C10.2 21 3 13.8 3 5V4C3 2.9 3.9 2 5 2H7.08C7.54 2 7.96 2.29 8.14 2.71L9.39 5.21C9.57 5.63 9.5 6.11 9.18 6.45L7.33 8.3C8.43 10.56 10.43 12.56 12.69 13.66L14.54 11.81C14.88 11.49 15.36 11.42 15.78 11.6L18.28 12.85C18.71 13.04 19 13.46 19 13.92Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{company.phone}</span>
                    </div>
                    {company.link && (
                      <div className="detail-item">
                        <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 2C9.9 4.5 8.8 8.2 8.8 12C8.8 15.8 9.9 19.5 12 22C14.1 19.5 15.2 15.8 15.2 12C15.2 8.2 14.1 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <a href={company.link} target="_blank" rel="noopener noreferrer" className="company-link">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="card-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/edit/${company._id}`)}
                    >
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Edit
                    </button>
                    <button
                      className={`btn-delete delete-btn-${company._id}`}
                      onClick={() => confirmDelete(company)}
                      disabled={deletingId === company._id}
                    >
                      {deletingId === company._id ? (
                        <div className="small-spinner"></div>
                      ) : (
                        <>
                          <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCompany && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12M12 16H12.01M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{selectedCompany.companyName}</strong>?</p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={() => deleteCompany(selectedCompany._id)}>
                Delete Company
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .manage-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 2rem;
        }

        /* Animated Background */
        .manage-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;
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
          top: 0;
          left: 0;
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
        .manage-content {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .manage-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header-badge {
          width: 70px;
          height: 70px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
        }

        .header-icon {
          width: 35px;
          height: 35px;
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

        .manage-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .gradient-text-manage {
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

        .manage-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        /* Search Section */
        .search-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 1;
          position: relative;
          max-width: 500px;
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
          border-color: #10b981;
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

        .stats-badge {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .stats-count {
          font-size: 1.5rem;
          font-weight: 800;
          color: #10b981;
        }

        .stats-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
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
          border-top-color: #10b981;
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
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
        }

        .company-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
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
          background: linear-gradient(135deg, #10b981, #059669);
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

        .company-badge {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .company-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }

        .company-details {
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .detail-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .company-link {
          color: #34d399;
          text-decoration: none;
          transition: color 0.3s;
        }

        .company-link:hover {
          color: #6ee7b7;
        }

        /* Card Actions */
        .card-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-edit, .btn-delete {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btn-edit {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .btn-edit:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }

        .btn-delete {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .btn-delete:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-2px);
        }

        .btn-delete:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-icon {
          width: 16px;
          height: 16px;
        }

        .small-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #f87171;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          grid-column: 1 / -1;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .empty-state h3 {
          color: white;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: rgba(255, 255, 255, 0.6);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
 backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s;
        }

        .modal-content {
          background: rgba(15, 12, 41, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          max-width: 450px;
          width: 90%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.3s;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .modal-icon {
          width: 60px;
          height: 60px;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .modal-icon svg {
          width: 30px;
          height: 30px;
          color: #f87171;
        }

        .modal-header h3 {
          color: white;
          font-size: 1.5rem;
        }

        .modal-body {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .modal-body p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
        }

        .modal-warning {
          color: #f87171;
          font-size: 0.875rem;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
        }

        .modal-cancel, .modal-confirm {
          flex: 1;
          padding: 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .modal-cancel {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .modal-cancel:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-confirm {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .modal-confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
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
            transform: scale(0.95);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .manage-container {
            padding: 1rem;
          }

          .manage-title {
            font-size: 1.75rem;
          }

          .companies-grid {
            grid-template-columns: 1fr;
          }

          .search-section {
            flex-direction: column;
          }

          .search-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ManageCompanies;