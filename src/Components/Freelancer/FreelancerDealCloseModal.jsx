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
        maxWidth: '25%',
        width: 'auto',
        maxHeight: '40%',
        padding: '20px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
};

function FreelancerDealCloseModal({ isOpen, closeModal, orderId }) {
    const authToken = useSelector((state) => state.accessToken);

    const [workData, setWorkData] = useState({
        uploaded_file: null,
        uploading: false, // Add a loading state
        success: false,   // Add a success state
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setWorkData({ ...workData, uploaded_file: file });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('uploaded_file', workData.uploaded_file);

        setWorkData({ ...workData, uploading: true }); // Set loading state

        try {
            const response = await api.put(
                `/freelancers/freelancer-close-deal/${orderId}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 200) {
                // Set success state and show success message
                setWorkData({ ...workData, success: true });
                toast.success('Work Completed successfully');

                // Close the modal after a delay or do other actions
                setTimeout(() => {
                    closeModal();
                }, 2000);
            } else {
                toast.error('Error Completing Work');
            }
        } catch (error) {
            console.error('Work Complete error:', error);
            toast.error('Error completing work');
        } finally {
            setWorkData({ ...workData, uploading: false }); // Reset loading state
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
            {/* Content of the modal */}
            {workData.success ? ( // Show success message
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-16">Work Completed Successfully</h2>
                </div>
            ) : (
                // Show file upload form
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-16">Complete Deal</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Upload the work File:</label>
                            <input
                                type="file"
                                name="uploaded_file"
                                onChange={handleFileChange}
                                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                            />
                        </div>
                        <div className="flex justify-end">
                            {workData.uploading ? (
                                // Show loading state while uploading
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed"
                                    disabled
                                >
                                    Uploading...
                                </button>
                            ) : (
                                // Show the upload button
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </Modal>
    );
}

export default FreelancerDealCloseModal;
