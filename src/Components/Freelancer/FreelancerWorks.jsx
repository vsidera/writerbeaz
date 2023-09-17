import React, { useEffect, useState } from 'react';
import FreelancerSidebar from '../Layout/FreelancerSidebar';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FreelancerWorkCompleteModal from './FreelancerWorkCompleteModal';
import FreelancerDealCloseModal from './FreelancerDealCloseModal';

function FreelancerWorks() {
  const [ordersData, setOrdersData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrderId, setModalOrderId] = useState('');
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [dealModalOrderId, setDealModalOrderId] = useState('');

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
      .get('/freelancers/freelancer-orderslist/')
      .then((response) => {
        setOrdersData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  // Define order statuses
  const orderStatuses = [
    { id: 1, label: 'Pending' },
    { id: 2, label: 'Accepted' },
    { id: 3, label: 'Work Started' },
    { id: 4, label: 'Completed' },
    { id: 5, label: 'Payment Pending' },
    { id: 6, label: 'Deal Closed' },
  ];
  
  // Filter orders with status "Work Started", "Completed", and "Payment Pending"
  const ongoingWork = ordersData?.find((order) =>
    ["Work Started", "Completed", "Payment Pending"].includes(order.status)
  );

  const upcomingWorks = (ordersData || []).filter(
    (order) => order.status === 'Work Started' && order.id !== (ongoingWork?.id || -1)
  );

  return (
    <div>
      <FreelancerSidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="px-6 pt-6 2xl:container">
          <div className="max-w-6xl mx-auto mt-16 space-y-12">
          {ongoingWork && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Ongoing Work</h2>
              <div className="bg-gray-200 rounded-lg shadow-xl mt-4 p-6" key={ongoingWork.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <div className="rounded-lg overflow-hidden h-auto">
                      <img
                        src={process.env.REACT_APP_API_BASE_URL + ongoingWork.gig.image1}
                        alt="order-image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0 md:flex-grow">
                    <h1 className="text-2xl font-semibold text-gray-800">{ongoingWork.gig.title}</h1>
                    <p className="text-gray-600 font-semibold text-sm">Delivery Time: {ongoingWork.gig.delivery_time}</p>
                    <h2 className="text-lg font-semibold mt-5 text-gray-800">Order Status:</h2>
                    <div className="flex flex-col">
                      {orderStatuses.map((status) => (
                        <div key={status.id} className="flex items-start mb-2">
                          <div
                            className={`rounded-full w-8 h-8 flex items-center justify-center ${
                              status.id <= orderStatuses.find((s) => s.label === ongoingWork.status)?.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-400 text-white'
                            }`}
                          >
                            <span className="text-sm">{status.id}</span>
                          </div>
                          {status.id !== orderStatuses[orderStatuses.length - 1].id && (
                            <div
                              className={`border-2 border-gray-300 h-8 mx-2 ${
                                status.id <= orderStatuses.find((s) => s.label === ongoingWork.status)?.id
                                  ? 'border-blue-500'
                                  : 'border-gray-400'
                              }`}
                            ></div>
                          )}
                          <div className={`ml-2 ${status.id <= orderStatuses.find((s) => s.label === ongoingWork.status)?.id
                                  ? 'text-blue-500'
                                  : 'text-gray-400'}`}>{status.label}</div>
                        </div>
                      ))}
                      <div className="mt-5">
                        {ongoingWork.status === 'Work Started' ? (
                          <button
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                          onClick={() => openModal(ongoingWork.id)}
                          >
                            Work Completed
                          </button>                        
                        ) : null}
                      </div>
                      <div className="mt-5">
                        {ongoingWork.status === 'Payment Pending' ? (
                          <button
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                          onClick={() => openDealModal(ongoingWork.id)}
                          >
                            Close Work
                          </button>                        
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0 md:flex-grow">
                    <h2 className="text-lg font-semibold mt-5 text-gray-800">Requirements:</h2>
                    <p className="text-gray-600 font-semibold sm:text-md">{ongoingWork.requirement}</p>
                    <h2 className="text-lg font-semibold mt-5 text-gray-800">Client Details:</h2>
                    <p className="text-gray-600 font-semibold sm:text-md">Username: {ongoingWork.user.username}</p>
                    <p className="text-gray-600 font-semibold sm:text-md">Full name: {ongoingWork.user.first_name} {ongoingWork.user.last_name}</p>
                    <p className="text-gray-600 font-semibold sm:text-md">Email: {ongoingWork.user.email}</p>
                    <p className="text-gray-600 font-semibold sm:text-md">Phone: {ongoingWork.user.phone_number}</p>
                    <h2 className="text-lg font-semibold mt-5 text-gray-800">Current Amount:</h2>
                    <p className="text-gray-600 font-semibold sm:text-md">Starting Price: ₹{ongoingWork.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">Upcoming Works</h2>
              {upcomingWorks.length > 0 ? (
                upcomingWorks.map((order) => (
                  <div className="flex-1 bg-gray-200 rounded-lg shadow-xl mt-4 p-6" key={order.id}>
                    <div className="relative px-4 mt-4">
                      <div className="mb-6">
                        <div className="flex items-center sm:flex-nowrap flex-wrap">
                          <div className="rounded-lg overflow-hidden w-56 h-28">
                            <img
                              src={process.env.REACT_APP_API_BASE_URL + order.gig.image1}
                              alt="order-image"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="sm:ml-4 flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="mt-5 sm:mt-0">
                                <span className="text-gray-600 font-bold sm:text-xl">{order.gig.title}</span>
                                <p className="text-gray-600 font-semibold text-sm">Delivery Time: {order.gig.delivery_time}</p>
                                <p className="text-gray-600 font-semibold sm:text-md">Client: {order.user.username}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No upcoming works found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <FreelancerWorkCompleteModal isOpen={isModalOpen} closeModal={closeModal} orderId={modalOrderId}/>
      <FreelancerDealCloseModal isOpen={isDealModalOpen} closeModal={closeDealModal} orderId={dealModalOrderId}/>
    </div>
  );
}

export default FreelancerWorks;
