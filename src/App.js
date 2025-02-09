import { Route, Routes } from "react-router-dom";
import Login from "./comoents/Login";
import { CreateOrder } from "./create Order/CreateOder";
import CreateAccount from "./comoents/CreateAccount";
import LogoutPage from "./comoents/LogoutPage";
import { Dashboard } from "./comoents/Dashboard";
import ResetPassword from "./comoents/Forrgetpassword";
import NewPassword from "./comoents/NewPassword";
import { Avatars } from "./comoents/Avator";
import { UserProfile } from "./comoents/UserProfile";

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
          path="/dashboard/:id"
          element={
            <>
       
              <Dashboard />
            </>
          }
        />
        <Route path="/account/change/avator/:id" element={<Avatars />} />
        <Route path="/account/user-profile/:id" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
console.log('Rendering App component');
console.log('Rendering Routes component');