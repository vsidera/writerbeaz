import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
      maxHeight: '40%',
      padding: '20px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
};

function FreelancerWorkCompleteModal({ isOpen, closeModal, orderId }) {
    const authToken = useSelector((state) => state.accessToken);
    const userId = useSelector((state) => state.user.user_id);

    const [workData, setWorkData] = useState({
        new_amount: '',
        order_raw_images: null,
      });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkData({ ...workData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setWorkData({ ...workData, order_raw_images: file });
    };
    
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('new_amount', workData.new_amount);
        formData.append('order_raw_images', workData.order_raw_images);

        try {
            const response = await api.put(
            `/freelancers/freelancer-complete-work/${orderId}/`,
            formData,
            {
                headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${authToken}`,
                },
            }
            );

            if (response.status === 200) {
                toast.success('Work Completed successfully');
                closeModal();
            } else {
                toast.error('Error Completing Work');
            }
        } catch (error) {
            console.error('Work Complete error:', error);
        }
    };    

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Pre-Submit Work Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
    >
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 focus:outline-none hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Pre-Submit Work</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-600 font-medium">
              Amount:
            </label>
            <input
            type="number"
            name="new_amount"
            value={workData.new_amount}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
                <label className="block text-sm text-gray-700">Raw image of Work:</label>
                <input
                type="file"
                name="order_raw_images"
                onChange={handleFileChange}
                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
            </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default FreelancerWorkCompleteModal