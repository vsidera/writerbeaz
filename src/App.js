import { Route, Routes, Navigate, HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import TutorRouter from "./Router/TutorRouter";
import AdminRouter from "./Router/AdminRouter";
import { useSelector } from "react-redux";
import Home from "./Components/User/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import OtpVerification from "./Components/Auth/OtpVerification";
import Forgot from "./Components/Auth/Forgot";
import Reset from "./Components/Auth/Reset";
import ChatPage from "./Components/Chat/ChatPage";
import { useState } from "react";

function App() {
  const user = useSelector((state) => state.user);

  const isAdmin = user && user.user_type === "Admin";
  const isUser = user && user.user_type === "User";
  const isTutor = user && user.user_type === "Tutor";
  // const [display, setDisplay] = useState('none');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/forgot-password/:id" element={<Reset />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          {/* USER */}
          {isUser || isAdmin ? (
            <Route path="/user/*" element={<UserRouter />} />
          ) : (
            <Route path="/user/*" element={<Navigate to="/login" />} />
          )}

          {/* FREELANCER */}
          {isTutor || isAdmin ? (
            <Route path="/tutor/*" element={<TutorRouter />} />
          ) : (
            <Route path="/tutor/*" element={<Navigate to="/login" />} />
          )}

          {/* ADMIN */}
          {isAdmin ? (
            <Route path="/admin/*" element={<AdminRouter />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
      <ChatPage/>
    </>
  );
}

export default App;
