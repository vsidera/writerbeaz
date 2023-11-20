import React, { useState } from 'react';
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
    maxHeight: '100%',
    padding: '20px',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
  },
};

function TutorExperienceModal({ isOpen, closeModal, addExperienceToParent }) {
  const authToken = useSelector((state) => state.accessToken);
  const userId = useSelector((state) => state.user.user_id);

  const [experience, setExperience] = useState({
    title: '',
    company: '',
    year: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        '/tutors/tutor-addexperience/',
        {
          title: experience.title,
          company: experience.company,
          year: experience.year,
          description: experience.description,
          tutor: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        addExperienceToParent(response.data);
        toast.success('Experience added successfully');
        closeModal();
      } else {
        toast.error('Failed to add experience');
      }
    } catch (error) {
      console.error('Error adding experience:', error);
      toast.error('Failed to add experience');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Experience Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
    >
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 focus:outline-none hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Add a New Experience</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 font-medium">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={experience.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-600 font-medium">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={experience.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-600 font-medium">
              Year:
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={experience.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-medium">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={experience.description}
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
              Add Experience
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default TutorExperienceModal;
