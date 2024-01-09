import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';

function TutorView(props) {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [skillData, setSkillData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [experienceData, setExperienceData] = useState({});
  const [gigData, setGigData] = useState({});

  useEffect(() => {
    api.get(`/users/user-tutor/${id}/`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api.get(`/users/user-tutor-skill/${id}/`)
      .then((response) => {
        setSkillData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api.get(`/users/user-tutor-education/${id}/`)
      .then((response) => {
        setEducationData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api.get(`/users/user-tutor-experience/${id}/`)
      .then((response) => {
        setExperienceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api.get(`/users/user-tutor-gig/${id}/`)
      .then((response) => {
        setGigData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  return (
    <div>
      <Navbar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] mt-20">
        <div className="bg-white">
          {profileData && (
            <div className="container mx-auto py-8">
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 sm:col-span-3">
                  <div className="bg-white shadow-xl rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={profileData.profile_photo}
                            className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                            alt="Profile Photo"
                        />
                        {profileData.tutor && (
                            <>
                            <h1 className="text-xl font-bold">{profileData.tutor.username}</h1>
                            <p className="text-gray-600">{profileData.title}</p>
                            </>
                        )}
                    </div>
                    <hr className="my-6 border-t border-gray-300" />
                    <div className="flex flex-col">
                      <span className="text-gray-800 uppercase font-bold tracking-wider mb-2">
                        Tutor Details
                      </span>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-700">
                          <p className="mb-2">Status:</p>
                          <p className="mb-2">Year of Experience:</p>
                          <p className="mb-2">Date of Birth:</p>
                          <p className="mb-2">Age:</p>
                          <p className="mb-2">City:</p>
                          <p className="mb-2">State:</p>
                          <p className="mb-2">Country:</p>
                        </div>
                        <div className="font-semibold">
                          <p className="mb-2">{profileData.level}</p>
                          <p className="mb-2">{profileData.year_of_experience}</p>
                          <p className="mb-2">{profileData.date_of_birth}</p>
                          <p className="mb-2">{profileData.age}</p>
                          <p className="mb-2">{profileData.city}</p>
                          <p className="mb-2">{profileData.state}</p>
                          <p className="mb-2">{profileData.country}</p>
                        </div>
                      </div>
                    </div>
                    <hr className="my-6 border-t border-gray-300" />
                    <div className="flex flex-col">
                        <span className="text-gray-800 uppercase font-bold tracking-wider mb-2">
                            Skills
                        </span>
                        <ul>
                            {Array.isArray(skillData) && skillData.map((skill) => (
                            <li key={skill.id} className="mb-2">
                                {skill.skill}
                            </li>
                            ))}
                        </ul>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-9">
                  <div className="bg-white shadow-xl rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">About Tutor</h2>
                    <p className="text-gray-700">
                      {profileData.about || ''}
                    </p>
                  </div>
                  <div className="bg-white shadow-xl rounded-lg p-6 mt-5">
                    <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
                    <>
                        {Array.isArray(educationData) && educationData.map((education) => (
                        <div className="mb-6" key={education.id}>
                            <div className="flex justify-between">
                            <span className="text-gray-600 font-bold">{education.course}</span>
                            <p>
                                <span className="text-gray-600 mr-2">{education.college}</span>
                                <span className="text-gray-600">{education.year}</span>
                            </p>
                            </div>
                        </div>
                        ))}
                    </>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 mt-5">
                        <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                        <>
                            {Array.isArray(experienceData) && experienceData.map((experience) => (
                            <div className="mb-6" key={experience.id}>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-bold">{experience.title}</span>
                                    <p>
                                        <span className="text-gray-600 mr-2">{experience.company}</span>
                                        <span className="text-gray-600">{experience.year}</span>
                                    </p>
                                </div>
                                <p className="mt-2">{experience.description}</p>
                            </div>
                            ))}
                        </>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 mt-5">
                        <h2 className="text-xl font-bold mt-6 mb-4">Live Gigs</h2>
                        <>
                        {Array.isArray(gigData) && gigData.map((gig) => (
                            <div className="mb-6" key={gig.id}>
                                <Link to={`/single-view/${gig.id}`}>
                                    <div className="flex items-center sm:flex-nowrap flex-wrap">
                                        <div className="rounded-lg overflow-hidden w-80 h-40">
                                        <img
                                            src={gig.image1}
                                            alt={gig.title}
                                            className="w-full h-full object-cover"
                                        />
                                        </div>
                                        <div className="ml-4 flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                            <span className="text-gray-600 font-bold text-lg">{gig.title}</span>
                                            <p className="text-gray-600">{gig.description}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        </>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TutorView;
