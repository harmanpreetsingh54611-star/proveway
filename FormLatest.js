import { useState } from "react";
export default function FormLatest() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [submitted, setsubm] = useState(false);
  const [errors, setErrors] = useState({}); // NEW: error state

  const handleSubmit = (e) => {
    console.log(formData);
    // Validation
    const newErrors = {};
    if (!formData.firstName)
      newErrors.firstName = "First name must be required";
    if (formData.firstName.length < 3)
      newErrors.firstName = "First name must be greater than 3";
    if (!formData.lastName) {
      newErrors.lastName = "Last name must be at least 3 characters";
    }
    if (Object.keys(newErrors).length > 0) setErrors(newErrors);
    setsubm(true);
    e.preventDefault(); //e.preventDefault() missing - form refreshes page on submit
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <label>Enter your Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <button type="submit">submit</button>
      </form>
      {submitted && <h1>{formData.firstName + "" + formData.lastName}</h1>}
    </>
  );
}
