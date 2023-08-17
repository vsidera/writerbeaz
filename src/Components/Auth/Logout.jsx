import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        toast.success('Logged out');
        navigate('/')
        
    };
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout;
