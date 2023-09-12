import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      maxWidth: '25%',
      width: 'auto',
      maxHeight: '35%',
      padding: '20px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
};

function CancelModal({ isOpen, closeModal, orderData }) {
    const authToken = useSelector((state) => state.accessToken);
    const userId = useSelector((state) => state.user.user_id);

    const [reason, setReason] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setReason(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await api.put(`/users/user-ordercancel/${orderData.id}/`, {
            reason: reason,
          });
    
          if (response.status === 200) {
            toast.success('Order canceled successfully');
            closeModal();
            navigate('/');
          } else {
            toast.error('Failed to cancel order');
          }
        } catch (error) {
          console.error('Error canceling order:', error);
          toast.error('Failed to cancel order');
        }
      };    

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Cancel Order Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
    >
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 focus:outline-none hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Cancel Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-gray-600 font-medium">
              Reason for Cancellation:
            </label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Confirm Cancellation
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CancelModal