import { Route, Routes } from "react-router-dom";
import Login from "./comoents/Login";
import Navbar from "./comoents/Navbar";
import { CreateOrder } from "./create Order/CreateOder";
import CreateAccount from "./comoents/CreateAccount";
import LogoutPage from "./comoents/LogoutPage";
import { Dashboard } from "./comoents/Dashboard";
import ResetPassword from "./comoents/Forrgetpassword";
import NewPassword from "./comoents/NewPassword";
import { TestingDashboard } from "./comoents/testing dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard/:id"
          element={
            <>
        
              <Dashboard />
            </>
          }
        />
        <Route
          path="/account/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/account/create-account"
          element={
            <>
              <CreateAccount />
            </>
          }
        />
        <Route
          path="/createorder/:id"
          element={
            <>
              <Navbar />
              <CreateOrder />
            </>
          }
        />
        <Route
          path="/account/forgot-password"
          element={
            <>
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <>
              <NewPassword />
            </>
          }
        />
        <Route path="/account/logout" element={<LogoutPage />} />
        <Route
          path="/testing/dashboard/:id"
          element={
            <>
            <Navbar />
              <TestingDashboard />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
