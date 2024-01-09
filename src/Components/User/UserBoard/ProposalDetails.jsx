import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserSidebar from './UserSidebar';
const ProposalDetails = () => {
  const { id } = useParams();

  const [proposalDetails, setProposalDetails] = useState(null);

  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const response = await axios.get(`https://backend-writerbeaz-production-bc082bae8f0e.herokuapp.com/tutor/proposal/${id}/`);
        setProposalDetails(response.data);
      } catch (error) {
        console.error('Error fetching proposal details:', error);
      }
    };

    if (id) {
      fetchProposalDetails();
    }
  }, [id]);

  return (
    // <div>
    //   <UserSidebar />
    //   <div>
    //   <h1 className="text-3xl font-bold mb-4">Proposal Details</h1>

    //   </div>
    // </div>
    <div>
        <UserSidebar />
    <div class="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <h1 className="text-2xl font-bold mb-4 mx-8">Proposal details</h1>
      <div className="flex justify-between items-center mb-4 mx-8">
      {proposalDetails ? (
        <div>
          <p>Job Title: {proposalDetails.proposal}</p>
          <p>Proposal Date: {proposalDetails.proposalDate}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading proposal details...</p>
      )}
      </div>
    </div>
    </div>
  );
};

export default ProposalDetails;
