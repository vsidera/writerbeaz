import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderConfirmation(props) {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [gig, setGig] = useState({});
  const [requirements, setRequirements] = useState('');

  useEffect(() => {
    api.get(`/users/user-gigs/${id}/`)
      .then((response) => {
        setGig(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = () => {
    if (user) {
      const order = {
        requirement: requirements,
        amount: gig.starting_price,
        gig: parseInt(id),
        tutor: gig.tutor.id,
      };
  
      api.post('/users/user-orders/', order)
        .then((response) => {
          toast.success('Order placed successfully!');
          setRequirements('');
          navigate('/profile');
        })
        .catch((error) => {
          toast.error('Failed to place the order. Please try again.');
        });
    } else {
      navigate('/login');
    }
  };
  

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-36">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <h1 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">Order Confirmation</h1>
            <div className="h-80 sm:h-96 rounded-lg bg-gray-100 mb-4 relative">
              <img
                src={`${gig.image1}`}
                alt='Gig image'
                className="h-80 sm:h-96 w-full object-cover rounded-lg bg-gray-100 mb-4"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 md:mt-28">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-500 text-xl md:text-2xl">
              {gig.title}
            </h2>
            <Link to={`/tutor-view/${gig.tutor && gig.tutor.id}`} className="text-gray-500 text-sm hover:underline">
              {gig.tutor && gig.tutor.username ? (
                <span className="flex items-center">
                  {gig.tutor_profile_photo && (
                    <img
                      src={`${gig.tutor_profile_photo}`}
                      alt={`Profile Photo of ${gig.tutor.username}`}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  )}
                  <p className="text-gray-500 font-bold">
                    {gig.tutor.first_name} {gig.tutor.last_name}
                  </p>
                </span>
              ) : (
                'Unknown Tutor'
              )}
            </Link>
            <div className="font-semibold text-gray-400 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <h3 className="mb-1">{gig.description}</h3>
              <div className="flex items-center space-x-4 my-4 sm:w-1/2">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-blue-400 mr-1 mt-1">₹</span>
                    <span className="font-bold text-blue-500 text-3xl">
                      {gig.starting_price}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex justify-between">
                  <div>
                    <p className="text-green-500 text-sm sm:text-xl font-semibold mt-3 sm:mt-0">Starting price</p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                    Inclusive of all Taxes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-10 border-t border-gray-300" />
        <h1 className="mb-2 leading-tight tracking-tight font-bold text-gray-500 text-xl md:text-2xl">What is your Requirements?</h1>
        <div className="max-w-7xl mx-auto mt-4">
          <textarea
            className="w-full h-40 px-3 py-2 border rounded-md"
            placeholder="Enter your requirements here..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>

        <div className="max-w-7xl mx-auto mt-4 mb-10">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={!requirements} // Disable the button if requirements are empty
        >
          Submit Order
        </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrderConfirmation