import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gray-100 p-4">
      {userInformation ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {userInformation.username || "Guest User"}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    y: [0, -5, 0],
                    transition: { repeat: Infinity, duration: 1.5 },
                  }}
                  className="p-2 bg-blue-500 text-white rounded-full cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
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
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {orderInformation}
                  </span>
                </motion.div>
              </div>
              <img
                alt="User avatar"
                src={userInformation.userImage || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
          </header>

          <motion.div
            className="bg-white shadow-md rounded-xl p-4 text-center mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Total Orders: {orderInformation || "N/A"}
            </h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Orders List
            </h2>
            {Array.isArray(orderList) &&
              orderList
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order, index) => (
                  <motion.div
                    key={order._id}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.productImage}
                        alt="Product"
                        className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="space-y-1">
                        <p className="text-gray-800"><strong>Order ID:</strong> {order._id}</p>
                        <p className="text-gray-800"><strong>Product Name:</strong> {order.productName}</p>
                        <p className="text-gray-800"><strong>Quantity:</strong> {order.quantity}</p>
                        <p className="text-gray-800"><strong>Price:</strong> ${order.productPrice}</p>
                        <p className="text-gray-800"><strong>Status:</strong> {order.status}</p>
                        <p className="text-gray-600 text-sm"><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:flex md:space-x-2">
                      <Button label="Remove" orderId={order._id} userId={id} />
                      <Button label="Edit" orderId={order._id} userId={id} />
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
};
