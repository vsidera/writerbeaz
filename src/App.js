import Signup from './Components/Auth/Signup';
import OtpVerification from './Components/Auth/OtpVerification';
import Login from './Components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;