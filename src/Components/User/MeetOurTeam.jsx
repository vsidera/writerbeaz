import React from "react";
import imgCurrency from "../../assets/images/articles/2.png";
import imgRestaurant from "../../assets/images/articles/1.png";
import imgPlane from "../../assets/images/articles/3.png";
import imgConfetti from "../../assets/images/articles/5.png";
import imgCurrency1 from "../../assets/images/articles/5.png";
import imgRestaurant2 from "../../assets/images/articles/9.jpg";
import imgPlane3 from "../../assets/images/articles/6.png";
import imgConfetti2 from "../../assets/images/articles/9.jpg";

export default function MeetOurTeam() {


  return (
   <section class="bg-white dark:bg-gray-900" style={{boxShadow:'0 0 2px inset'}}>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-5 ">
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 pb-5" id="team">
         Meet Some of Our Top Writers
       </h1>
      </div>
      <div class="grid gap-6 mb-3 lg:mb-6 md:grid-cols-3">
          <div  class=" bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img style={{borderRadius:'50%', width:'80px' }}  class=" rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgCurrency} alt="Bonnie Avatar" />
              </a>
              <div class="p-5">
                <h3 style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a style={{color:'#AD9551'}} href="#">Cameroon J</a>
                </h3>
                <span style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight dark:text-gray-400">17368 Orders 5***** </span>
                <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Bonnie drives the technical strategy of the flowbite .</p>
                                </div>
          </div>
          <div class=" bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img style={{borderRadius:'50%', width:'100px' }} class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgRestaurant} alt="Jese Avatar" />
              </a>
              <div class="p-5">
                  <h3 style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a style={{color:'#AD9551'}} href="#">Jese Leos</a>
                  </h3>
                  <span class="text-black dark:text-gray-400">Tutor</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Jese drives the technical strategy of the flowbite platform and brand.</p>
                                </div>
          </div>
          <div class=" bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img style={{borderRadius:'50%', width:'100px' }} class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgPlane} alt="Michael Avatar" />
              </a>
              <div class="p-5">
                  <h3 style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a style={{color:'#AD9551'}} href="#">Michael Gough</a>
                  </h3>
                  <span class="text-black dark:text-gray-400">Writer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Michael drives the technical strategy of the flowbite platform and brand.</p>
                                </div>
          </div>
          <div class=" bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img style={{borderRadius:'50%', width:'100px' }} class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgConfetti} alt="Sofia Avatar" />
              </a>
              <div class="p-5">
                  <h3 style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a style={{color:'#AD9551'}} href="#">Lana Byrd</a>
                  </h3>
                  <span class="text-black dark:text-gray-400">Writer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Lana drives the technical strategy of the flowbite platform and brand.</p>
                                </div>
          </div>
          <div class=" bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img style={{borderRadius:'50%', width:'100px' }} class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgPlane3} alt="Sofia Avatar" />
              </a>
              <div class="p-5">
                  <h3 style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a style={{color:'#AD9551'}} href="#">Lana Byrd</a>
                  </h3>
                  <span class="text-black dark:text-gray-400">Writer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Lana drives the technical strategy of the flowbite platform and brand.</p>
                                </div>
          </div>
          <div class=" bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img style={{borderRadius:'50%', width:'100px' }} class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgRestaurant2} alt="Sofia Avatar" />
              </a>
              <div class="p-5">
                  <h3 style={{color:'#AD9551'}} class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a style={{color:'#AD9551'}} href="#">Cameroon J.</a>
                  </h3>
                  <span class="text-black dark:text-gray-400">Writer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">17578 Orders 5***** 100% Completion rate.</p>
                                </div>
          </div>

      </div>
  </div>
</section>
  );
}

