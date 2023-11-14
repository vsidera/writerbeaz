import React from 'react'
import { useNavigate } from 'react-router-dom';

function NotFound404() {
    const navigate = useNavigate();

    const redirectToHomepage = () => {
        navigate('/');
      };

  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div className="absolute">
                <div className="absolute">
                    <div className="">
                        <p className="sm:-my-40 text-gray-800 font-semibold">
                            Page cannot be found
                        </p>
                        <h1 className="sm:my-20 text-gray-800 font-bold text-2xl">
                            
                        </h1>
                        <button 
                        className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 font-bold text-center bg-red-500 text-white hover:bg-blue-red focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        onClick={redirectToHomepage}>
                            Go Home! 
                        </button>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default NotFound404