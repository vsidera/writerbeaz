import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import UserRouter from './Router/UserRouter';
import FreelancerRouter from './Router/FreelancerRouter';
import AdminRouter from './Router/AdminRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/freelancer/*" element={<FreelancerRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;