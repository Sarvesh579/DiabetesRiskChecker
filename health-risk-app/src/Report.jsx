import React, { useEffect, useState } from "react";
import "./Report.css";

function Report() {
  const [riskData, setRiskData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("riskResult");
    if (stored) {
      setRiskData(JSON.parse(stored));
    }
  }, []);

  if (!riskData) {
    return (
      <>
        {/* Fixed Header */}
        <header className="header">
          <div className="site-name">HealthRiskPro</div>
          <button className="contact-btn" onClick={() => setShowModal(true)}>
            Contact
          </button>
        </header>

        <div className="report-container">
          <div className="report-card">
            <h2>No Report Found</h2>
            <p>Please fill the questionnaire first.</p>
          </div>
        </div>

        {/* Contact Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Contact Us</h3>
              <p>Email: contact@healthriskpro.com</p>
              <p>Phone: +91 12345 67890</p>
              <p>Address: 123 Health Street, Mumbai, India</p>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  const { riskPercentage } = riskData;
  let riskLevel = "Low";
  if (riskPercentage >= 70) riskLevel = "High";
  else if (riskPercentage >= 40) riskLevel = "Moderate";

  const suggestions = {
    Low: [
      "Maintain a balanced diet and regular exercise.",
      "Keep track of annual health checkups.",
      "Stay hydrated and sleep well.",
    ],
    Moderate: [
      "Monitor blood sugar and blood pressure regularly.",
      "Incorporate daily walks or light exercise.",
      "Consult a doctor for preventive measures.",
    ],
    High: [
      "Schedule a medical checkup immediately.",
      "Adopt a strict diet and fitness plan as advised by a doctor.",
      "Avoid smoking, alcohol, and junk food.",
      "Monitor glucose and blood pressure daily.",
    ],
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="header">
        <div className="site-name">HealthRiskPro</div>
        <div className="header-buttons">
          <button className="contact-btn right" onClick={() => window.location.href = "/"}>
              Again
            </button>
          <button className="contact-btn" onClick={() => setShowModal(true)}>
            Contact
          </button>
        </div>
      </header>

      <div className="report-container">
        <div className="report-card risk-section">
          <h2>Your Diabetes Risk</h2>
          <p className="risk-percentage">{riskPercentage}%</p>
          <p className={`risk-level ${riskLevel.toLowerCase()}`}>{riskLevel} Risk</p>
        </div>

        <div className="report-card suggestions-section">
          <h2>Suggestions</h2>
          <ul>
            {suggestions[riskLevel].map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Us</h3>
            <p>Email: contact@healthriskpro.com</p>
            <p>Phone: +91 12345 67890</p>
            <p>Address: 123 Health Street, Mumbai, India</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Report;
