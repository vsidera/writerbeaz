// PostJobPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import JobForm from './JobForm';
import UserSidebar from './UserSidebar';

const PostJobPage = () => {
  const { state } = useLocation();
  const jobDetails = state ? state.jobDetails : null;
  const edit = jobDetails ? true : false;
  return (
    <div>
      <UserSidebar />
      <div class="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] pl-8">
        <h2 className="text-2xl font-bold mb-4">{edit ? 'Edit Job' : 'Post a Job'}</h2>
        <JobForm jobDetails={jobDetails} edit={edit} />
      </div>
    </div>
  );
};

export default PostJobPage;
