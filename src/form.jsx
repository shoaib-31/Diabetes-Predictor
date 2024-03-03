import React, { useState } from "react";

const DiabetesForm = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = Object.values(formData).map((val) => parseFloat(val)); // Convert form data to an array
      const response = await fetch("http://34.131.3.111:8000/svm/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_data: dataToSend,
        }),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Number of Pregnancies:
            <input
              type="number"
              name="pregnancies"
              value={formData.pregnancies}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Glucose:
            <input
              type="number"
              name="glucose"
              value={formData.glucose}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Blood Pressure:
            <input
              type="number"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Skin Thickness:
            <input
              type="number"
              name="skinThickness"
              value={formData.skinThickness}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Insulin:
            <input
              type="number"
              name="insulin"
              value={formData.insulin}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            BMI:
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Diabetes Pedigree Function:
            <input
              type="number"
              name="diabetesPedigreeFunction"
              value={formData.diabetesPedigreeFunction}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default DiabetesForm;
