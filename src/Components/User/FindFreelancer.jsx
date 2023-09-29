import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import api from '../../api/axiosConfig';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';

function FindFreelancer() {
  const [gigsData, setGigsData] = useState([]);
  const [gigsSearch, setGigsSearch] = useState('');
  const [filteredGigsData, setFilteredGigsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueStates, setUniqueStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [sortBy, setSortBy] = useState('lowToHigh');
  const [priceRange, setPriceRange] = useState('');

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const initialSearchQuery = queryParams.search || '';
  const selectedCategoryId = queryParams.category || '';

  useEffect(() => {
    async function fetchData() {
      try {
        const gigs = await api.get('/users/user-gigs/');
        const categories = await api.get('/admin/categories/');
        
        setGigsData(gigs.data);
        setFilteredGigsData(gigs.data);
        setCategoryData(categories.data);

        if (initialSearchQuery.trim() !== '') {
          const filteredGigs = gigs.data.filter(
            (gig) =>
              gig.title.toLowerCase().includes(initialSearchQuery.toLowerCase()) ||
              gig.freelancer.first_name.toLowerCase().includes(initialSearchQuery.toLowerCase())
          );
          setFilteredGigsData(filteredGigs);
        }

        if (selectedCategoryId !== '') {
            const filteredGigs = gigs.data.filter(
              (gig) => gig.category.id === parseInt(selectedCategoryId) && gig.is_active === true
            );
            setFilteredGigsData(filteredGigs);
        }

      } catch (error) {
        console.error('Error fetching gigs or categories:', error);
      }
    }
    fetchData();
  }, [initialSearchQuery, selectedCategoryId]);

  const fetchUniqueStates = async () => {
    try {
      const response = await api.get('/users/user-locations/');
      setUniqueStates(response.data.states);
    } catch (error) {
      console.error('Error fetching unique states:', error);
    }
  };
  
  useEffect(() => {
    fetchUniqueStates();
  }, []);
  

  const handleGigsSearchChange = (event) => {
    setGigsSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  
    if (selectedValue === '') {
      const activeGigs = gigsData.filter((gig) => gig.is_active === true);
      setFilteredGigsData(activeGigs);
    } else {
      const filteredGigs = gigsData.filter(
        (gig) => gig.category.id === parseInt(selectedValue) && gig.is_active === true
      );
      setFilteredGigsData(filteredGigs);
    }
  };
  

  const handleSearch = (event) => {
    event.preventDefault();
    if (gigsSearch.trim() === '') {
      setFilteredGigsData(gigsData);
    } else {
      const filteredGigs = gigsData.filter(
        (gig) =>
          gig.title.toLowerCase().includes(gigsSearch.toLowerCase()) ||
          gig.freelancer.first_name.toLowerCase().includes(gigsSearch.toLowerCase())
      );
      setFilteredGigsData(filteredGigs);
    }
  };

  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);
  
    if (selectedValue === '') {
      setFilteredGigsData(gigsData);
    } else {
      const filteredGigs = gigsData.filter((gig) => gig.freelancer.state === selectedValue);
      setFilteredGigsData(filteredGigs);
    }
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);
    let sortedGigs = [...filteredGigsData];
    if (selectedValue === 'lowToHigh') {
      sortedGigs.sort((a, b) => a.starting_price - b.starting_price);
    } else if (selectedValue === 'highToLow') {
      sortedGigs.sort((a, b) => b.starting_price - a.starting_price);
    }
    setFilteredGigsData(sortedGigs);
  };
  
  const handlePriceRangeChange = (event) => {
    const selectedValue = event.target.value;
    setPriceRange(selectedValue);
    let filteredGigs = [...gigsData];
    if (selectedValue === '0-5000') {
      filteredGigs = filteredGigs.filter((gig) => gig.starting_price < 5000);
    } else if (selectedValue === '5000-10000') {
      filteredGigs = filteredGigs.filter((gig) => gig.starting_price >= 5000 && gig.starting_price <= 10000);
    } else if (selectedValue === '10000-15000') {
      filteredGigs = filteredGigs.filter((gig) => gig.starting_price >= 10000 && gig.starting_price <= 15000);
    } else if (selectedValue === '15000-20000') {
      filteredGigs = filteredGigs.filter((gig) => gig.starting_price >= 15000 && gig.starting_price <= 20000);
    } else if (selectedValue === '20000-above') {
      filteredGigs = filteredGigs.filter((gig) => gig.starting_price >= 20000);
    }
    setFilteredGigsData(filteredGigs);
  };

  return (
    <div>
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 mt-20">
            Find and Hire Freelancers
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-blue-500 mt-3">
            We found 1500 Freelancers offering 2300 services online.
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="flex items-center" onSubmit={handleSearch}>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search Freelancers"
                required
                value={gigsSearch}
                onChange={handleGigsSearchChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              Search
            </button>
          </form>

          <div className="flex flex-wrap mt-5">
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="">All Categories</option>
                {categoryData
                    .filter((category) => category.is_active)
                    .map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handleStateChange}
                value={selectedState}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="">All Locations</option>
                {uniqueStates.map((state, index) => (
                    <option key={index} value={state}>
                    {state}
                    </option>
                ))}
                </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handleSortChange}
                value={sortBy}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handlePriceRangeChange}
                value={priceRange}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="">Price Range: Any</option>
                <option value="0-5000">Below ₹5000</option>
                <option value="5000-10000">₹5000 - ₹10000</option>
                <option value="10000-15000">₹10000 - ₹15000</option>
                <option value="15000-20000">₹15000 - ₹20000</option>
                <option value="20000-above">₹20000 and above</option>
                </select>
            </div>
            </div>
        </div>

        {filteredGigsData.length === 0 ? (
          <div className="col-span-1 flex justify-center items-center">
            <img
              src="/images/2953962.jpg"
              alt="Image"
              className="w-full h-auto max-w-lg"
            />
          </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {filteredGigsData
              .filter((gig) => gig.is_active === true)
              .map((gigs) => (
              <div
                key={gigs.id}
                className="w-full bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
              >
                <Link to={`/single-view/${gigs.id}`}>
                  <div className="mb-2">
                    <img
                      className="object-center object-cover rounded-xl h-56 w-80"
                      src={gigs.image1}
                      alt={gigs.title}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-700 font-bold">{gigs.title}</p>
                    <p className="text-sm text-gray-400 font-normal">
                      {gigs.category.name}
                    </p>
                  </div>
                  <div className="mt-2 text-base text-gray-600 font-normal w-80 sm:w-64 md:w-80">
                    <p className="mb-3">{gigs.description}</p>
                    <div className="flex flex-wrap justify-between">
                      <p className="w-1/2">from: ₹{gigs.starting_price}</p>
                      <div className="w-1/2 flex bg-gray-500 rounded-xl">
                        <p className="mx-12 font-semibold text-sm text-white">
                          {gigs.freelancer.first_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default FindFreelancer;
