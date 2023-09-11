import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderStatus(props) {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [gig, setGig] = useState({});

  useEffect(() => {
    api.get(`/users/user-gigs/${id}/`)
      .then((response) => {
        setGig(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const orderStatuses = [
    { id: 1, label: 'Pending' },
    { id: 2, label: 'Accepted' },
    { id: 3, label: 'Work Started' },
    { id: 4, label: 'Completed' },
    { id: 5, label: 'Payment Pending' },
    { id: 6, label: 'Deal Closed' },
  ];

  const [currentStatus, setCurrentStatus] = useState(orderStatuses[0]);

  const updateOrderStatus = (statusId) => {
    const status = orderStatuses.find((status) => status.id === statusId);
    if (status) {
      setCurrentStatus(status);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-36">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <h1 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">Order Status Page</h1>
            <div className="h-80 sm:h-96 rounded-lg bg-gray-100 mb-4 relative">
              <img
                src={`${baseUrl}${gig.image1}`}
                alt='Gig image'
                className="h-80 sm:h-96 w-full object-cover rounded-lg bg-gray-100 mb-4"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 md:mt-10">
            <h2 className="mb leading-tight tracking-tight font-bold text-gray-500 text-xl md:text-2xl">
              {gig.title}
            </h2>
            {gig.freelancer && gig.freelancer.username ? (
            <span className="flex items-center">
                <p className="text-gray-500 font-semibold">
                {gig.freelancer.first_name} {gig.freelancer.last_name}
                </p>
            </span>
            ) : (
            'Unknown Freelancer'
            )}

            <div className="max-w-7xl mx-auto mt-6">
                <h1 className="mb-4 leading-tight tracking-tight font-bold text-gray-500 text-xl md:text-1xl">Order Status</h1>
                <div className="space-y-4">
                    {orderStatuses.map((status, index) => (
                    <div key={status.id} className="flex items-start">
                        <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center ${
                            currentStatus.id === status.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                        >
                        {currentStatus.id === status.id ? (
                            <span className="text-sm">{status.id}</span>
                        ) : (
                            <span className="text-sm">{status.id}</span>
                        )}
                        </div>
                        {index < orderStatuses.length - 1 && (
                        <div
                            className={`border-2 border-gray-300 h-8 mx-2 ${
                            currentStatus.id === status.id ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        ></div>
                        )}
                        <div className={`ml-2 ${currentStatus.id === status.id ? 'text-blue-500' : 'text-gray-400'}`}>
                        {status.label}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        <div className="font-semibold text-gray-400 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex items-center space-x-4 my-4">
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">Starting Price:</p>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-blue-400 mr-1 mt-1">₹</span>
                    <span className="font-bold text-blue-500 text-3xl">
                      {gig.starting_price}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">Your Work Price:</p>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-blue-400 mr-1 mt-1">₹</span>
                    <span className="font-bold text-blue-500 text-3xl">
                      {/* Calculate your work price here */}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">Admin Commission:</p>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-blue-400 mr-1 mt-1">₹</span>
                    <span className="font-bold text-blue-500 text-3xl">
                      {/* Calculate commission to admin here */}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">Total Price:</p>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-blue-400 mr-1 mt-1">₹</span>
                    <span className="font-bold text-blue-500 text-3xl">
                      {/* Calculate total price here */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>

      <Footer />
    </div>
  );
}

export default OrderStatus;