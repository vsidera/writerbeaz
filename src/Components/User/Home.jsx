import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';
import './Home.css';

function Home() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await api.get('/users/user-categories/');

        setCategoryData(categories.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
  }, []);
  console.log(categoryData)

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-cyan-600 to-blue-700" style={{ height: "620px" }} >
        <div className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }} >
          <div className="h-full object-cover" style={{ backgroundImage: "url(/images/main1-removebg.png)" }} ></div>
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 px-4 md:px-6" style={{ height: "620px" }} >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white md:text-5xl drop-shadow-md">
              Find the Perfect Talent.
            </h2>
            <p className="mt-2 text-base text-white md:text-lg font-serif">
              Forget old rules, get the best people right here, right now!
            </p>
            <div className="mt-6 relative" style={{ width: "100%" }}>
              <input type="text" className="px-4 py-2 border rounded w-full" placeholder="Search for any Service" />
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-gray-200 font-semibold rounded hover:bg-blue-900"
                style={{ padding: "3px" }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/xfftupfv.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  style={{ width: "60px", height: "28px" }}
                ></lord-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-gray-300 to-gray-400 justify-center items-center">
        <div className="mb-4 mt-5 sm:mt-4">
          <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="" >
            <p className="text-2xl font-bold text-gray-500 group-hover:text-gray-700">
              8,500
            </p>
            <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 mt-2 leading-6 mx-1">
              Freelancers worldwide
            </p>
          </a>
        </div>
        <div className="mb-4 mx-5 sm:mt-4">
          <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="" >
            <p className="text-2xl font-bold text-gray-500 group-hover:text-gray-700">
              4,500
            </p>
            <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 mt-2 leading-6 mx-1">
              Users from worldwide
            </p>
          </a>
        </div>
        <div className='mb-4 sm:mt-4'>
          <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="" >
            <p className="text-2xl font-bold text-gray-500 group-hover:text-gray-700">
              $58,000
            </p>
            <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 mt-2 leading-6 mx-1">
              Paid for Freelancers.
            </p>
          </a>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
              Find <span className="text-blue-600">The BEST</span> for your Works
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((category) => (
              <div
              key={category.id}
              className="w-full bg-black rounded-lg p-12 flex flex-col justify-center items-center black-cover"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL + category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="mb-8"></div>
              <div className="text-center relative">
                <p className="text-xl text-white xxx font-bold mb-2">{category.name}</p>
              </div>
            </div>            
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
