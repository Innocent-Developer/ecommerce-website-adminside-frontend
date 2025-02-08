import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({ userInformation, orderList, userId }) => {
  return (
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
          <NavLink to={`/createorder/${userId}`}>
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
        <NavLink to={`/dashboard/${userId}`}>
          <img
            src={userInformation.userImage || "/default-avatar.png"}
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/20"
          />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
