import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import Loader from "../Loader";
import Button from "./Button";

export const Dashboard = () => {
  const { id } = useParams();
  const [orderInformation, setOrderInformation] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/getusersAdmin/${id}`
        );
        const data = response.data;
        setUserInformation(data.data);
        setOrderInformation(data.orderList);
        setOrderList(data.orders || []);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (id) fetchUserInformation();
  }, [id]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <StyledWrapper>
      {userInformation ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="navbar flex items-center justify-between px-4 py-2 bg-white shadow-md sm:px-6 md:px-8">
            <div className="navbar-left">
              <h1 className="username text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl">
                {userInformation.username || "Guest User"}
              </h1>
            </div>
            <div className="navbar-right flex items-center space-x-4">
              <div className="notifications relative">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    y: [0, -5, 0],
                    transition: { repeat: Infinity, duration: 1.5 },
                  }}
                  className="icon-wrapper cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon w-6 h-6 text-gray-700 md:w-8 md:h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {orderInformation}
                  </span>
                </motion.div>
              </div>
              <div className="avatar">
                <img
                  alt="User avatar"
                  src={userInformation.userImage || "/default-avatar.png"}
                  className="avatar-image w-8 h-8 rounded-full object-cover border border-gray-300 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
              </div>
            </div>
          </header>

          <motion.div
            className="orders-summary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2>Total Orders: {orderInformation || "N/A"}</h2>
          </motion.div>
          <motion.div
            className="orders-list"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            <h2 className="title">Orders List:</h2>
            <div className="list">
              {Array.isArray(orderList) &&
                orderList
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order, index) => (
                    <motion.div
                      className="order-card"
                      key={order._id}
                      custom={index}
                      variants={cardVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="order-details">
                        <img
                          src={order.productImage}
                          alt="Product"
                          className="product-image"
                        />
                        <div className="info">
                          <p>
                            <strong>Order ID:</strong> {order._id}
                          </p>
                          <p>
                            <strong>Product Name:</strong> {order.productName}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {order.quantity}
                          </p>
                          <p>
                            <strong>Price:</strong> ${order.productPrice}
                          </p>
                          <p>
                            <strong>Status:</strong> {order.status}
                          </p>
                          <p>
                            <strong>Created At:</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <Button
                            label="Remove"
                            orderId={order._id}
                            userId={id}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #a18cd1, #fbc2eb);
    color: #f1f5f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .username {
    font-size: 1.8rem;
    font-weight: bold;
  }

  .notifications {
    position: relative;
  }

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    background: #64748b;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
  }

  .icon {
    width: 28px;
    height: 28px;
    color: #f1f5f9;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }

  .avatar-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .orders-summary {
    margin: 2rem 0;
    padding: 1.5rem;
    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 1.25rem;
  }

  .orders-list {
    margin: 2rem auto;
    max-width: 900px;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .order-card {
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1.5rem;
  }

  .order-details {
    display: flex;
    gap: 1.5rem;
  }

  .product-image {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;
