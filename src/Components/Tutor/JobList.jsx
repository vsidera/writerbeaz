// JobList.js
import React, { useState, useEffect } from 'react';
import TutorSidebar from '../Layout/TutorSidebar';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Loader from '../Loader.jsx';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from the API endpoint
    const fetchJobs = async () => {
      try {
        const response = await api.get('/users/job-order/');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs()
      .then(() => {
        setLoading(false);
      })
  }, []);

    if (loading) {
        return (
            <div>
                <TutorSidebar />
                <Loader />
            </div>
        );
    }

  return (
    <div>
      <TutorSidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>

        {jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap"><b>{job.order_number}</b></td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.orderTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/tutor/job-details/${job.id}`}
                      state={{ jobDetails: job }} // This should pass jobDetails to JobDetails
                      className="text-blue-500 hover:underline mr-2"
                    >
                      View More and Apply
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobList;
