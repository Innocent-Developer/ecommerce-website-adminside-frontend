import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { motion } from "framer-motion"; // Import framer-motion for animation

export const CreateOrder = () => {
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
  const [loading, setLoading] = useState(false); // Loader state
  const { id } = useParams();

  // Fetch user information on `id` change
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

  // Update `formData` when `userInformation` changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      adminUserId: id,
      adminEmail: userInformation.email || "",
    }));
  }, [id, userInformation]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    setFormData({ ...formData, productImage: file.base64 });
  };

  // Handle form submission
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
      setFormData({
        productName: "",
        productPrice: "",
        quantity: 1,
        productDescription: "",
        productImage: null,
        adminUserId: id,
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
        <motion.div
          className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8"
          style={{
            backgroundImage: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
            backgroundSize: "cover", // Optional: ensures the gradient covers the full div
            backgroundPosition: "center", // Optional: ensures the gradient is centered
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
          >
            <h1 className="text-3xl font-semibold text-center text-indigo-600">
              Create New Order
            </h1>

            <label className="flex flex-col space-y-2">
              <span className="text-lg">Product Name</span>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                placeholder="Product Name"
                required
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg">Product Price (PKR)</span>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                placeholder="PKR"
                required
                min="0"
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg">Product Quantity</span>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                placeholder="Minimum 1"
                required
                min="1"
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg">Product Description</span>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                className="textarea textarea-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                placeholder="Product Description"
                required
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg">Product Image</span>
              <FileBase64
                multiple={false}
                onDone={handleFileUpload}
                className="grow"
                required
              />
            </label>

            <div className="text-center">
              <motion.button
                type="submit"
                className="btn btn-outline btn-accent w-full sm:w-auto mt-4 transition-transform duration-300 transform hover:scale-105"
                disabled={loading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Order
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};
