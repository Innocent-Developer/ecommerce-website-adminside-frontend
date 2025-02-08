import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../Loader";
import Button from "./Button";

export const Dashboard = () => {
  const { id } = useParams();
  const [userInformation, setUserInformation] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/getusersAdmin/${id}`
        );
        const data = response.data;
        setUserInformation(data.data);
        setOrderList(data.orders || []);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (id) fetchUserInformation();
  }, [id]);

  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setEditedOrder({ ...order });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/admin/update-order/${editingOrderId}`,
        editedOrder
      );
      setOrderList((prev) =>
        prev.map((order) => (order._id === editingOrderId ? editedOrder : order))
      );
      setEditingOrderId(null);
      setEditedOrder({});
    } catch (error) {
      console.error("Error updating order:", error);
    }
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen p-8 text-gray-100">
      {userInformation ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
            <h1 className="text-2xl font-bold">{userInformation.username || "Guest User"}</h1>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 1.5 } }}
                className="relative p-2 bg-white/10 rounded-full cursor-pointer backdrop-blur-sm border border-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {orderList.length}
                </span>
              </motion.div>
              <img src={userInformation.userImage || "/default-avatar.png"} alt="User avatar" className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/20" />
            </div>
          </header>

          <motion.div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-center text-lg border border-white/10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <h2>Total Orders: {orderList.length || "N/A"}</h2>
          </motion.div>

          <motion.div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/10" initial="hidden" animate="visible" transition={{ staggerChildren: 0.2 }}>
            <h2 className="text-2xl font-bold text-center mb-4">Orders List:</h2>
            <div className="space-y-4">
              {orderList
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order, index) => (
                  <motion.div key={order._id} className="p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-md flex gap-4 border border-white/10" custom={index} variants={cardVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <img src={order.productImage} alt="Product" className="w-16 h-16 rounded-xl object-cover shadow-md border border-white/10" />
                    <div>
                      {editingOrderId === order._id ? (
                        <div className="p-4 bg-gray-900/80 rounded-xl shadow-lg space-y-3 border border-gray-700">
                          <p className="text-lg font-semibold text-teal-400">Editing Order: {order._id}</p>
                          <div className="space-y-2">
                            <input type="text" name="productName" value={editedOrder.productName} onChange={handleInputChange} placeholder="Product Name" className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            <input type="number" name="quantity" value={editedOrder.quantity} onChange={handleInputChange} placeholder="Quantity" className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            <input type="number" name="productPrice" value={editedOrder.productPrice} onChange={handleInputChange} placeholder="Price" className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            <input type="text" name="status" value={editedOrder.status} onChange={handleInputChange} placeholder="Status" className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                          </div>
                          <div className="flex justify-between mt-4">
                            <button onClick={handleSaveClick} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">Save</button>
                            <button onClick={() => setEditingOrderId(null)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p><strong>Order ID:</strong> {order._id}</p>
                          <p><strong>Product Name:</strong> {order.productName}</p>
                          <p><strong>Quantity:</strong> {order.quantity}</p>
                          <p><strong>Price:</strong> ${order.productPrice}</p>
                          <p><strong>Status:</strong> {order.status}</p>
                          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                          <div className="flex space-x-2 mt-2">
                            <Button label="Remove" orderId={order._id} userId={id} />
                            <button onClick={() => handleEditClick(order)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Edit</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
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
