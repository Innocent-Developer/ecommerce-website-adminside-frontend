import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';

const ResetPassword = () => {
  const [reset, setReset] = useState({ email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReset({ ...reset, [name]: value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/account/forgot-password`,
        reset
      );

      localStorage.setItem('user', JSON.stringify(data.data));
      toast.success(`Reset Password Mail sent to ${reset.email}`);
      setReset({ email: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      toast.error(error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="input-group" onSubmit={handleReset}>
        <h1>Reset Password Request</h1>
        <input
          type="email"
          className="input"
          name="email"
          value={reset.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="off"
          required
        />
        <button className="button--submit" type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Reset Password'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </StyledWrapper>
  );
};

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
   background: linear-gradient(135deg, #a18cd1, #fbc2eb);

  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }

  .input {
    width: 100%;
    max-width: 350px;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease-in-out;
  }

  .input:focus {
    border-color: #8ec5fc;
    box-shadow: 0 0 8px rgba(142, 197, 252, 0.6);
  }

  .button--submit {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 2rem;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(135deg, #8ec5fc, #e0c3fc);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    animation: ${pulse} 1.5s infinite;
  }

  .button--submit:disabled {
    background: #ccc;
    animation: none;
    cursor: not-allowed;
  }

  .error {
    margin-top: 1rem;
    color: red;
    font-size: 14px;
  }
`;

const Loader = styled.div`
  border: 3px solid #fff;
  border-top: 3px solid #8ec5fc;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ResetPassword;
