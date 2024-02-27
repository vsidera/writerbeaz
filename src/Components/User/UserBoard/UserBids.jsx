import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../../../api/axiosConfig';

function UserBids() {
  const [jobProposals, setJobProposals] = useState([]);
  const [newProposals, setNewProposals] = useState(0); // Track new proposals
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchJobProposals = async () => {
      try {
        const jobProposalsResponse = await api.get(`/tutor/user_proposals/`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        // Sort the job proposals by order number with the latest on top
        const sortedProposals = jobProposalsResponse.data.sort((a, b) => b.order_number - a.order_number);
        setJobProposals(sortedProposals);
  
        // Check for new proposals
        const newProposalsCount = sortedProposals.length - jobProposals.length;
        if (newProposalsCount > 0) {
          setNewProposals(newProposalsCount);
        }
      } catch (error) {
        console.error('Error fetching job proposals:', error);
      }
    };
  
    if (user.user_id) {
      fetchJobProposals();
  
      // Poll for new proposals every 60 seconds (adjust as needed)
      const pollInterval = setInterval(fetchJobProposals, 60000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(pollInterval);
    }
  }, [user.user_id, jobProposals.length]);

  return (
    <div className='md:flex'>
      <UserSidebar />
      <div class="ml-0 lg:ml-80 mb-6 lg:w-[50%] xl:w-[50%] 2xl:w-[50%] p-4">
        <h1 className="text-3xl font-bold mb-4">Proposals for Your Jobs</h1>
        {jobProposals.length > 0 ? (
          <div>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                <th className="py-2 px-4 border-r">Order number</th>
                  <th className="py-2 px-4 border-r">Title</th>
                  <th className="py-2 px-4 border-r">Tutor</th>
                  <th className="py-2 px-4 border-r">Proposal</th>
                  <th className="py-2 px-4 border-r">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobProposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td className="py-2 px-4 border-r text-center"><b>{proposal.order_number}</b></td>
                    <td className="py-2 px-4 border-r">{proposal.orderTitle}</td>
                    <td className="py-2 px-4 border-r">{proposal.tutor}</td>
                    <td className="py-2 px-4 border-r">{proposal.proposal}</td>
                    <td className="py-2 px-4 border-r">
                      <Link
                        to={`/user/proposal-details/${proposal.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Proposal
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
