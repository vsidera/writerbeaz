import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer/Footer';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import TypeWriterText from './Typerwriter';
import WhatsAppButton from '../WhatsApp';
import ScrollToTopButton from '../ScrollToTop';
import EmailButton from '../EmailUs';
import { FaAccessibleIcon, FaLockOpen } from 'react-icons/fa';
import JsonData from '../../data/data.json'
import { useDispatch } from 'react-redux'
import { useRef } from 'react';
import HomeSections from './HomeSections';
import HomeArticles from './HomeArticles';
import Testimonials from './Testimonials';
import About, { AboutUs } from './About';
import MeetOurTeam from './MeetOurTeam';
import Features from './Features';
import hellow from '../../assets/icons/home-sections/New entries-cuate.svg';
import hello from '../../assets/icons/home-sections/Creative writing-cuate.svg'





function Home() {
   const [landingPageData, setLandingPageData] = useState({});
   const user = useSelector(state => state.user);
  useEffect(() => {
    try{
    if(user.user_type === 'User'){
      navigate('/user')
    } else if(user.user_type === 'Tutor'){
      navigate('/tutor')
    } else if (user.user_type === 'Admin'){
      navigate('/admin')
    }
  } catch (error) {
  }

    setLandingPageData(JsonData);
  }, []);
  const [categoryData, setCategoryData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const fullName = useRef()
    const email = useRef()
    const message = useRef()


  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await api.get('/users/user-categories/');
        const skills = await api.get('/users/user-skills/');

        setCategoryData(categories.data);
        setSkillsData(skills.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    navigate(`/find-tutor?search=${encodedSearchQuery}`);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/find-tutor?category=${categoryId}`);
  };

  console.log("categories: ", categoryData)
  console.log("skills: ", skillsData)

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-white mt-12  " style={{ height: "625px" }} >
       <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 px-4 md:px-16" style={{ height: "625px", background: 'linear-gradient(to bottom ,#AD9551 , goldenrod)', borderRadius:' 0px' }} >
          <div  className="text-center lg:text-left">
            <img style={{position:'absolute', height:'200px', width:'200px', marginTop:'-180px' }}

      src={hello}
      alt='hello'
    />
            <h2 className="text-3xl font-bold text-white md:text-5xl drop-shadow-md">

              <TypeWriterText />
            </h2>
            <p className="mt-2 text-base text-white md:text-lg font-serif">
            Welcome to WriterBeaz, where your words come to life and dreams take flight! Our professional writing services are tailored to elevate your ideas, transform your stories, and amplify your voice.

Experience the power of precision, creativity, and expertise as we craft compelling narratives, persuasive essays, and captivating content designed to resonate with your audience.

At WriterBeaz, we don't just offer services; we provide unparalleled value and unwavering dedication to your success. With competitive prices and a commitment to excellence, your satisfaction is our guarantee.

Join the ranks of satisfied clients who have entrusted their stories to us. Click the button below to embark on a journey of literary excellence!            </p>
            <div className="mt-6 relative w-full">
              <a href='/signup' >
              <button className="get-started-btn">
                Get Started <FaLockOpen className='icon'/>

              </button>
              </a>
            </div>
   <img  src={hellow} alt='helo' style={{ position: 'absolute', height: 'auto', width: 'auto', left: '20%', top: '55%' }} />
    </div>
        </div>

        <div  className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }} >

          <div className="h-full object-cover" style={{ backgroundImage: "url(/images/logo.svg)" }} ></div>
        </div>
        </div>
      <div className="flex flex-col md:flex-row justify-center items-center bg-gradient-to-t from-gray-200 to-gray-200">
        <div className="mb-4 mt-5 sm:mt-4 mx-2">
          <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 px-6 flex flex-col items-center md:flex-row md:items-center" href="#">
            <p className="text-2xl font-bold text-gray-900">
              <span style={{ color:'#AD9551', fontSize:'16px'}}>Over</span> 10,000
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-900 mt-2 leading-6 mx-1">
              <span style={{ color:'#AD9551', fontSize:'16px'}}>Writers</span>
            </p>
          </a>
        </div>
        <div className="mb-4 mt-5 sm:mt-4 mx-2">
          <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 px-6 flex flex-col items-center md:flex-row md:items-center" href="#">
            <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">
              <span style={{ color:'#AD9551', fontSize:'16px'}}>Over</span> 5,000
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 mt-2 leading-6 mx-1">
              <span style={{ color:'#AD9551', fontSize:'16px'}}>Users worldwide</span>
            </p>
          </a>
        </div>
        <div className="mb-4 mt-5 sm:mt-4 mx-2">
          <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 px-6 flex flex-col items-center md:flex-row md:items-center" href="#">
            <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">
              <span style={{ color:'#AD9551', fontSize:'16px'}}>Over</span> 100
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 mt-2 leading-6 mx-1">
              <span style={{ color:'#AD9551', fontSize:'16px'}}>Countries</span>
            </p>
          </a>
        </div>
      </div>

			<HomeSections />
      <About />
      <MeetOurTeam />
			<Testimonials />
			<HomeArticles />



      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <EmailButton />
    </div>
  );
}

export default Home;
