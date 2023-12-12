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
    maxWidth: '40%',
    width: 'auto',
    height: '50%',
    padding: '20px',
    top: '35%',
    left: '55%',
    transform: 'translate(-50%, -20%)',
  },
};

function TutorGigsModal({ isOpen, closeModal, addGigsToParent }) {
  const authToken = useSelector((state) => state.accessToken);
  const userId = useSelector((state) => state.user.user_id);

  const [gigs, setGigs] = useState({
    title: '',
    category: { id: '' },
    description: '',
    starting_price: '',
    delivery_time: '',
    available_requirements: '',
    tags: '',
    images: {
      image1: null,
      image2: null,
      image3: null,
    },
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/admin/categories/');
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'category') {
      setGigs({ ...gigs, category: { id: value } });
    } else {
      setGigs({ ...gigs, [name]: value });
    }
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setGigs({ ...gigs, images: { ...gigs.images, image1: file } });
  };
  
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setGigs({ ...gigs, images: { ...gigs.images, image2: file } });
  };
  
  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    setGigs({ ...gigs, images: { ...gigs.images, image3: file } });
  };

  const handleSubmit = async () => {
    // Add this line to log the form data before creating FormData
    console.log(gigs);
  
    const formData = new FormData();
    formData.append('title', gigs.title);
    formData.append('category', parseInt(gigs.category.id));
    formData.append('description', gigs.description);
    formData.append('starting_price', gigs.starting_price);
    formData.append('delivery_time', gigs.delivery_time);
    formData.append('available_requirements', gigs.available_requirements);
    formData.append('tags', gigs.tags);
    formData.append('tutor', userId);
    if (gigs.images.image1) {
      formData.append('images1', gigs.images.image1);
    }
    if (gigs.images.image2) {
      formData.append('images2', gigs.images.image2);
    }
    if (gigs.images.image3) {
      formData.append('images3', gigs.images.image3);
    }
  
    try {
      const response = await api.post(
        `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formData from './formData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      if (response.status === 201) {
        addGigsToParent(response.data);
        toast.success('Gig Created successfully');
        closeModal();
      } else {
        toast.error('Failed to Create Gig');
      }
    } catch (error) {
      console.error('Gig creation error:', error);
      toast.error('Failed to Create Gig');
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Create Gig Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
      className="fixed inset-0 flex items-center justify-center z-50"
      style={customStyles}
    >
      <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-medium text-gray-800">Create a Gig</h1>

          <button onClick={closeModal} className="text-gray-600 focus:outline-none hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">Provide details for your gig:</p>

        <form className="mt-5">
        <div className="mb-4 flex">
            <div className="w-1/2 mr-2">
              <label className="block text-sm text-gray-700 capitalize">Gig Title:</label>
              <input
                type="text"
                name="title"
                value={gigs.title}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>

            <div className="w-1/2 ml-2">
                <label className="block text-sm text-gray-700 capitalize">Category:</label>
                <select
                    name="category"
                    value={gigs.category.id}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                    <option value="">Select a Category</option>
                    {categories
                    .filter((category) => category.is_active)
                    .map((category) => (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    ))
                    }
                </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Description:</label>
            <textarea
              name="description"
              value={gigs.description}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4 flex">
            <div className="w-1/2 mr-2">
              <label className="block text-sm text-gray-700 capitalize">Starting Price:</label>
              <input
                type="text"
                name="starting_price"
                value={gigs.starting_price}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>

            <div className="w-1/2 ml-2">
              <label className="block text-sm text-gray-700 capitalize">Delivery Time:</label>
              <input
                type="text"
                name="delivery_time"
                value={gigs.delivery_time}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Available Requirements:</label>
            <textarea
              name="available_requirements"
              value={gigs.available_requirements}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Tags:</label>
            <input
              type="text"
              name="tags"
              value={gigs.tags}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Upload Image 1:</label>
            <input
              type="file"
              name="image1"
              onChange={handleFileChange1}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Upload Image 2:</label>
            <input
              type="file"
              name="image2"
              onChange={handleFileChange2}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize">Upload Image 3:</label>
            <input
              type="file"
              name="image3"
              onChange={handleFileChange3}
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handleSubmit}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mx-5"
            >
              Create Gig
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

export default TutorGigsModal;
