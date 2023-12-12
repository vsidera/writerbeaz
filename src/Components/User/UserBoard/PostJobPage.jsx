// PostJobPage.js
import React from 'react';
import JobForm from './JobForm';
import UserSidebar from './UserSidebar';

const PostJobPage = () => {
  return (
    <div>
        <UserSidebar />
    <div class="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <JobForm />
    </div>
    </div>
  );
};

export default PostJobPage;
