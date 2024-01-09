import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import UserSidebar from './UserSidebar';
const ProposalDetails = () => {
  const { id } = useParams();

  const [proposalDetails, setProposalDetails] = useState(null);
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const response = await axios.get(`https://backend-writerbeaz-production-bc082bae8f0e.herokuapp.com/tutor/proposal/${id}/`);
        setProposalDetails(response.data);
        setPrice(response.data.proposal.price)
      } catch (error) {
        console.error('Error fetching proposal details:', error);
      }
    };

    if (id) {
      fetchProposalDetails();
    }
  }, [id]);

  const handleAccept = async () => {
    try {
      await axios.put(`https://backend-writerbeaz-production-bc082bae8f0e.herokuapp.com/tutor/proposal/${id}/`, {
        price: price,
        isAccepted: true
      });
      setProposalDetails({
        ...proposalDetails,
        proposal: {
          ...proposalDetails.proposal,
          price: price,
          isAccepted: true
        }
      });
      alert('Proposal accepted!');
    } catch (error) {
      console.error('Error accepting proposal:', error);
    }
  }

  return (
    <div>
      <UserSidebar />
      {proposalDetails ? (
      <div class="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h2 className="text-2xl font-bold mb-4">View proposal</h2>
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <form style={{ boxShadow: '0 0 2px' }} className="max-w-md w-full p-6 bg-[#f6f6f6] rounded-sm ">
            <>
              <div className="mb-4 border-2 p-4 rounded">
                <label htmlFor="orderTitle" className="block text-gray-700 text-md font-bold mb-2">Proposal</label>
                <p>{proposalDetails.proposal.proposal}</p>
                <div className='flex justify-end'>
                  {new Date(proposalDetails.proposal.proposalDate).toDateString()}
                </div>
              </div>

              <div className="mb-4 border-2 p-4 rounded">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tutor</label>
                <div className="flex items-center">
                <p>{proposalDetails.proposal.username}</p>
                <Link className='text-blue-500 underline' to={`/user/tutor-view/${proposalDetails.user_id}/`}>
                    View Tutor
                </Link>
                </div>
              </div>

              <div className="mb-4 border-2 p-4 rounded">
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                {proposalDetails.proposal.isAccepted == false ? (
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border "
                    required
                  />
                ) : (
                  <p>{proposalDetails.proposal.price}</p>
                )}
              </div>

              <div className="mb-4 border-2 p-4 rounded">
                <label htmlFor="orderTitle" className="block text-gray-700 text-md font-bold mb-2">Status</label>
                {proposalDetails.proposal.isAccepted == false ? (
                  <span className='bg-blue-500 text-white px-2 py-1 rounded'>Pending</span>
                ) : (
                  <span className='bg-green-500 text-white px-2 py-1 rounded'>Accepted</span>
                )}
              </div>
            </>

            <div className="mb-4 border-2 p-4 rounded flex justify-center">
              {proposalDetails.proposal.isAccepted == false ? (
                <button
                type="button"
                className="bg-[goldenrod] text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-green"
                onClick={handleAccept}
                >
                  Update & Accept
                </button>
              ) : (
                <button
                type="button"
                >
                  Accepted
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProposalDetails;

