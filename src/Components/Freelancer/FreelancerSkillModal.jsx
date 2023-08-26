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
      maxHeight: '30%',
      padding: '20px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  

function FreelancerSkillModal({ isOpen, closeModal }) {
  const authToken = useSelector((state) => state.accessToken);
  const userId = useSelector((state) => state.user.user_id);

  const [skill, setSkill] = useState({
    skill: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkill({ ...skill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post(
        '/freelancers/freelancer-addskill/',
        {
          skill: skill.skill,
          freelancer: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      if (response.status === 201) {
        toast.success('Skill added successfully');
        closeModal();
      } else {
        toast.error('Failed to add skill');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Skill Already Exist or Server Error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Skill Modal"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Add a New Skill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="skill" className="block text-gray-600 font-medium">
              Skill:
            </label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={skill.skill}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default FreelancerSkillModal;
