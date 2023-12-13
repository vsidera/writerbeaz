import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProposalDetails = () => {
  const { proposalId } = useParams();
  const [proposalDetails, setProposalDetails] = useState(null);

  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const response = await axios.get(`/proposals/${proposalId}`);
        setProposalDetails(response.data);
      } catch (error) {
        console.error('Error fetching proposal details:', error);
      }
    };

    if (proposalId) {
      fetchProposalDetails();
    }
  }, [proposalId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Proposal Details</h1>
      {proposalDetails ? (
        <div>
          <p>Job Title: {proposalDetails.jobTitle}</p>
          <p>Proposal Date: {proposalDetails.proposalDate}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading proposal details...</p>
      )}
    </div>
  );
};

export default ProposalDetails;
