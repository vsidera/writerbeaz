import React from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'

function FindFreelancer() {
  return (
    <div>
        <Navbar />

        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <div class="text-center pb-12">
                <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 mt-20">
                    Find and Hire Freelancers
                </h1>
                <h2 class="text-sm sm:text-base font-bold text-blue-500 mt-3">
                    We found 1500 Freelancers offering 2300 services online.
                </h2>
            </div>

            <div class="max-w-2xl mx-auto">
                <form class="flex items-center">
                    <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search Freelancers" required />
                    </div>
                    <button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"><svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search</button>
                </form>

                <div class="flex mt-5">
                    <div class="group inline-block">
                        <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-28 sm:w-48" >
                            <span class="pr-1 font-semibold flex-1">Category</span>
                            <span>
                                <svg
                                    class="fill-current h-4 w-4 transform group-hover:-rotate-180
                                    transition duration-150 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </span>
                        </button>
                        <ul class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32" >
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Programming</li>
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Testing</li>
                        </ul>
                    </div>
                    <div class="group inline-block">
                        <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-28 sm:w-48" >
                            <span class="pr-1 font-semibold flex-1">Location</span>
                            <span>
                                <svg
                                    class="fill-current h-4 w-4 transform group-hover:-rotate-180
                                    transition duration-150 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </span>
                        </button>
                        <ul class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32" >
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Programming</li>
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Testing</li>
                        </ul>
                    </div>
                    <div class="group inline-block">
                        <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-28 sm:w-48" >
                            <span class="pr-1 font-semibold flex-1">Filter</span>
                            <span>
                                <svg
                                    class="fill-current h-4 w-4 transform group-hover:-rotate-180
                                    transition duration-150 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </span>
                        </button>
                        <ul class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32" >
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Programming</li>
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
                            <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Testing</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                <div class="w-full bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
                    <div class="mb-2">
                        <img class="object-center object-cover rounded-xl h-56 w-80" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo" />
                    </div>
                    <div class="text-center">
                        <p class="text-lg text-gray-700 font-bold">3D house plans</p>
                        <p class="text-sm text-gray-400 font-normal">Engineering & Architecture</p>
                    </div>
                    <div class="mt-2 text-base text-gray-600 font-normal w-80 sm:w-64 md:w-80">
                        <p class="mb-3">i will create 3D house plans or blueprints for your dream house. 3D house design will give you the best experience to understand how your house will look like and what are the other requirements needed.</p>
                        <div class="flex flex-wrap justify-between">
                            <p class="w-1/2">from: $500</p>
                            <div class="w-1/2 flex bg-gray-500 rounded-xl">
                                <img class="object-center object-cover rounded-xl h-8 w-8 " src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo" />
                                <p class="mt-1 mx-3 font-semibold text-sm text-white">Dany Bailey</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div class="mb-8">
                        <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo" />
                    </div>
                    <div class="text-center">
                        <p class="text-xl text-gray-700 font-bold mb-2">Lucy Carter</p>
                        <p class="text-base text-gray-400 font-normal">Graphic Designer</p>
                    </div>
                </div>
                <div class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div class="mb-8">
                        <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="photo" />
                    </div>
                    <div class="text-center">
                        <p class="text-xl text-gray-700 font-bold mb-2">Jade Bradley</p>
                        <p class="text-base text-gray-400 font-normal">Dev Ops</p>
                    </div>
                </div>
                <div class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div class="mb-8">
                        <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo" />
                    </div>
                    <div class="text-center">
                        <p class="text-xl text-gray-700 font-bold mb-2">Dany Bailey</p>
                        <p class="text-base text-gray-400 font-normal">Software Engineer</p>
                    </div>
                </div>
                <div class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div class="mb-8">
                        <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo" />
                    </div>
                    <div class="text-center">
                        <p class="text-xl text-gray-700 font-bold mb-2">Lucy Carter</p>
                        <p class="text-base text-gray-400 font-normal">Graphic Designer</p>
                    </div>
                </div>
                <div class="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div class="mb-8">
                        <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="photo" />
                    </div>
                    <div class="text-center">
                        <p class="text-xl text-gray-700 font-bold mb-2">Jade Bradley</p>
                        <p class="text-base text-gray-400 font-normal">Dev Ops</p>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
  )
}

export default FindFreelancer