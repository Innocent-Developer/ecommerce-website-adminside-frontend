import { Route, Routes } from "react-router-dom";
import Login from "./comoents/Login";
import Navbar from "./comoents/Navbar";
import { CreateOrder } from "./create Order/CreateOder";
import CreateAccount from "./comoents/CreateAccount";
import LogoutPage from "./comoents/LogoutPage";
import { Dashboard } from "./comoents/Dashboard";
import ResetPassword from "./comoents/Forrgetpassword";
import NewPassword from "./comoents/NewPassword";

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
            <Navbar />
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
      </Routes>
    </>
  );
}

export default App;
