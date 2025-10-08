import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TakeQuestionnaire.css";

function TakeQuestionnaire() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    polyuria: "",
    polydipsia: "",
    sudden_weight_loss: "",
    weakness: "",
    polyphagia: "",
    genital_thrush: "",
    visual_blurring: "",
    itching: "",
    irritability: "",
    delayed_healing: "",
    partial_paresis: "",
    muscle_stiffness: "",
    alopecia: "",
    obesity: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload in model-compatible format
    const payload = {
      Age: parseInt(formData.age),
      Sex: formData.sex === "Male" ? 1 : 0,
      Polyuria: formData.polyuria === "Yes" ? 1 : 0,
      Polydipsia: formData.polydipsia === "Yes" ? 1 : 0,
      sudden_weight_loss: formData.sudden_weight_loss === "Yes" ? 1 : 0,
      weakness: formData.weakness === "Yes" ? 1 : 0,
      Polyphagia: formData.polyphagia === "Yes" ? 1 : 0,
      Genital_thrush: formData.genital_thrush === "Yes" ? 1 : 0,
      visual_blurring: formData.visual_blurring === "Yes" ? 1 : 0,
      Itching: formData.itching === "Yes" ? 1 : 0,
      Irritability: formData.irritability === "Yes" ? 1 : 0,
      delayed_healing: formData.delayed_healing === "Yes" ? 1 : 0,
      partial_paresis: formData.partial_paresis === "Yes" ? 1 : 0,
      muscle_stiffness: formData.muscle_stiffness === "Yes" ? 1 : 0,
      Alopecia: formData.alopecia === "Yes" ? 1 : 0,
      Obesity: formData.obesity === "Yes" ? 1 : 0,
    };

    try {
      const response = await fetch("http://localhost:4000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      sessionStorage.setItem(
        "riskResult",
        JSON.stringify({ riskPercentage: data.probability })
      );
      navigate("/report");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="header">
        <div className="site-name">HealthRiskPro</div>
        <button
          className="contact-btn"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer", color: "#000" }}
        >
          Contact
        </button>
      </header>

      {/* Questionnaire Form */}
      <div className="questionnaire-container">
        <div className="card">
          <h2>Questionnaire</h2>
          <p style={{ color: "#eea034", textAlign: "center" }}>
            Your data is secure and we do not store nor share any of it.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Age Field */}
            <div className="form-row">
              <label>Age</label>
              <input
                className="input"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Enter your age"
              />
            </div>

            {/* Radio Inputs */}
            {[
              { label: "Sex", name: "sex", options: ["Male", "Female"] },
              { label: "Are you urinating more often than usual?", name: "polyuria", options: ["Yes", "No"] },
              { label: "Do you feel thirsty often?", name: "polydipsia", options: ["Yes", "No"] },
              { label: "Are you facing sudden Weight Loss?", name: "sudden_weight_loss", options: ["Yes", "No"] },
              { label: "Weakness / Tired most of the time?", name: "weakness", options: ["Yes", "No"] },
              { label: "Feeling hungry more than often?", name: "polyphagia", options: ["Yes", "No"] },
              { label: "Did you recently have a yeast infection causing itching and irritation in the genital area?", name: "genital_thrush", options: ["Yes", "No"] },
              { label: "Do you face blurry vision?", name: "visual_blurring", options: ["Yes", "No"] },
              { label: "Frequent Itching", name: "itching", options: ["Yes", "No"] },
              { label: "Feeling easily annoyed or frustrated?", name: "irritability", options: ["Yes", "No"] },
              { label: "Cuts or wounds that take a long time to heal?", name: "delayed_healing", options: ["Yes", "No"] },
              { label: "Weakness or partial paralysis in a part of your body?", name: "partial_paresis", options: ["Yes", "No"] },
              { label: "Do muscles have stiffness sometimes?", name: "muscle_stiffness", options: ["Yes", "No"] },
              { label: "Losing hair from your scalp or body?", name: "alopecia", options: ["Yes", "No"] },
              { label: "Are you obese?", name: "obesity", options: ["Yes", "No"] },
            ].map((field) => (
              <div className="form-row" key={field.name}>
                <label>{field.label}</label>
                <div className="radio-group">
                  {field.options.map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={formData[field.name] === option}
                        onChange={handleChange}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button className="btn" type="submit" style={{ color: "black" }}>
              Submit
            </button>
          </form>
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
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TakeQuestionnaire;
