import React, { useState, useEffect } from 'react';
import TutorSidebar from '../Layout/TutorSidebar';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';

function Bids() {
  const [tutorBids, setTutorBids] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchTutorBids = async () => {
      try {
        // Fetch all proposals from the server
        const response = await api.get('tutor/proposal/');

        // Filter proposals for the tutor based on their username
        const bidsForTutor = response.data.filter(proposal => proposal.username === user.username);

        // Update state with the filtered bids
        setTutorBids(bidsForTutor);
      } catch (error) {
        console.error('Error fetching tutor bids:', error);
      }
    };

    fetchTutorBids();
  }, [user.username]);

  return (
    <div>
      <TutorSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h1 className="text-3xl font-bold mb-4">Your Bids</h1>
        {tutorBids.length > 0 ? (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(tutorBids[0]).map((key) => (
                  <th key={key} className="py-2 px-4 border-r">
                    {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tutorBids.map((bid, index) => (
                <tr key={index} className="border-b border-gray-300">
                  {Object.values(bid).map((value, index) => (
                    <td key={index} className="py-2 font-bold px-4 border-r">
                      {value.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bids submitted by you.</p>
        )}
      </div>
    </div>
  );
}

export default Bids;
