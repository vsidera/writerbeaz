import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearUser, setProfile } from '../../Redux/store';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import { FaBookOpen, FaFirstOrder, FaMailBulk, FaSearch, FaSpinner, FaUser } from 'react-icons/fa';

function TutorSidebar() {

  const location = useLocation();

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const profile = useSelector(state => state.profile);

  let heading = 'My Dashboard';
  if (location.pathname === '/tutor/inbox') {
    heading = 'Inbox';
  } else if (location.pathname === '/tutor/works') {
    heading = 'Orders';
  } else if (location.pathname === '/tutor/chatx') {
    heading = 'ChatX';
  } else if (location.pathname === '/tutor/profile') {
    heading = 'My Profile'
  }

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    } else {
      api.get('/tutor/tutor-profile/')
        .then(response => {
          const p = response.data;
          dispatch(setProfile(p));
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success('Tutor Logged out');
    navigate('/login')
  };

  return (
    <>
      <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h2 className="text-2xl text-black font-bold lg:ml-72 lg:mt-2">{heading}</h2>
          <button
            className="w-12 h-16 -mr-2 border-r lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 my-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <aside style={{ boxShadow: '0 0 2px', background: 'linear-gradient(to bottom ,#AD9551 , goldenrod)' }}
        className={`${menuOpen ? 'ml-0' : '-ml-[100%]'
          } fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gradient-to-r from-cyan-500 to-blue-500 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}
      >
        <button onClick={() => setMenuOpen(false)} className="absolute top-2 right-2 text-blue-800 focus:outline-none hover:text-black lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link to="/tutor" title="home">
              <div className="flex items-center justify-center">
                <h1 class="header-logo" >WriterBeaz<FaBookOpen /> </h1>
              </div>
            </Link>


          </div>
          <div style={{ background: 'red' }}>
            {profileData && (
              <div className="mt-8 text-center">
                <Link to='/tutor/profile'>
                  <img
                    src={process.env.REACT_APP_BASE_URL + profileData.profile_photo}
                    alt="Tutor Profile"
                    className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                  />
                </Link>
                <h6 className="hidden mt-3 text-base font-bold text-gray-700 lg:block">
                  {profileData.tutor.username} | Tutor
                </h6>
                <Link className='font-bold text-xs text-gray-700 hover:text-gray-600 md:ml-2' to='/tutor/profile'>view profile</Link>
              </div>
            )}</div>
          <ul className="space-y- tracking-wide mt-8">

            <li>
              <NavLink
                to="/tutor"
                aria-label="dashboard"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-yellow-100 group ${location.pathname === '/tutor' ? 'bg-black' : 'bg-transparent'
                  }`}
              ><FaUser />

                <span className={`${location.pathname === '/tutor' ? 'font-bold text-white' : '-mr-1 font-medium '}`}> {user.username}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutor/inbox"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${location.pathname === '/tutor/inbox' ? 'bg-black' : 'bg-transparent'
                  }`}
              >
                <FaMailBulk />
                <span className={`${location.pathname === '/tutor/inbox' ? 'font-bold text-white' : '-mr-1 font-medium '}`}>Inbox</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutor/works"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${location.pathname === '/tutor/works' ? 'bg-black' : 'bg-transparent'
                  }`}
              >
                <FaFirstOrder />
                <span className={`${location.pathname === '/tutor/works' ? 'font-bold text-white' : '-mr-1 font-medium '}`}>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutor/chatx"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${location.pathname === '/tutor/chatx' ? 'bg-black' : 'bg-transparent'
                  }`}
              >

                <span className={`${location.pathname === '/tutor/chatx' ? 'font-bold text-white' : '-mr-1 font-medium '}`}>ChatX</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutor/find-job"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${location.pathname === '/tutor/find-job' ? 'bg-black' : 'bg-transparent'
                  }`}
              >
                <span><FaSearch /></span> {/* You can replace this with your preferred icon */}
                <span className={`${location.pathname === '/tutor/find-job' ? 'font-bold text-white' : '-mr-1 font-medium '}`}>
                  Find a Job
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutor/bids"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${location.pathname === '/tutor/bids' ? 'bg-black' : 'bg-transparent'
                  }`}
              >
                <span><FaSpinner /></span> {/* You can replace this with your preferred icon */}
                <span className={`${location.pathname === '/tutor/bids' ? 'font-bold text-white' : '-mr-1 font-medium '}`}>
                  Bids
                </span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            onClick={handleLogout}
            className="px-4 py-3 flex items-center space-x-2 rounded-md text-black group font-semibold hover:text-white hover:bg-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default TutorSidebar
