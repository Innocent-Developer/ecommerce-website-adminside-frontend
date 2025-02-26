import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #4f46e5;
  animation: spin 1s ease infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Get User's Location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User Location:", latitude, longitude);

          try {
            const { data } = await axios.post(
              `${process.env.REACT_APP_ADMIN_BACKEND_URL}/account/login`,
              { ...login, latitude, longitude }
            );

            localStorage.setItem("user", JSON.stringify(data.data));
            toast.success("Login Successful");
            navigate(`/dashboard/${data.data.id}`);
          } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
            toast.error("Login failed");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.warning("Could not get location. Please enable location services.");
          submitLoginWithoutLocation();
        }
      );
    } else {
      toast.warning("Geolocation is not supported by your browser.");
      submitLoginWithoutLocation();
    }
  };

  // Fallback function if location is denied
  const submitLoginWithoutLocation = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/account/login`,
        login
      );

      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Login Successful");
      navigate(`/dashboard/${data.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form animate-slide-in" onSubmit={handleLogin}>
        <p className="form-title">Sign in to your account</p>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={login.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={login.password}
            onChange={handleChange}
            required
          />
        </div>
        <p className="forgot-password">
          <NavLink to={"/account/forgot-password"}>Forgot password?</NavLink>
        </p>
        <button type="submit" className="submit" disabled={loading}>
          {loading ? <Loader /> : "Sign in"}
        </button>
        <p className="signup-link">
          No account? <NavLink to={"/account/create-account"}>Sign up</NavLink>
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
  background: linear-gradient(135deg, #a18cd1, #fbc2eb);
  padding: 1rem;

  .form {
    background: #fff;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    border-radius: 1rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1s ease-out, slideIn 0.8s ease-out;
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #4f46e5;
  }

  .error-message {
    color: #e63946;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .input-container {
    margin-bottom: 1.5rem;
  }

  .input-container label {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
    display: block;
  }

  .input-container input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    transition: border-color 0.3s ease;
  }

  .input-container input:focus {
    border-color: #4f46e5;
    outline: none;
  }

  .forgot-password {
    text-align: right;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  .forgot-password a {
    color: #4f46e5;
    text-decoration: underline;
  }

  .submit {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  }

  .submit:hover:not(:disabled) {
    transform: scale(1.02);
    background: linear-gradient(135deg, #5a0db5, #1b61e3);
    box-shadow: 0 6px 12px rgba(90, 13, 181, 0.4);
  }

  .submit:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .signup-link {
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
    margin-top: 1.5rem;
  }

  .signup-link a {
    color: #4f46e5;
    text-decoration: underline;
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
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default Login;
