import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Layout/Footer';

function SingleView(props) {
  const { id } = useParams();

  const [gig, setGig] = useState({});
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    api.get(`/users/user-gigs/${id}/`)
      .then((response) => {
        setGig(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleNextImage = () => {
    setCurrentImage((prevImage) => {
      if (prevImage < 3) {
        return prevImage + 1;
      } else {
        return prevImage;
      }
    });
  };

  const handlePrevImage = () => {
    setCurrentImage((prevImage) => {
      if (prevImage > 1) {
        return prevImage - 1;
      } else {
        return prevImage;
      }
    });
  };

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const requirementsList = gig.available_requirements
    ? gig.available_requirements.split('\n')
    : [];

  const tagsList = gig.tags ? gig.tags.split(',').map((tag) => tag.trim()) : [];

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-80 sm:h-96 rounded-lg bg-gray-100 mb-4 relative">
              <img
                src={`${baseUrl}${gig[`image${currentImage}`]}`}
                alt={`Image ${currentImage}`}
                className="h-80 sm:h-96 w-full object-cover rounded-lg bg-gray-100 mb-4"
              />
              <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                <button
                  className="bg-white text-black hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={handlePrevImage}
                >
                  &lt;
                </button>
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <button
                  className="bg-white text-black hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={handleNextImage}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {gig.title}
            </h2>
            <Link to={`/freelancer-view/${gig.freelancer && gig.freelancer.id}`} className="text-black text-sm hover:underline">
              {gig.freelancer && gig.freelancer.username ? (
                <span className="flex items-center">
                  {gig.freelancer_profile_photo && (
                    <img
                      src={`${baseUrl}${gig.freelancer_profile_photo}`}
                      alt={`Profile Photo of ${gig.freelancer.username}`}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  )}
                  <p className="text-black font-bold">
                    {gig.freelancer.first_name} {gig.freelancer.last_name}
                  </p>
                </span>
              ) : (
                'Unknown Freelancer'
              )}
            </Link>
            <div className="font-semibold text-gray-400 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {gig.category && gig.category.name ? (
                    <span className="flex items-center mb-1">
                    {gig.category.name && (
                        <h3>Category : {gig.category.name}</h3>
                    )}
                    </span>
                ) : (
                    'Unknown Category'
                )}
                
                <h3 className="mb-1">Delivery : minimum {gig.delivery_time}</h3>
                <h3 className="text-xl font-semibold mb-4">Available Requirements:</h3>
                <ul className="list-disc text-base font-normal pl-6 mb-10">
                    {requirementsList.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div>
                <Link to={`/orderconfirmation/${gig.id}`}
                type="button"
                className="md:h-10 px-6 py-2 mt-3 sm:mt-0 font-semibold sm:font-bold rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Place Order
                </Link>
            </div>
            </div>
        </div>

        <h3 className="text-2xl font-semibold mt-8 mb-2">About this Product</h3>
        <p className="text-gray-500">{gig.description}</p>
        <h3 className="text-2xl font-semibold mt-8 mb-2">Tags</h3>
        <div className="flex flex-wrap space-x-2">
            {tagsList.map((tag, index) => (
            <span key={index} className="bg-indigo-100 text-blue-500 px-2 py-1 rounded-full text-sm mb-2">
                {tag}
            </span>
            ))}
        </div>
        <h3 className="text-2xl font-semibold mt-8 mb-2">Product Reviews</h3>
        </div>
        <Footer />
    </div>
  );
}

export default SingleView;
