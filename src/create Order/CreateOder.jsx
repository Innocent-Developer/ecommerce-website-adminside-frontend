import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../Loader";
import { motion } from "framer-motion";

export const CreateOrder = () => {
  const { id } = useParams(); // Destructure 'id' from useParams
  const [userInformation, setUserInformation] = useState({});
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    quantity: 1,
    productDescription: "",
    productImage: null,
    adminUserId: "",
    adminEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]); // Added state for order list length

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/getusersAdmin/${id}`
        );
        setUserInformation(response.data.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (id) {
      fetchUserInformation();
    }
  }, [id]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      adminUserId: id || "",
      adminEmail: userInformation.email || "",
    }));
  }, [id, userInformation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (file) => {
    setFormData({ ...formData, productImage: file.base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/admin/create-order/`,
        formData
      );

      console.log("Order created successfully:", response.data);
      alert("Order Created Successfully");
      
      // Update order list (assuming response returns new order)
      setOrderList((prevOrders) => [...prevOrders, response.data]);

      setFormData({
        productName: "",
        productPrice: "",
        quantity: 1,
        productDescription: "",
        productImage: null,
        adminUserId: id || "",
        adminEmail: userInformation.email || "",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center fixed inset-0 bg-gray-100 z-50">
          <Loader />
        </div>
      ) : (
        <>
          <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
            <h1 className="text-2xl font-bold">
              {userInformation.username || "Guest User"}
            </h1>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -5, 0],
                  transition: { repeat: Infinity, duration: 1.5 },
                }}
                className="relative p-2 bg-white/10 rounded-full cursor-pointer backdrop-blur-sm border border-white/10"
              >
                <NavLink to={`/createorder/${id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-gray-100"
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
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {orderList.length}
                  </span>
                </NavLink>
              </motion.div>
              <NavLink to={`/dashboard/${id}`}>
                <img
                  src={userInformation.userImage || "/default-avatar.png"}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/20"
                />
              </NavLink>
            </div>
          </header>

          <motion.div
            className="min-h-screen flex items-center justify-center"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-4xl w-full mx-4"
            >
              <h1 className="text-4xl font-bold text-center text-orange-500">
                Create New Order
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col space-y-2">
                  <span className="text-lg font-medium">Product Name</span>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-orange-400 w-full rounded-xl p-3"
                    placeholder="Product Name"
                    required
                  />
                </label>

                <label className="flex flex-col space-y-2">
                  <span className="text-lg font-medium">Product Price (PKR)</span>
                  <input
                    type="number"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-orange-400 w-full rounded-xl p-3"
                    placeholder="PKR"
                    required
                    min="0"
                  />
                </label>

                <label className="flex flex-col space-y-2">
                  <span className="text-lg font-medium">Product Quantity</span>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-orange-400 w-full rounded-xl p-3"
                    placeholder="Minimum 1"
                    required
                    min="1"
                  />
                </label>

                <label className="flex flex-col space-y-2 md:col-span-2">
                  <span className="text-lg font-medium">Product Description</span>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered focus:outline-none focus:ring-2 focus:ring-orange-400 w-full rounded-xl p-3"
                    placeholder="Product Description"
                    rows="4"
                    required
                  />
                </label>

                <label className="flex flex-col space-y-2 md:col-span-2">
                  <span className="text-lg font-medium">Product Image</span>
                  <FileBase64
                    multiple={false}
                    onDone={handleFileUpload}
                  />
                </label>
              </div>

              <div className="text-center">
                <motion.button
                  type="submit"
                  className="btn bg-orange-400 text-white text-lg font-semibold px-8 py-3 rounded-2xl shadow-md hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-transform duration-300"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Order
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
};
