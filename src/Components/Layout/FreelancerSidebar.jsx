import React, {useState, useEffect} from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearUser } from '../../Redux/store';
import api from '../../api/axiosConfig';

function FreelancerSidebar() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    api.get('/freelancers/freelancer-profile/')
        .then(response => {
            setProfileData(response.data);
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
}, []);

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success('Freelancer Logged out');
    navigate('/login') 
    };

  return (
    <>
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gradient-to-r from-cyan-500 to-blue-500 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
            <div className="-mx-6 px-6 py-4">
            <Link to="/freelancer" title="home">
                <div className="flex items-center justify-start">
                <lord-icon
                    src="https://cdn.lordicon.com/dycatgju.json"
                    trigger="loop"
                    delay="2000"
                    colors="primary:#121331"
                    style={{ width: '50px', height: '50px' }}
                ></lord-icon>
                <a className="font-extrabold text-2xl text-[#121331]">workX</a>
                </div>
            </Link>
            </div>
            {profileData && (
                <div className="mt-8 text-center">
                    <Link to='/freelancer/profile'>
                        <img
                            src={process.env.REACT_APP_API_BASE_URL + profileData.profile_photo}
                            alt=""
                            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                        />
                    </Link>
                    <h6 className="hidden mt-3 text-base font-bold text-gray-700 lg:block">
                        {profileData.freelancer.username} | Freelancer
                    </h6>
                    <Link className='font-bold text-xs text-gray-700 hover:text-gray-600 md:ml-2' to='/freelancer/profile'>view profile</Link>
                </div>
            )}
            <ul className="space-y-2 tracking-wide mt-8">
            <li>
                <NavLink
                to="/freelancer"
                aria-label="dashboard"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${
                    location.pathname === '/freelancer' ? 'bg-black' : 'bg-transparent'
                }`}
                >
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                    <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                    <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className={`${location.pathname === '/freelancer' ? 'font-bold text-white' : '-mr-1 font-medium ' }`}>Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/freelancer/inbox"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${
                    location.pathname === '/freelancer/inbox' ? 'bg-black' : 'bg-transparent'
                }`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                <span className={`${location.pathname === '/freelancer/inbox' ? 'font-bold text-white' : '-mr-1 font-medium ' }`}>Inbox</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/freelancer/works"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${
                    location.pathname === '/freelancer/works' ? 'bg-black' : 'bg-transparent'
                }`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
                <span className={`${location.pathname === '/freelancer/works' ? 'font-bold text-white' : '-mr-1 font-medium ' }`}>Works</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/freelancer/chatx"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${
                    location.pathname === '/freelancer/chatx' ? 'bg-black' : 'bg-transparent'
                }`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className={`${location.pathname === '/freelancer/chatx' ? 'font-bold text-white' : '-mr-1 font-medium ' }`}>ChatX</span>
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

export default FreelancerSidebar