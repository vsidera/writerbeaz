import React, { useState, useEffect } from 'react';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../../../api/axiosConfig';

function UserInbox() {
  const [proposals, setProposals] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Fetch all proposals associated with jobs posted by the user
        const jobProposalsResponse = await api.get(`/tutor/proposal/?userId=${user.user_id}`);
        const fetchedProposals = jobProposalsResponse.data;

        // Mark fetched proposals as unread
        const proposalsWithReadFlag = fetchedProposals.map((proposal) => ({
          ...proposal,
          isRead: false,
        }));

        setProposals(proposalsWithReadFlag);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    // Fetch proposals on component mount
    if (user.user_id) {
      fetchProposals();
    }
  }, [user.user_id]);
  console.log(user)

  const markProposalAsRead = (proposalId) => {
    // Mark the proposal as read in the local state
    setProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.id === proposalId ? { ...proposal, isRead: true } : proposal
      )
    );
  };

  const newProposalsCount = proposals.filter((proposal) => !proposal.isRead).length;

  return (
    <div>
      <UserSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h1 className="text-3xl font-bold mb-4">User Inbox</h1>
        {newProposalsCount > 0 ? (
          <p>{newProposalsCount} new proposals available</p>
        ) : (
          <p>No new proposals in your inbox.</p>
        )}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-r">Job Title</th>
              <th className="py-2 px-4 border-r">Proposal Date</th>
              <th className="py-2 px-4 border-r">Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal, index) => (
              <tr key={index} className={`border-b border-gray-300 ${proposal.isRead ? 'read' : ''}`}>
                <td className="py-2 px-4 border-r">{proposal.jobTitle}</td>
                <td className="py-2 px-4 border-r">{proposal.proposalDate}</td>
                <td className="py-2 px-4 border-r">
                  {proposal.isRead ? 'Read' : 'Unread'}
                  {!proposal.isRead && (
                    <button onClick={() => markProposalAsRead(proposal.id)}>Mark as Read</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserInbox;
