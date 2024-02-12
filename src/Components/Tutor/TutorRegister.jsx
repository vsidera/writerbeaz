import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setEmailAddress, setUser } from '../../Redux/store';
import { FaBookOpen } from 'react-icons/fa';

function TutorRegister() {

    const navigate = useNavigate();
      const [allFieldsFilled, setAllFieldsFilled] = useState(false);

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
    const route = `/tutor/tutor-createprofile/${userId}/`;


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
                <div style={{boxShadow:'0 0 2px',background: 'linear-gradient(to bottom ,#AD9551 , goldenrod)'}}  className='hidden lg:flex flex-r justify-between bg-gradient-to-r from-yellow-700 to-yellow-600 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
                    <div  className='space-y-5 mb-8 text-center'>
                <h1 class="header-logo" >WriterBeaz<FaBookOpen /> </h1>
                    <div className='w-96 h-96' style={{backgroundImage: `url(/images/Fingerprint-cuate.svg)`}}></div>
                    <p style={{fontStyle:'italic'}} className="text-lg text-center ">Already have an account?</p>
                    <Link to="/login" >
<button class="button-30" role="button">Click To Login </button>                    </Link>
                </div>

                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
                    <div className="flex lg:hidden justify-between items-center w-full py-4">
                        <div className="flex items-center justify-start space-x-3">

                            <a
    style={{
      display: 'flex',
      textDecoration: 'none',
      textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)', // Add text shadow
    }}
    href="/"
    className="font-extrabold text-2xl text-[#121331]"
    id="write"
  >
    WriterBeaz<FaBookOpen style={{ color: '#AD9551' }} />
  </a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>Have an Account? </span>
                            <Link to="/login" className="underline font-bold text-[goldenrod] hover:text-[#AD9551]">
                                Login
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
                        <div style={{background:'white', padding:'0px 30px 0px 30px', borderRadius:'5px', boxShadow:'0 0 3px'  }} >
                        <div className="flex flex-col space-y-2 text-center">
                           <h2 style={{color:'#AD9551'}} className="text-3xl md:text-4xl font-bold" id='logn' >Register as Tutor</h2>
                            <p className="text-md md:text-xl">Fill all the <span className='font-medium text-yellow-500'>Details</span> to join as<span className='font-medium text-yellow-500' >Tutor</span></p>
                        </div>
                        <div className="flex flex-col max-w-md space-y-5">
                            <select style={{border:'1px solid gray'}}
                                value={userLevel}
                                onChange={(e) => setUserLevel(e.target.value)}
                                className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm ${
                                    userLevel ? 'font-semibold' : 'font-normal'
                                } ${userLevel === '' ? 'text-[#9ca3af]' : 'text-black'}`}
                            >
                                <option value="">Select Your Level</option>
                                <option value="fresher">Fresher</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="professional">Professional</option>
                            </select>

                            <input style={{border:'1px solid gray'}}
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal"
                            />

                            <textarea style={{border:'1px solid gray'}}
                                placeholder="About"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal"
                                rows={3}
                            />

                            <input style={{border:'1px solid gray'}}
                                type="date"
                                value={date_of_birth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal"
                            />

                            <div className="flex">
                                <div className="flex-1 pr-2">
                                    <input style={{border:'1px solid gray'}}
                                        type="text"
                                        placeholder="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-sm font-medium placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <input style={{border:'1px solid gray'}}
                                        type="text"
                                        placeholder="State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-sm font-medium placeholder:font-normal"
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-1 pr-2">
                                    <input style={{border:'1px solid gray'}}
                                        type="text"
                                        placeholder="Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-sm font-medium placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 pl-2">
                                    <input style={{border:'1px solid gray'}}
                                        type="number"
                                        placeholder="Year of Experience"
                                        value={year_of_experience}
                                        onChange={(e) => setYearOfExperience(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3 w-full border-2 border-black rounded-sm font-medium placeholder:font-normal"
                                        min={0}
                                    />
                                </div>
                            </div>

                            <input style={{border:'1px solid gray'}}
                                type="number"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal"
                            />

                            <input style={{border:'1px solid gray'}}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal"
                            />

                            <button style={{background:'linear-gradient(to right ,#AD9551 , goldenrod)', }}
                                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-black text-white"
                                type="button"
                                onClick={handleRegisterProfile}
                            >
                                Register your Profile
                            </button>
                            <div className="mt-2 text-center">
                            {allFieldsFilled ? "" :<p className="text-s text-red-500">All fields are required</p>}
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </div> </div>
      );
}

export default TutorRegister
