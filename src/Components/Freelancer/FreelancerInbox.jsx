import React from 'react'
import FreelancerSidebar from '../Layout/FreelancerSidebar'

function FreelancerInbox() {
  return (
    <div>
      <FreelancerSidebar />

      <div class="h-screen max-w-8xl mx-auto mt-24 space-y-20">
        <div class="max-w-screen-md md:w-3/4 mx-auto">
          <div class="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 bg-blue-800 rounded-xl">
            <p class="w-full text-2xl font-semibold text-white">Dark variant</p>
            <p class="w-full pb-8 text-sm tracking-wide leading-tight text-white">Card layouts can vary to support the types of content they contain. The following elements are commonly found among that variety.</p>
            <div class="rounded mr-auto">
              <div class="opacity-95 border rounded-lg border-white px-4">
                <p class="m-auto inset-0 text-sm font-medium leading-normal text-center text-white py-2">Buy Now</p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-md md:w-3/4 mx-auto">
          <div class="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 bg-blue-800 rounded-xl">
            <p class="w-full text-2xl font-semibold text-white">Dark variant</p>
            <p class="w-full pb-8 text-sm tracking-wide leading-tight text-white">Card layouts can vary to support the types of content they contain. The following elements are commonly found among that variety.</p>
            <div class="rounded mr-auto">
              <div class="opacity-95 border rounded-lg border-white px-4">
                <p class="m-auto inset-0 text-sm font-medium leading-normal text-center text-white py-2">Buy Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerInbox