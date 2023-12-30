import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UserBids() {
  const [jobProposals, setJobProposals] = useState([]);
  const [newProposals, setNewProposals] = useState(0); // Track new proposals
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchJobProposals = async () => {
      try {
        // Fetch all proposals associated with jobs posted by the user
        const jobProposalsResponse = await axios.get(`https://backend-writerbeaz-production-bc082bae8f0e.herokuapp.com/tutor/proposal?userId=${user.user_id}`);
        const proposals = jobProposalsResponse.data;

        // Check for new proposals
        const newProposalsCount = proposals.length - jobProposals.length;
        if (newProposalsCount > 0) {
          // Update the count of new proposals
          setNewProposals(newProposalsCount);
        }

        setJobProposals(proposals);
      } catch (error) {
        console.error('Error fetching job proposals:', error);
      }
    };

    // Fetch job proposals on component mount
    if (user.user_id) {
      fetchJobProposals();

      // Poll for new proposals every 60 seconds (adjust as needed)
      const pollInterval = setInterval(fetchJobProposals, 60000);

      // Cleanup interval on component unmount
      return () => clearInterval(pollInterval);
    }
  }, [user.user_id, jobProposals.length]);

  return (
    <div>
      <UserSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h1 className="text-3xl font-bold mb-4">Proposals for Your Jobs</h1>
        {jobProposals.length > 0 ? (
          <div>
            {newProposals > 0 && (
              <p className="text-green-500">
                {newProposals} new {newProposals === 1 ? 'proposal' : 'proposals'} received!
              </p>
            )}
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-r">Job Title</th>
                  <th className="py-2 px-4 border-r">Proposal Date</th>
                  <th className="py-2 px-4 border-r">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobProposals.map((proposal, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-2 px-4 border-r">{proposal.jobTitle}</td>
                    <td className="py-2 px-4 border-r">{proposal.proposalDate}</td>
                    <td className="py-2 px-4 border-r">
                      <Link to={`/proposal-details/${proposal.id}`} className="text-blue-500">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No proposals for your jobs yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserBids;