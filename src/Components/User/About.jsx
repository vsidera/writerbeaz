import React from 'react'
import Navbar from '../Layout/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../Layout/Footer'

function About() {
  return (
    <div>
      <Navbar />

      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 mt-12 sm:h-auto flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-3xl text-white mb-2 mt-10">
        What Sets Us Apart ?
        </h1>
        <p className='text-white mb-10 lg:w-1/3'>workX's four key benefits are hard to match. Find out why lots of Employers and Freelancers choose our platform to connect and work together.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-4 pb-12 items-center">
          <div className="text-white sm:col-span-1 sm:mt-20 md:w-96">
            <div className="mb-6 md:mb-10 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/zchxlapl.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff"
                  style={{width: "70px", height: "70px"}}>
              </lord-icon>
              <h2 className="font-bold text-lg mb-2">Flexibility</h2>
            </div>
            <div className="mb-6 md:mb-10 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/jmkrnisz.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff"
                  style={{width: "70px", height: "70px"}}>
              </lord-icon>
              <h2 className="font-bold text-lg mb-2">Security</h2>
            </div>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img src="/images/close-up-handsome-businessman-black-suit-smiling-amazed-showing-number-four-standing-white-background-removebg-preview.png" alt="Image" className="w-full h-auto max-w-lg" />
          </div>
          <div className="text-white sm:col-span-1 mt-10 sm:mt-0 md:w-96">
            <div className="mb-6 md:mb-10 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/nocvdjmh.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff"
                  style={{width: "70px", height: "70px"}}>
              </lord-icon>
              <h2 className="font-bold text-lg mb-2">Support</h2>
            </div>
            <div className="mb-6 md:mb-0 mt-10 md:mt-0">
              <lord-icon
                  src="https://cdn.lordicon.com/xcevpeyr.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff"
                  style={{width: "70px", height: "70px"}}>
              </lord-icon>
              <h2 className="font-bold text-lg">Value</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="min-h-screen bg-gradient-to-r from-sky-200 to-white py-20">
        <h1 class="text-4xl font-bold text-center pb-10"><span class="text-blue-600">About</span> our works</h1>

          <div class="max-w-6xl mx-auto flex flex-col gap-10 px-5">
              <div class="flex flex-col md:flex-row bg-white   rounded-xl md:bg-transparent shadow-lg shadow-black/20 md:shadow-none gap-10">
                  <div class="flex justify-center md:justify-end">
                      <div class="w-[120px] h-[120px] bg-white  shadow-lg rounded-xl p-4 flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-blue-950">
                              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                          </svg>
                      </div>
                  </div>
                  <div class="bg-white shadow-lg rounded-md p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
                      <h1 class="font-bold text-xl pb-4">1. It's a system built for you </h1>
                      <p >
                      We make it easy for you to work online, whether you run your own business or work for an agency, small business, or enterprise company.
                      </p>
                  </div>
              </div>
              <div class="flex flex-col md:flex-row bg-white  md:bg-transparent  rounded-xl gap-10">
                  <div class="w-full md:w-[500px] flex justify-center md:justify-end">
                      <div class="w-[120px] h-[120px]  shadow-lg bg-white   md: rounded-xl md:p-4 flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-blue-950">
                              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                          </svg>
                      </div>
                  </div>
                  <div class=" bg-white  shadow-lg  rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
                      <h1 class="font-bold text-xl">2. You won't find better value anywhere else  </h1>
                      <p >
                      We believe in maximizing value and minimizing costs for all of our members so that you have a rewarding experience using the website. Our cost-effective platform provides all the tools and features you need to get work done successfully, while charging you the lowest fees in the freelance marketplace industry.
                      </p>
                  </div>
              </div>
              <div class="flex flex-col md:flex-row bg-white md:bg-transparent   rounded-xl  gap-10">
                  <div class="w-full md:w-[750px] flex justify-center md:justify-end">
                      <div class="w-[120px]   shadow-lg h-[120px] bg-white  md: rounded-xl p-4 flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-blue-950">
                              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                          </svg>
                      </div>
                  </div>
                  <div class=" bg-white   shadow-lg rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
                      <h1 class="font-bold text-xl">3. Your funds are secure with us </h1>
                      <p>With SafePay payment protection, Freelancers feel confident that they will get paid for their work and Employers feel secure that they can review the work before paying an invoice. We also provide multiple payment and withdrawal options for secure transactions.</p>                        
                  </div>
              </div>
              <div class="flex flex-col md:flex-row bg-white   md:bg-transparent rounded-xl gap-10">
                  <div class="w-full md:w-[500px] flex justify-center md:justify-end">
                      <div class="shadow-lg w-[120px] h-[120px] bg-white   rounded-xl p-4 flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-blue-950">
                              <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" />
                          </svg>
                      </div>
                  </div>
                  <div class=" bg-white  shadow-lg  rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
                      <h1 class="font-bold text-xl">4. We are available 24/7 </h1>
                      <p>Our dedicated Support team is here to help you navigate our tools and get the most out of the website. You can count on them to work with you in a timely manner to resolve any issues that might arise, no matter where you are located. providing 24*7 support set us apart from other service marketplaces. </p>                        
                  </div>
              </div>
              <div class="flex flex-col md:flex-row bg-white   md:bg-transparent rounded-xl gap-10">
                  <div class="flex justify-center md:justify-end">
                      <div class="w-[120px]  h-[120px] bg-white   shadow-lg  rounded-xl p-4 flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-blue-950">
                              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                          </svg>
                      </div>
                  </div>
                  <div class=" bg-white  shadow-lg  rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-200">
                      <h1 class="font-bold text-xl">5. Thrive with Us </h1>
                      <p>Join our platform and thrive. Whether you're an experienced professional or just starting out, our commitment to your success is unwavering. We offer a thriving ecosystem where you can pursue your passions, achieve your goals, and make your mark in the online working world.</p>                        
                  </div>
              </div>
          </div>
      </div>

      <section className="bg-gradient-to-r pb-20">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-4xl font-bold text-center pb-10">
            Join now in<span className="text-blue-600"> workX</span>
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
            <div className="p-4">
              <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-blue-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-xl text-center mb-10">Employers</h1>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Browse Professional Experts:</h2>
                <p className='text-base text-gray-400'> Identify credible Freelancers with All-Time TransactionData </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Post a Job for Free:</h2>
                <p className='text-base text-gray-400'> Boost your reach and hire top talent with Featured jobs on workX. </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Protect Payments with SafePay:</h2>
                <p className='text-base text-gray-400'> Release payment for an invoice only after reviewing work. </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Pay Lowest Fee:</h2>
                <p className='text-base text-gray-400'> Pay directly or you can use our safe way of payment gateway. </p>
              </div>
              <div className='mt-10'>
                <Link to='/find-freelancer' className="p-2 overflow-hidden rounded-md bg-blue-500 hover:bg-blue-600 text-sm font-bold text-white">
                  Search Freelancers
                </Link>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-blue-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-xl text-center mb-10">Freelancers</h1>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Apply your Skills:</h2>
                <p className='text-base text-gray-400'> Apply your all skills in the platform and create a perfect profile for high pay jobs. </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Work the way you want:</h2>
                <p className='text-base text-gray-400'> Choose from four Payment terms and create an Agreement that works for you. </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Manage multiple jobs:</h2>
                <p className='text-base text-gray-400'> Use WorkRooms to collaborate and add team members to your job. </p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Protect Payments with SafePay:</h2>
                <p className='text-base text-gray-400'> Ask your Employer to fund SafePay before you begin work. </p>
              </div>
              <div className='mt-10'>
                <Link to='/signup' className="p-2 overflow-hidden rounded-md bg-blue-500 hover:bg-blue-600 text-sm font-bold text-white">
                  Find a job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About