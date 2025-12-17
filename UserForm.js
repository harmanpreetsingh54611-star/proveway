import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 18 || formData.age > 120) {
      newErrors.age = "Age must be between 18 and 120";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      const fullName = `${formData.firstName} ${formData.lastName}`;
      alert(`Welcome ${fullName}! Age: ${formData.age}`);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
            }}
          />
          {errors.firstName && (
            <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
            }}
          />
          {errors.lastName && (
            <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>
              {errors.lastName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
            }}
          />
          {errors.age && (
            <p style={{ color: "red", fontSize: "14px", margin: "5px 0 0 0" }}>
              {errors.age}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <h3>
            ✅ Welcome {formData.firstName} {formData.lastName}!
          </h3>
          <p>
            Your age: <strong>{formData.age}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
