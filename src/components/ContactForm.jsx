import { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneType: '',
    staff: '',
    bio: '',
    emailNotifications: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'bio' && value.length > 280) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Phone number must be in format: XXX-XXX-XXXX';
      }

      if (!formData.phoneType) {
        newErrors.phoneType = 'Please select a phone type';
      }
    }

    if (formData.bio.length > 280) {
      newErrors.bio = 'Bio must not exceed 280 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name: *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email: *</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number: (XXX-XXX-XXXX)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="XXX-XXX-XXXX"
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phoneType">Phone Type:</label>
        <select
          id="phoneType"
          name="phoneType"
          value={formData.phoneType}
          onChange={handleChange}
        >
          <option value="">Select a type</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Mobile">Mobile</option>
        </select>
        {errors.phoneType && <span className="error">{errors.phoneType}</span>}
      </div>

      <div className="form-group">
        <label>Staff:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="staff"
              value="Instructor"
              checked={formData.staff === 'Instructor'}
              onChange={handleChange}
            />
            Instructor
          </label>
          <label>
            <input
              type="radio"
              name="staff"
              value="Student"
              checked={formData.staff === 'Student'}
              onChange={handleChange}
            />
            Student
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bio">
          Bio: ({280 - formData.bio.length} characters remaining)
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          maxLength={280}
        />
        {errors.bio && <span className="error">{errors.bio}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={formData.emailNotifications}
            onChange={handleChange}
          />
          Sign up for email notifications
        </label>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
