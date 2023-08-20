import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import UserRouter from './Router/UserRouter';
import FreelancerRouter from './Router/FreelancerRouter';
import AdminRouter from './Router/AdminRouter';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user);

  const isAdmin = user && user.user_type === 'Admin';
  const isUser = user && user.user_type === 'User';
  const isFreelancer = user && user.user_type === 'Freelancer';

  return (
    <>
      <BrowserRouter>
        <Routes>


          {/* USER */}
          <Route path="/*" element={<UserRouter />} />


          {/* FREELANCER */}
          {isFreelancer || isAdmin ? (
            <Route path="/freelancer/*" element={<FreelancerRouter />} />
          ) : (
            <Route path="/freelancer/*" element={<Navigate to="/login" />} />
          )}


          {/* ADMIN */}
          {isAdmin ? (
            <Route path="/admin/*" element={<AdminRouter />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          )}


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
