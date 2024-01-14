import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TutorSidebar from '../Layout/TutorSidebar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';

// Separate ProposalForm component
const ProposalForm = ({ onSubmit, isSubmitting, priceError, proposal, setProposal }) => (
  <form
    onSubmit={onSubmit}
    className="absolute mt-6 bg-[#f6f6f6] p-4 border border-gray-300 rounded-md"
    style={{ top: '-550%', left: '16%', transform: 'translateX(-50%)', boxShadow: '0 0 10px ' }}
  >
    {Object.entries(proposal).map(([key, value]) => (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </label>
        <input
          type={key === 'description' ? 'textarea' : 'text'}
          value={value}
          onChange={(e) => setProposal({ ...proposal, [key]: e.target.value })}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
    ))}

    <div className="text-red-500 mb-2">{priceError}</div>

    <button
      type="submit"
      className={`${
        isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'
      } text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
    </button>
  </form>
);

const JobDetails = () => {
  const { jobId } = useParams();
  const { state } = useLocation();
  const [jobDetails, setJobDetails] = useState(state?.jobDetails);
  const navigate = useNavigate();

  useEffect(() => {
    // If the job details are not passed in the location state, fetch them
    if (!jobDetails) {
      const fetchJobDetails = async () => {
        try {
          const response = await api.get(`/users/job-order/${jobId}/`)
          setJobDetails(response.data);
        } catch (error) {
          console.error('Error fetching job details:', error);
        }
      };

      fetchJobDetails();
    }
  }, [jobId, jobDetails]);

  const [proposal, setProposal] = useState({
    skills: '',
    price: '',
    proposal: '',
  });

  const [isProposalSubmitted, setProposalSubmitted] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [priceError, setPriceError] = useState('');
  const user = useSelector(state => state.user);

  const isValidPrice = (value) => /^[1-9]\d*$/.test(value);

  const handleProposalSubmission = async (event) => {
    event.preventDefault();

    // Validate the price input to allow only positive integers starting from 1
    if (!isValidPrice(proposal.price)) {
      setPriceError('Price must be a positive number.');
      return;
    }

    // Clear any previous price error
    setPriceError('');

    try {
      // Assuming you have an API endpoint to handle proposal submission
      const response = await api.post('/tutor/proposal/', {
        job_id: jobDetails.id,
        username: user.username,
        ...proposal,
        isAccepted: false,
      });

      console.log('Proposal submitted:', response.data);

      // Set the flag to indicate that the proposal is submitted
      setProposalSubmitted(true);

      // Redirect to /tutor/bids on successful submission
      navigate('/tutor/bids');
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  const downloadFile = async (url) => {
    try {
      const response = await api.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const downloadUrl = URL.createObjectURL(blob);
      window.open(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  return (
    <div>
      <TutorSidebar />
      <div className={`ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] px-8 ${isProposalSubmitted ? 'opacity-70' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Job Details</h1>

        {jobDetails ? (
          <div className={`job-details ${isProposalSubmitted ? 'opacity-50' : ''}`}>
            {Object.entries(jobDetails).map(([key, value]) => (
              <p key={key} className="mb-2">
                <span className="font-bold">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</span>
                {key === 'files' ? (
                  // display a list of filenames color blue text, underlined, and clickable
                  <span>

                    {value == null ? "No files" : (
                      value.map((file) => (
                        <span key={file}>
                          <span
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => downloadFile(file)}
                          >
                            {file.split('/').pop()}
                          </span>
                          <br />
                        </span>
                      ))
                      )}
                  </span>
                ) : (
                  <span>{" "}

                 {value == null ? "null" : value.toString()}
                 </span>
                )}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No job details available.</p>
        )}

        <div className="relative">
          <button
            className={`${
              isProposalSubmitted || showProposalForm ? 'bg-[black] ' : 'bg-red-500'
            } text-white py-2 px-4 rounded-full mt-4 hover:bg-red-600 focus:outline-none relative`}
            onClick={() => setShowProposalForm(!showProposalForm)}
          >
            {isProposalSubmitted ? 'Bid Submitted' : showProposalForm ? 'X' : 'Submit Bid'}
          </button>

          {showProposalForm && (
            <ProposalForm
              onSubmit={handleProposalSubmission}
              isSubmitting={isProposalSubmitted}
              priceError={priceError}
              proposal={proposal}
              setProposal={setProposal}
            />
          )}
        </div>

        {isProposalSubmitted && (
          <p className="mt-4 text-green-600">
            Proposal submitted successfully! Redirecting to /tutor/bids...
          </p>
        )}
      </div>
    </div>
  )
};

export default JobDetails;
