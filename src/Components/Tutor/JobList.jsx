// JobList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TutorSidebar from '../Layout/TutorSidebar';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const hardcodedData = [
      {
        id: 1,
        orderTitle: 'Hardcoded Job 1',
        subject: 'Computer Science',
        type: 'Essay',
        service: 'Writing',
        pages: 5,
        citation: 'APA',
        spacing: 'Double',
        educationLevel: 'Undergraduate',
        sources: 3,
        language: 'English',
        instructions: 'Write an essay on React development.',
        dueDate: '2023-12-31T23:59',
      },
      {
        id: 2,
        orderTitle: 'Hardcoded Job 2',
        subject: 'History',
        type: 'Research Paper',
        service: 'Editing',
        pages: 10,
        citation: 'MLA',
        spacing: 'Single',
        educationLevel: 'Graduate',
        sources: 5,
        language: 'English',
        instructions: 'Edit a research paper on World War II.',
        dueDate: '2023-12-25T18:00',
      },
      // Add more hardcoded data as needed
    ];

    setJobs(hardcodedData);
  }, []);

    // Fetch jobs from the API endpoint
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('https://localhost.com/jobs'); // Replace with your actual API endpoint
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//   }, []);


 const handleApplyButtonClick = (jobId) => {
    // Add logic for applying to a job
    console.log(`Applying to job with ID ${jobId}`);
  };

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
                  Order Title
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
                  <td className="px-6 py-4 whitespace-nowrap">{job.orderTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                   <Link to={`/job-details/${job.id}`} className="text-blue-500 hover:underline mr-2">
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
