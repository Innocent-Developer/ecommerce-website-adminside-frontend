import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    Fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://ecommerce-website-adminside-backend.onrender.com/account/signup',
        create
      );
      toast.success('Signup Successful');
      setCreate({
        Fullname: '',
        username: '',
        email: '',
        password: '',
      });
      navigate(`/account/login`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSignup}>
        <p className="form-title">Create a New Account</p>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <input
            type="text"
            id="Fullname"
            name="Fullname"
            placeholder=" "
            value={create.Fullname}
            onChange={handleChange}
            required
          />
          <label htmlFor="Fullname">Full Name</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="username"
            name="username"
            placeholder=" "
            value={create.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={create.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=" "
            value={create.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : 'Sign up'}
        </button>
        <p className="signup-link">
          Already have an account? <NavLink to="/account/login">Log in</NavLink>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
   background: linear-gradient(135deg, #a18cd1, #fbc2eb);
  animation: fadeIn 1s ease-in;

  .form {
    background-color: #ffffff;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: slideUp 0.5s ease-out;
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  .error-message {
    color: #dc2626;
    background: #fee2e2;
    padding: 0.5rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1rem;
  }

  .input-container {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .input-container input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    outline: none;
    transition: border 0.3s, box-shadow 0.3s;
  }

  .input-container input:focus {
    border: 1px solid #4f46e5;
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.4);
  }

  .input-container label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    background: #ffffff;
    padding: 0 0.25rem;
    font-size: 0.875rem;
    color: #9ca3af;
    transition: all 0.3s;
    pointer-events: none;
  }

  .input-container input:focus + label,
  .input-container input:not(:placeholder-shown) + label {
    top: -10px;
    left: 0.75rem;
    font-size: 0.75rem;
    color: #4f46e5;
  }

  .submit {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #4f46e5;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .submit:hover:not(:disabled) {
    background: #4338ca;
  }

  .submit:disabled {
    background: #a1a1aa;
    cursor: not-allowed;
  }

  .loader {
    border: 4px solid transparent;
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .signup-link {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .signup-link a {
    color: #4f46e5;
    text-decoration: underline;
  }
`;

export default CreateAccount;
