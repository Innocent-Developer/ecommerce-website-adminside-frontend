import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({ newPassword: "" });
  const [showPassword, setShowPassword] = useState(false); // Toggle for showing/hiding password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassword({ ...password, newPassword: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/account/reset-password`,
        { token, newPassword: password.newPassword }
      );
      toast.success("Password reset successful! Please log in.");
      navigate("/account/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form animate-slide-in" onSubmit={handleSubmit}>
        <h1 className="form-title">Reset Your Password</h1>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"} // Dynamically toggle input type
            placeholder="Enter new password"
            value={password.newPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="submit" disabled={loading}>
          {loading ? "Resetting..." : "Change Password"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
   background: linear-gradient(135deg, #a18cd1, #fbc2eb);

  .form {
    background: #ffffff;
    width: 90%;
    max-width: 400px;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    animation: fadeIn 0.8s ease-out, slideIn 1s ease-out;
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    color: #4a4e69;
    margin-bottom: 1.5rem;
  }

  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .input-container input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .input-container input:focus {
    border-color: #a18cd1;
    box-shadow: 0 4px 8px rgba(161, 140, 209, 0.3);
    outline: none;
  }

  .show-password-btn {
    position: absolute;
    right: 1rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    background: transparent;
    border: none;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .show-password-btn:hover {
    color: #4a4e69;
  }

  .submit {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s;
  }

  .submit:hover {
    background: linear-gradient(135deg, #5b0db5, #1b61e3);
    transform: scale(1.02);
    box-shadow: 0 6px 10px rgba(91, 13, 181, 0.4);
  }

  .submit:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  .error {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #e63946;
    text-align: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(30px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default ResetPassword;
