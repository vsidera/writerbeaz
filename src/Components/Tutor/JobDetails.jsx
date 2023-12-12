// JobDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();

  // You can fetch job details based on jobId from an API or use the hardcoded data
  // ...

  // Example of displaying job details
  const jobDetails = {
    // Job details based on jobId
    // ...
  };

  return (
    <div>
      <h1>Job Details for Job ID {jobId}</h1>
      <div>
        <p>Order Title: {jobDetails.orderTitle}</p>
        <p>Subject: {jobDetails.subject}</p>
        {/* Add more job details as needed */}
      </div>
    </div>
  );
};

export default JobDetails;
