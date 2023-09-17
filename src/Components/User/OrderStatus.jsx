import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelModal from './CancelModal';
import { loadStripe } from '@stripe/stripe-js';

function OrderStatus(props) {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [currentStatus, setCurrentStatus] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [workPrice, setWorkPrice] = useState(0);
  const [commission, setCommission] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCanelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const commissionPercentage = 3.5

  useEffect(() => {
    // Fetch orders data
    api
      .get(`/users/user-orderstatus/${id}/`)
      .then((response) => {
        setOrdersData(response.data);
        const newWorkPrice = response.data.new_amount;
        const newCommission = (newWorkPrice * commissionPercentage) / 100;
        const newTotalPrice = newWorkPrice + newCommission;
        setWorkPrice(newWorkPrice);
        setCommission(newCommission);
        setTotalPrice(newTotalPrice);

        // Set the current status dynamically
        const orderStatus = response.data.status;
        const foundStatus = orderStatuses.find((status) => status.label === orderStatus);
        if (foundStatus) {
          setCurrentStatus(foundStatus);
        }
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
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

  const handleAcceptOrder = async () => {
    try {
      const response = await api.post('/users/checkout/', {
        order_id: ordersData.id,
      });
  
      const stripePublicKey = response.data.stripe_public_key;
  
      const stripe = await loadStripe(stripePublicKey);
  
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.session_id,
      });
  
      if (error) {
        console.error('Error redirecting to Stripe:', error);
        toast.error('Payment is not Completed');
      }
    } catch (error) {
      console.error('Error creating Stripe Checkout Session:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-36">
            {ordersData && (
            <>
                {currentStatus.label === 'Payment Pending' && (
                <div class="bg-white md:mx-auto mb-10">
                    <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div class="text-center">
                        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                        <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    </div>
                </div>
                )}

                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <h1 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">Order Status Page</h1>
                        <div className="h-80 sm:h-96 rounded-lg bg-gray-100 mb-4 relative">
                            <img
                                src={`${baseUrl}${ordersData.gig.image1}`}
                                alt='Gig image'
                                className="h-80 sm:h-96 w-full object-cover rounded-lg bg-gray-100 mb-4"
                            />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4 md:mt-10">
                        <h2 className="mb leading-tight tracking-tight font-bold text-gray-500 text-xl md:text-2xl">
                        {ordersData.gig.title}
                        </h2>
                        {ordersData.freelancer && ordersData.freelancer.username ? (
                        <span className="flex items-center">
                            <p className="text-gray-500 font-semibold">
                            {ordersData.freelancer.first_name} {ordersData.freelancer.last_name}
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
                                        currentStatus.id >= status.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                                    >
                                    <span className="text-sm">{status.id}</span>
                                    </div>
                                    {index < orderStatuses.length - 1 && (
                                    <div
                                        className={`border-2 border-gray-300 h-8 mx-2 ${
                                        currentStatus.id >= status.id ? 'border-green-500' : 'border-gray-300'
                                        }`}
                                    ></div>
                                    )}
                                    <div className={`ml-2 ${currentStatus.id >= status.id ? 'text-green-500' : 'text-gray-400'}`}>
                                    {status.label}
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="font-semibold text-gray-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10">
                    <h3 className="text-2xl font-bold mt-4 mb-2">Requirements:</h3>
                    <p className="text-gray-500">{ordersData.requirement}</p>
                    {currentStatus.label != 'Payment Pending' && (
                    <>
                    <p className="text-gray-500 mt-4">Expected Delivery in : {ordersData.gig.delivery_time}</p>
                    <div className="flex flex-wrap items-center sm:space-x-4 sm:space-y-0 my-4 mt-4">
                        <div>
                            <p className="text-gray-400 text-sm sm:text-base">Starting Price:</p>
                            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span className="text-blue-400 mr-1 mt-1">₹</span>
                                <span className="font-bold text-blue-500 text-3xl">
                                    {ordersData.amount}
                                </span>
                            </div>
                        </div>
                        <div className='ml-10 sm:ml-0'>
                            <p className="text-gray-400 text-sm sm:text-base">Your Work Price:</p>
                            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span className="text-blue-400 mr-1 mt-1">₹</span>
                                <span className="font-bold text-blue-500 text-3xl">
                                    {workPrice || "------"}
                                </span>
                            </div>
                        </div>
                        <div className='mt-8 sm:mt-0'>
                            <p className="text-gray-400 text-sm sm:text-base">Tax/Commission:</p>
                            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span className="text-blue-400 mr-1 mt-1">₹</span>
                                <span className="font-bold text-blue-500 text-3xl">
                                {commission || "------"}
                                </span>
                            </div>
                        </div>
                        <div className='ml-10 sm:ml-0 mt-8 sm:mt-0'>
                            <p className="text-blue-500 text-sm sm:text-base">Total Price:</p>
                            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span className="text-blue-400 mr-1 mt-1">₹</span>
                                <span className="font-bold text-blue-500 text-3xl">
                                {totalPrice || "------"}
                                </span>
                            </div>
                        </div>
                    </div>
                    </>
                    )}
                    {currentStatus.label === 'Pending' && (
                        <div>
                        <p className="text-gray-500 mt-4">
                            * Changed your mind? Want to Cancel the Order? Do it before Freelancer Accept your work!
                        </p>
                        
                        <button
                            className="mt-5 mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-14"
                            onClick={openCanelModal}
                        >
                            Cancel Order
                        </button>
                        </div>
                    )}
                    {currentStatus.label === 'Completed' && (
                        <div>
                        <p className="text-gray-500 mt-20 mb-2">
                            *Freelancer Completed your Work! Check out the Pre-Submit. Accept and Pay the amount to receive the Actual File!
                        </p>
                        <img
                                src={`${baseUrl}${ordersData.order_raw_images}`}
                                alt='Gig image'
                                className="h-full w-full object-cover rounded-lg bg-gray-100 mb-4"
                            />
                        <button
                            className="mt-5 mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-14"
                            onClick={openCanelModal}
                        >
                            Decline Order
                        </button>
                        <button
                          className="mt-5 mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-14"
                          onClick={handleAcceptOrder}
                        >
                          Accept Order
                        </button>
                        </div>
                    )}
                </div>
            </>
            )}
        </div>
        <CancelModal isOpen={isCancelModalOpen} closeModal={closeCancelModal} orderData={ordersData}/>

        <Footer />
    </div>
  );
}

export default OrderStatus;