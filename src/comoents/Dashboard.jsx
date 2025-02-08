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

  const handleEditOrder = (orderId) => {
    console.log(`Edit order with ID: ${orderId}`);
    // Implement edit functionality here
  };

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
          <header className="navbar flex items-center justify-between px-4 py-2 sm:px-6 md:px-8">
            <div className="navbar-left">
              <h1 className="username text-lg font-semibold sm:text-xl md:text-2xl">
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
                    className="icon w-6 h-6 md:w-8 md:h-8"
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
                  <span className="badge absolute -top-2 -right-2 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {orderInformation}
                  </span>
                </motion.div>
              </div>
              <div className="avatar">
                <img
                  alt="User avatar"
                  src={userInformation.userImage || "/default-avatar.png"}
                  className="avatar-image w-8 h-8 rounded-full object-cover sm:w-10 sm:h-10 md:w-12 md:h-12"
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
                          <p><strong>Order ID:</strong> {order._id}</p>
                          <p><strong>Product Name:</strong> {order.productName}</p>
                          <p><strong>Quantity:</strong> {order.quantity}</p>
                          <p><strong>Price:</strong> ${order.productPrice}</p>
                          <p><strong>Status:</strong> {order.status}</p>
                          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                          <div className="button-group flex gap-2 mt-4">
                            <Button label="Remove" orderId={order._id} userId={id} />
                            <button
                              className="edit-button bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                              onClick={() => handleEditOrder(order._id)}
                            >
                              Edit
                            </button>
                          </div>
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
  background: linear-gradient(135deg, #0f172a, #1e293b);
  min-height: 100vh;
  padding: 2rem;
  color: #f1f5f9;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .orders-summary, .orders-list {
    margin: 2rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .order-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    gap: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .edit-button {
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.5);
    transition: background 0.3s ease;

    &:hover {
      background: #2563eb;
    }
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;
