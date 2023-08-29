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
    maxWidth: '50%',
    width: 'auto',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

function AdminAddCategoryModal({ isOpen, closeModal, updateCategoryData }) {
  const authToken = useSelector((state) => state.accessToken);
  const userId = useSelector((state) => state.user.user_id);

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategoryData({ ...categoryData, image: file });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('description', categoryData.description);
    formData.append('image', categoryData.image);

    try {
      const response = await api.post(`/admin/add-category/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const newCategory = response.data; // Assuming the server returns the new category

        // Update the categoryData state to include the new category
        updateCategoryData((prevData) => [...prevData, newCategory]);

        toast.success('Category Added Successfully');
        closeModal();
      } else {
        toast.error('Error Adding Category');
      }
    } catch (error) {
      console.error('Category Adding error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Category Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
      className="fixed inset-0 flex items-center justify-center z-50"
      style={customStyles}
    >
      <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-medium text-gray-800">Add New Category</h1>

          <button onClick={closeModal} className="text-gray-600 focus:outline-none hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">Add new Category for creating gigs.</p>

        <form className="mt-5">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Category Name:</label>
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Description:</label>
            <textarea
              name="description"
              value={categoryData.description}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Category Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          {/* Save Button */}
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mx-5"
            >
              Create Category
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="px-4 py-2 mt-0.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AdminAddCategoryModal;
