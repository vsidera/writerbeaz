import React, { useEffect, useState } from 'react';
import TutorSidebar from '../Layout/TutorSidebar';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TutorWorkCompleteModal from './TutorWorkCompleteModal';
import TutorDealCloseModal from './TutorDealCloseModal';
import { Link } from 'react-router-dom';

function TutorWorks() {
  const [ordersData, setOrdersData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrderId, setModalOrderId] = useState('');
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [dealModalOrderId, setDealModalOrderId] = useState('');
  const [upcomingWorks, setUpcomingWorks] = useState([]);
  const [completedWorks, setCompletedWorks] = useState([]);

  const openModal = (orderId) => {
    setIsModalOpen(true);
    setModalOrderId(orderId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDealModal = (orderId) => {
    setIsDealModalOpen(true);
    setDealModalOrderId(orderId);
  };

  const closeDealModal = () => {
    setIsDealModalOpen(false);
  };

  useEffect(() => {
    // Fetch orders data
    api
      .get('/tutor/tutor-works/')
      .then((response) => {
        setOrdersData(response.data);
        //order.status == progress or completed
        const upcoming = response.data.filter(order => order.status.toLowerCase() === 'progress');
        const completed = response.data.filter(order => order.status.toLowerCase() === 'completed');
        setUpcomingWorks(upcoming);
        setCompletedWorks(completed);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, []);


  return (
    <div>
      <TutorSidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="px-6 pt-6 2xl:container">
          <div className="max-w-6xl mx-auto mt-16 space-y-12">
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-2">Upcoming Works</h2>
              {upcomingWorks.length > 0 ? (
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
              {upcomingWorks.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{job.orderTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/tutor/job-details/${job.id}`}
                      state={{ jobDetails: job, from: "works" }} // This should pass jobDetails to JobDetails
                      className="text-blue-500 hover:underline mr-2"
                    >
                      View More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              ) : (
                <p>No upcoming works found.</p>
              )}
            </div>

            <div className="pt-16 mb-10 border-t-2">
              <h2 className="text-2xl font-semibold mb-2">Completed Works</h2>
              {completedWorks.length > 0 ? (
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
              {completedWorks.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{job.orderTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/tutor/job-details/${job.id}`}
                      state={{ jobDetails: job, from: 'works' }} // This should pass jobDetails to JobDetails
                      className="text-blue-500 hover:underline mr-2"
                    >
                      View More and Apply
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

              ) : (
                <p>No Completed works found yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorWorks;
