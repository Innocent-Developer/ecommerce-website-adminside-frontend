import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { motion } from "framer-motion";
import Header from "./Header"; // Import Header component

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
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
      adminUserId: id,
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
        <>
          <Header userInformation={userInformation} orderListLength={0} /> {/* Insert Header */}
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
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-orange-400 w-full rounded-xl p-3"
                    required
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
