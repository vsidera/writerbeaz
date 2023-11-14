import React from 'react'
import Navbar from '../Layout/Navbar'
import { Link } from 'react-router-dom'
import about from '../../images/assets/Office work-cuate.svg'


function About() {
  return (
    <div>
      <Navbar />

      <div style={{background:'#f6f6f6', boxShadow:'0 0 2px'}} className="bg-gradient-to-r from-gray-200 to-gray-200 mt-12 sm:h-auto flex flex-col justify-center items-center text-center">
        <h1 id='about' className="font-bold text-4xl text-black mb-2 mt-10">
        About Us
        </h1>
        <p className='text-black mb-10 lg:w-1/3'>There are good things about using our platform</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-4 pb-12 items-center">
          <div className="col-span-1 flex justify-center items-center">
            <img src={about} alt="Image" className="w-full h-auto max-w-lg" />
          </div>
          <div className="text-white sm:col-span-1 sm:mt-10 ">
            <div className="mb-6 md:mb-10 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/zchxlapl.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:white"
                  style={{width: "70px", 
                  background:'linear-gradient(to right, #AD9551, goldenrod)',
                  height: "70px",
                  borderRadius:'50px'
                  }}>
              </lord-icon>
              <h2 className="font-bold text-lg mb-2 text-black ">Flexibility</h2>
        <p  className="text-sm text-gray-700">Our platform provides the flexibility you<br></br> need to accomplish your goals efficiently.</p>            </div>
            
            <div className="mb-6 md:mb-10 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/jmkrnisz.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:white"
                  style={{width: "70px", 
                  background:'linear-gradient(to right, #AD9551, goldenrod)',
                  borderRadius:'50px',
                  height: "70px"}}>
              </lord-icon>
              
              <h2 className="font-bold text-lg text-black mb-2">Security</h2>
                      <p className="text-sm text-gray-700">We prioritize the security of your information<br></br> and transactions to ensure peace of mind.</p>

            </div>
          </div>
          <div className="text-white sm:col-span-1 mt-10 sm:mt-0 md:w-96">
            <div className="mb-6 md:mb-10 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/nocvdjmh.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:white"
                  style={{width: "70px", 
                  background:'linear-gradient(to right, #AD9551, goldenrod)',
                  borderRadius:'50px',
                  height: "70px"}}>
              </lord-icon>
              <h2 className="font-bold text-lg
              text-black mb-2">Support</h2>
                      <p className="text-sm text-gray-700">Our dedicated support team is here to <br></br>assist you every step of the way for a <br></br>seamless experience.</p>

            </div>
            <div className="mb-6 md:mb-0 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/xcevpeyr.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:white"
                  style={{width: "70px", 
                  background:'linear-gradient(to right, #AD9551, goldenrod)',
                  borderRadius:'50px',
                  height: "70px"}}>
              </lord-icon>
              <h2 className="font-bold text-lg text-black">Value</h2>
                      <p className="text-sm text-gray-700">We strive to deliver exceptional value and quality<b></b> in all our services and interactions.</p>

            </div>
          </div>
        </div>
      </div>

  <div style={{background:'white', boxShadow:'0 0 2px inset'}} class="min-h-screen bg-gradient-to-r from-sky-200 to-white py-1 pt-10">
  <h1 className="text-4xl font-extrabold text-center text-white pb-5" id='works'><span class="text-blue-600"></span> Our Works</h1>

  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
     
      <div  class="flex flex-col gap-0">
          <div  class="w-full flex justify-center md:justify-start ">
              <div style={{background:'white',boxShadow:'0 0 1.2.3px', borderRadius:'50%'}} class="w-[60px] h-[60px]  shadow-lg bg-white  absolute  rounded-xl p-4 flex justify-center items-center">
                  <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-950">
                      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
              </div>
          </div>
          <div style={{background:'linear-gradient(to right, #AD9551, #AD9551)'}} class="bg-white shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
  <h1 class="font-bold text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Unmatched Value, Unbeatable Quality </h1>
  <p style={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Embark on a journey with us where you experience unmatched value and unbeatable quality. We are committed to delivering a rewarding and cost-effective platform for our members. Our comprehensive set of tools and features empower you to accomplish your projects successfully, all while ensuring you enjoy the most competitive fees in the freelance marketplace industry.</p>
</div>

      </div>
      <div class="flex flex-col">
          <div style={{background:'red', borderRadius:'50%'}} class="w-full flex justify-center md:justify-start">
              <div style={{borderRadius:'50%'}} class="w-[60px]   shadow-lg h-[60px] bg-white  md: rounded-xl p-4 flex justify-center items-center absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-950">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                  </svg>
              </div>
          </div>
          <div style={{background:'linear-gradient(to right, #AD9551, #AD9551)'}} class="bg-white shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
  <h1 class="font-bold text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Swift and Secure Transactions </h1>
  <p style={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience the epitome of speed and security with our payment system. Our SafePay payment protection ensures freelancers receive timely payments for their work, and employers can confidently review the work before settling invoices. We go the extra mile by offering multiple payment and withdrawal options, guaranteeing secure transactions for everyone involved.</p>
</div>

      </div>
      <div class="flex flex-col">
          <div class="w-full flex justify-center md:justify-start">
              <div style={{borderRadius:'50%'}} class="shadow-lg w-[60px] h-[60px] bg-white   rounded-xl p-4 flex justify-center items-center absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-950">
                      <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" />
                  </svg>
              </div>
          </div>
          <div style={{background:'linear-gradient(to right, #AD9551, #AD9551)'}} class="bg-white shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
  <h1 class="font-bold text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Exceptional 24/7 Assistance</h1>
  <p style={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience unparalleled support with our dedicated team, available 24/7 to guide you through our tools and maximize your website experience. Whether you're facing challenges or need assistance, our team is committed to resolving issues promptly, regardless of your location. Our round-the-clock support sets us apart, ensuring your journey with us is smooth and worry-free.</p>
</div>

      </div>
      <div class="flex flex-col">
          <div class="w-full flex justify-center md:justify-start">
              <div style={{borderRadius:'50%'}} class="shadow-lg w-[60px] h-[60px] bg-white   rounded-xl p-4 flex justify-center items-center absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-950">
                      <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" />
                  </svg>
              </div>
          </div>
         <div style={{background:'linear-gradient(to right, #AD9551, #AD9551)'}} class="bg-white shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
  <h1 class="font-bold text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Diverse Opportunities Await</h1>
  <p style={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore a multitude of job opportunities tailored for you. Our platform offers a variety of roles and projects to match your skills and interests. With our commitment to your success, we provide a platform where you can thrive, connect with employers, and embark on a rewarding freelancing journey. Discover the diversity of opportunities that set us apart in the service marketplace.</p>
</div>

      </div>
      <div class="flex flex-col">
          <div class="w-full flex justify-center md:justify-start">
              <div style={{borderRadius:'50%'}} class="shadow-lg w-[60px] h-[60px] bg-white   rounded-xl p-4 flex justify-center items-center absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-950">
                      <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" />
                  </svg>
              </div>
          </div>
          <div style={{background:'linear-gradient(to right, #AD9551, #AD9551)'}} class="bg-white shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
  <h1 class="font-bold text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. Seamless Onboarding Experience</h1>
  <p style={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience a hassle-free onboarding process with us. Our platform ensures a user-friendly signup process, allowing you to quickly join our community of freelancers and employers. Our support team is available to assist you at every step, ensuring that you have a smooth and easy signup experience. Join us today and kickstart your journey with simplicity and ease.</p>
</div>

      </div>
      <div class="flex flex-col">
          <div class="flex justify-center md:justify-start">
              <div style={{borderRadius:'50%'}}class="w-[60px]  h-[60px] bg-white   shadow-lg  rounded-xl p-4 flex justify-center absolute items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-950">
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
              </div>
          </div>
          <div style={{background:'linear-gradient(to right, #AD9551, #AD9551)'}} class="bg-white shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-yellow-200">
  <h1 class="font-bold text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. Unlock Your Potential with Our Platform</h1>
  <p style={{color:'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Embark on a journey of growth and success by joining our platform. Whether you are an industry veteran or just starting your career, we are dedicated to ensuring your success. Our platform provides a thriving environment where you can explore your passions, achieve your objectives, and leave your mark in the online working world. Join us today and discover new opportunities to thrive!</p>
</div>

      </div>
  </div>
</div>

    <section style={{padding:'10px 10px 100px 10px'}} className="bg-gray-200 md:bg-gradient-to-r from-gray-100 to-gray-100 pb-10">
    <div  className="container mx-auto pt-10 ">
        <h1 className="text-4xl font-extrabold text-center text-white pb-5" id='title'>
            <span style={{color:'black'}} className="">Join us now</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div  style={{ 
        background: 'linear-gradient(180deg, black 33%, white 33%, white 100%)', boxShadow:'0 0 2px'
        }}  className="p-6 bg-gray-900 rounded-lg">
                <div
                    style={{ background: 'linear-gradient(to right, #AD9551, goldenrod)' }}
                    className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-yellow-500 text-black"
                >
<svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-10 h-10"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                        />
                    </svg>                </div>
                <h2 className="font-bold text-2xl text-center text-white mt-8 mb-6">Be a Client</h2>
                <div className="text-black">
    <h3 className="font-semibold text-lg">Connect with Top Professionals:</h3>
    <p className="text-base text-black">
        Explore our carefully curated pool of highly skilled freelancers with a proven track record.
    </p>
</div>
<div className="mt-4 text-black">
    <h3 className="font-semibold text-lg">Post Projects for Free:</h3>
    <p className="text-base text-black">
        Boost your visibility and attract the best candidates by posting your projects with our featured job listings.
    </p>
</div>
<div className="mt-4 text-black">
    <h3 className="font-semibold text-lg">Ensure Secure Transactions:</h3>
    <p className="text-base text-black">
        Enjoy peace of mind with our SafePay system, ensuring safe and transparent payment processing for your projects.
    </p>
</div>
<div className="mt-4 text-black">
    <h3 className="font-semibold text-lg">Lowest Processing Fees:</h3>
    <p className="text-base text-black">
        Take advantage of our competitive processing fees and convenient payment options for a seamless experience.
    </p>
</div>

            </div>

            <div  style={{ 
        background: 'linear-gradient(180deg, black 33%, white 33%, white 100%)', boxShadow:'0 0 2px '
        }}  className="p-6 bg-gray-700 rounded-lg">
                <div
                    style={{ background: 'linear-gradient(to right, #AD9551, goldenrod)' }}
                    className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-yellow-500 text-white"
                >
 <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10"
                    >
                        <path
                            d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"
                            clipRule="evenodd"
                        />
                    </svg>                </div>
                <h2 className="font-bold text-2xl text-center text-white mt-8 mb-6">Join As a Writer</h2>
                <div className="text-black">
                    <h3 className="font-semibold text-lg">Showcase Your Talents:</h3>
                    <p className="text-base text-black">
                        Demonstrate your skills and expertise through a compelling profile for high-paying assignments.
                    </p>
                </div>
                <div className="mt-4 text-black">
                    <h3 className="font-semibold text-lg">Flexible Working Options:</h3>
                    <p className="text-base text-black">
                        Select from various payment terms and establish agreements that align with your preferences.
                    </p>
                </div>
                <div className="mt-4 text-black">
                    <h3 className="font-semibold text-lg">Efficient Task Management:</h3>
                    <p className="text-base text-black">
                        Optimize collaboration by using WorkRooms and involving team members in your projects.
                    </p>
                </div>
                <div className="mt-4 text-black">
                    <h3 className="font-semibold text-lg">Ensure Secure Payments:</h3>
                    <p className="text-base text-black">
                        Request your clients to fund SafePay before commencing any work for added security.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>


    </div>
  )
}

export default About