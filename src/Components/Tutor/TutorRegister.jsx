import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setEmailAddress, setUser } from '../../Redux/store';

function TutorRegister() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailAddress = useSelector(state => state.emailAddress);
    const user = useSelector(state => state.user);
    const authToken = useSelector(state => state.accessToken);

    const [userLevel, setUserLevel] = useState('');
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [year_of_experience, setYearOfExperience] = useState('');
    const [age, setAge] = useState('');
    const [profile_photo, setProfilePhoto] = useState(null);
    console.log(authToken)
    const userId = user.user_id;
    const route = `/tutors/tutor-createprofile/${userId}/`;


    const handleRegisterProfile = async () => {

        const formData = new FormData();
        formData.append('userLevel', userLevel);
        formData.append('title', title);
        formData.append('about', about);
        formData.append('date_of_birth', date_of_birth);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('country', country);
        formData.append('year_of_experience', year_of_experience);
        formData.append('age', age);
        formData.append('profile_photo', profile_photo);

        try {
            const response = await api.put(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
        
            if (response.status === 200) {
                navigate('/tutor');
                toast.success('Registration Success')
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed due to a network error.');
        }
    };




    return (
        <div className="flex min-h-screen">
            <div className="flex flex-row w-full">
                <div className='hidden lg:flex flex-col justify-between bg-gradient-to-r from-cyan-500 to-blue-500 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
                    <div className="flex items-center justify-start space-x-3">
                        <lord-icon
                            src="https://cdn.lordicon.com/dycatgju.json"
                            trigger="loop"
                            delay="2000"
                            colors="primary:#121331"
                            style={{ width: '50px', height: '50px' }}>
                        </lord-icon>
                        <a href="/" className="font-extrabold text-2xl text-[#121331]">writerbeaz</a>
                    </div>
                    <div className='space-y-5 mb-8 text-center'>
                    <h1 class="lg:text-3xl xl:text-4xl xl:leading-snug font-extrabold text-start">Enter your account and discover new experiences</h1>
                        <div className='w-96 h-96' style={{backgroundImage: `url(/images/log-in-girl.svg)`}}></div>
                        <p className="text-lg text-center font-semibold">Do you already have an account?</p>
                        <Link to="/login" className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-[#1d1d1d]">
                            Login now
                        </Link>
                    </div>
                </div>
    
                <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
                    <div className="flex lg:hidden justify-between items-center w-full py-4">
                        <div className="flex items-center justify-start space-x-3">
                            <lord-icon
                                src="https://cdn.lordicon.com/dycatgju.json"
                                trigger="loop"
                                delay="2000"
                                colors="primary:#121331"
                                style={{ width: '35px', height: '35px' }}>
                            </lord-icon>
                            <a href="/" className="font-extrabold text-2xl text-[#121331]">writerbeaz</a>                    
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>Have an Account? </span>
                            <Link to="/login" className="underline font-bold text-[#121331] hover:text-blue-700">
                                Login now
                            </Link>
                        </div>
                    </div>
    
                    <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
                        <div className="flex flex-col space-y-2 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">Register as Tutor</h2>
                            <p className="text-md md:text-xl">
                                Fill your <span className="font-medium">Details</span> and then become a{' '}
                                <span className="font-medium">Tutor!</span>
                            </p>
                        </div>
                        <div className="flex flex-col max-w-md space-y-5">
                            <select
                                value={userLevel}
                                onChange={(e) => setUserLevel(e.target.value)}
                                className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg ${
                                    userLevel ? 'font-semibold' : 'font-normal'
                                } ${userLevel === '' ? 'text-[#9ca3af]' : 'text-black'}`}
                            >
                                <option value="">Select Your Level</option>
                                <option value="fresher">Fresher</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="professional">Professional</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <textarea
                                placeholder="About"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                rows={3}
                            />

                            <input
                                type="date"
                                value={date_of_birth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <div className="flex">
                                <div className="flex-1 pr-2">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-1 pr-2">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <input
                                        type="number"
                                        placeholder="Year of Experience"
                                        value={year_of_experience}
                                        onChange={(e) => setYearOfExperience(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                        min={0}
                                    />
                                </div>
                            </div>

                            <input
                                type="number"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <button
                                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-black text-white"
                                type="button"
                                onClick={handleRegisterProfile}
                            >
                                Register your Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default TutorRegister