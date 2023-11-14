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
  useEffect(() => {
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
    navigate(`/find-freelancer?search=${encodedSearchQuery}`);
  };  

  const handleCategoryClick = (categoryId) => {
    navigate(`/find-freelancer?category=${categoryId}`);
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
We offer professsional essay and writers. We offer the best Prices and Guaranteed value for money. Click the Button below to proceed            </p>
            <div className="mt-6 relative w-full">
              <a href='/signup' >
              <button className="get-started-btn">
                Get Started <FaLockOpen className='icon'/>
                
              </button>
              </a>
            </div>
   <img  src={hellow} alt='helo' style={{ position: 'absolute', height: '30%', width: '30%', left: '20%', top: '55%' }} />
    </div>
        </div> 
        
        <div  className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }} >
          
          <div className="h-full object-cover" style={{ backgroundImage: "url(/images/logo.svg)" }} ></div>
        </div>
        
      </div>
      <div  style={{boxShadow:'0 0 2px'}} className="flex flex-col md:flex-row bg-gradient-to-t from-gray-200 to-gray-200 justify-center items-center">
        <div  className="mb-4 mt-5 sm:mt-4">
          <a style={{border:'1px solid #AD9551'}} className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="#" >
            <p className="text-2xl font-bold text-gray-900 ">
              <span style={{color:'#AD9551', fontSize:'16px'}}>Over</span> 10,000
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-900 mt-2 leading-6 mx-1">
             <span style={{color:'#AD9551', fontSize:'16px'}}>Writers</span>  
            </p>
          </a>
        </div>
        <div className="mb-4 mx-5 sm:mt-4">
          <a style={{border:'1px solid #AD9551'}} className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="#" >
            <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">
              <span style={{color:'#AD9551', fontSize:'16px'}}>Over</span> 5,000
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 mt-2 leading-6 mx-1">
             <span style={{color:'#AD9551', fontSize:'16px'}}>Users worldwide</span> 
            </p>
          </a>
        </div>
        <div className="mb-4 mx-5 sm:mt-4">
          <a style={{border:'1px solid #AD9551'}} className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="#" >
            <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">
              <span style={{color:'#AD9551', fontSize:'16px'}}>Over</span> 100
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 mt-2 leading-6 mx-1">
              <span style={{color:'#AD9551', fontSize:'16px'}}> Countries</span>
            </p>
          </a>
        </div>
        <div className='mb-4 sm:mt-4'>
          <a style={{border:'1px solid #AD9551'}} className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-6 pr-6 pl-9 flex flex-col items-center md:flex-row md:items-center" href="#" > 
            <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">
              <span style={{color:'#AD9551', fontSize:'16px'}}>Over</span>$50,000
            </p>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700  leading-6 mx-1">
             <span style={{color:'#AD9551', fontSize:'16px'}}>daily</span>
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
