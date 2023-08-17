import React, {useEffect} from 'react';
import Navbar from '../Layout/Navbar';
import { useSelector } from 'react-redux';

function Home() {

  const emailAddress = useSelector(state => state.emailAddress);
  const user = useSelector(state => state.user);
  const tokenExpiry = useSelector(state => state.tokenExpiry);
  const refreshToken = useSelector(state => state.refreshToken);
  const accessToken = useSelector(state => state.accessToken);

  console.log('Stored Email in Redux:', emailAddress);
  console.log('User Details in Redux:', user);
  console.log('TokenExpiry in Redux:', tokenExpiry);
  console.log('RefreshToken in Redux:', refreshToken);
  console.log('AccessToken in Redux:', accessToken);

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-cyan-600 to-blue-700" style={{ height: "620px" }}>
        <div className="hidden lg:block lg:w-1/2" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}>
          <div className="h-full object-cover" style={{ backgroundImage: "url(/images/main1-removebg.png)" }}>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 px-8 md:px-12" style={{ height: "620px"}}>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white md:text-5xl drop-shadow-md">Find the Perfect Talent.</h2>
            <p className="mt-2 text-base text-white md:text-lg font-serif">Forget old rules, get the best people right here, right now!</p>
            <div className="mt-6 relative" style={{width: "507px"}}>
              <input
                type="text"
                className="px-4 py-2 border rounded w-full md:w-[500px]"
                placeholder="Search for any Service"
              />
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-gray-200 font-semibold rounded hover:bg-blue-900" style={{padding: "3px"}}
              >
                <lord-icon
                    src="https://cdn.lordicon.com/xfftupfv.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={{width:"60px", height:"28px"}}>
                </lord-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
