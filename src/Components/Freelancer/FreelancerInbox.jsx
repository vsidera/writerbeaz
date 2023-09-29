import React, { useEffect, useState } from 'react';
import FreelancerSidebar from '../Layout/FreelancerSidebar'
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FreelancerInbox() {
  const [ordersData, setOrdersData] = useState(null);

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

  const hasMatchingOrders = Array.isArray(ordersData) && ordersData.some(order => ["Accepted", "Canceled", "Pending"].includes(order.status));

  const handleDeleteOrder = (orderId) => {
    api
      .delete(`/users/user-orderdelete/${orderId}/`)
      .then((response) => {
        setOrdersData(prevOrdersData => prevOrdersData.filter(order => order.id !== orderId));
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  };

  const handleAcceptOrder = (orderId) => {
    api
      .put(`/freelancers/freelancer-acceptorder/${orderId}/`)
      .then(() => {
        setOrdersData((prevOrdersData) =>
          prevOrdersData.map((order) =>
            order.id === orderId ? { ...order, status: 'Accepted' } : order
          )
        );
      })
      .catch((error) => {
        console.error('Error accepting order:', error);
      });
  };

  const handleStartWork = (orderId) => {
    api
      .put(`/freelancers/freelancer-startwork/${orderId}/`)
      .then(() => {
        setOrdersData((prevOrdersData) =>
          prevOrdersData.map((order) =>
            order.id === orderId ? { ...order, status: 'Work Started' } : order
          )
        );
        toast.success('New Work Started successfully!');
      })
      .catch((error) => {
        console.error('Error accepting order:', error);
      });
  };

  return (
    <div>
      <FreelancerSidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="px-6 pt-6 2xl:container">
          <div className="max-w-6xl mx-auto mt-16 space-y-12">
            {hasMatchingOrders ? (
              // Render matching orders
              ordersData.map((order) => (
                (order.status === "Pending" || order.status === "Accepted" || order.status === "Canceled") && (
                  <div className="flex-1 bg-gray-200 rounded-lg shadow-xl mt-4 p-6" key={order.id}>
                    <div className="relative px-4 mt-4">
                      {order.status === "Pending" || order.status === "Accepted" ? (
                        // Render this part if status is "Pending" or "Accepted"
                        <>
                          <div className="mb-6">
                            <div className="flex items-center sm:flex-nowrap flex-wrap">
                              <div className="rounded-lg overflow-hidden w-56 h-auto">
                                <img
                                  src={order.gig.image1}
                                  alt='order-image'
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="sm:ml-4 flex-grow">
                                <div className="flex items-center justify-between">
                                  <div className='mt-5 sm:mt-0'>
                                    <span className="text-gray-600 font-bold sm:text-xl">{order.gig.title}</span>
                                    <p className="text-gray-600 font-semibold text-sm">Delivery Time: {order.gig.delivery_time}</p>

                                    <h1 className="text-gray-600 font-bold sm:text-lg mt-5">Client Details: </h1>
                                    <p className="text-gray-600 font-semibold sm:text-md">Username: {order.user.username}</p>
                                    <p className="text-gray-600 font-semibold sm:text-md">Full name: {order.user.first_name} {order.user.last_name}</p>
                                    <p className="text-gray-600 font-semibold sm:text-md">Email: {order.user.email}</p>
                                    <p className="text-gray-600 font-semibold sm:text-md">Phone: {order.user.phone_number}</p>

                                    <h1 className="text-gray-600 font-bold sm:text-lg mt-5">Requirements: </h1>
                                    <p className="text-gray-600 font-semibold sm:text-md">{order.requirement}</p>
                                    <div>
                                      {order.status === 'Pending' ? (
                                        <>
                                          <button
                                            className='mt-5 mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded'
                                            onClick={() => handleDeleteOrder(order.id)}
                                          >
                                            Decline
                                          </button>
                                          <button
                                            className='mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
                                            onClick={() => handleAcceptOrder(order.id)}
                                          >
                                            Accept
                                          </button>
                                        </>
                                      ) : order.status === 'Accepted' ? (
                                        <button
                                          className="mt-5 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                          onClick={() => handleStartWork(order.id)}
                                        >
                                          Start Work
                                        </button>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : order.status === "Canceled" ? (
                        // Render this part if status is "Canceled"
                        <>
                          <div className="mb-6">
                            <div className="rounded-lg overflow-hidden w-56 h-auto">
                              <h1 className='text-red-600 font-bold sm:text-xl mb-2'>This Order Canceled</h1>
                              <img
                                src={order.gig.image1}
                                alt='order-image'
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mb-6">
                              <span className="text-gray-600 font-bold sm:text-xl">{order.gig.title}</span>
                              <p className="text-gray-600 font-semibold sm:text-md">{order.reason}</p>
                              <p className="text-gray-600 font-semibold sm:text-md">By: {order.user.username}</p>
                              <div>
                                <button
                                  className='mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
                                  onClick={() => handleDeleteOrder(order.id)}
                                >
                                  Ok
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )
              ))
            ) : (
              // Render the image if no matching orders
              <div className="mb-6">
                <img src="/images/2953962.jpg" alt="Image" className="lg:ml-80 w-full h-full max-w-lg" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerInbox;
