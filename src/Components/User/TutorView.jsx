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
  useEffect(() => {
    api.get(`/users/user-tutor/${id}/`)
      .then((response) => {
        setProfileData(response.data.profile);
        setSkillData(response.data.skills);
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
                        alt="Tutor"
                      />
                      {profileData.tutor && (
                        <>
                          <h1 className="text-xl font-bold">{profileData.tutor.username}</h1>
                          <p className="text-gray-600">{profileData.title}</p>
                          <p className={profileData.tutor.is_active ? "text-green-500" : "text-red-500"}>
                            {profileData.tutor.is_active ? "Active" : "Not Active"}
                          </p>
                        </>
                      )}

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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default TutorView;
