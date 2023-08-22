import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setEmailAddress, setUser } from '../../Redux/store';

function FreelancerRegister() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailAddress = useSelector(state => state.emailAddress);
    const user = useSelector(state => state.user);
    const authToken = useSelector(state => state.accessToken);

    const [userLevel, setUserLevel] = useState('');
    const [about, setAbout] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [yearOfExperience, setYearOfExperience] = useState('');
    const [age, setAge] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    console.log(authToken)


    const handleRegisterProfile = async () => {

        const formData = new FormData();
        formData.append('userLevel', userLevel);
        formData.append('about', about);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('country', country);
        formData.append('yearOfExperience', yearOfExperience);
        formData.append('age', age);
        formData.append('profileImage', profileImage);

        try {
            const response = await api.put('/freelancers/freelancer-createprofile/53/', formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
        
            if (response.status === 200) {
                // Registration was successful, handle accordingly
                // You can also dispatch actions to update Redux store if needed
                // Redirect the user to a success page or perform other actions
                navigate('/success');
            } else {
                // Handle registration failure (e.g., show error message)
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            // Handle any network or server errors here
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
                        <a href="/" className="font-extrabold text-2xl text-[#121331]">workX</a>
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
                            <a href="/" className="font-extrabold text-2xl text-[#121331]">workX</a>                    
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>Have an Account? </span>
                            <Link to="/login" className="underline font-bold text-[#121331] hover:text-blue-700">
                                Login now
                            </Link>
                        </div>
                    </div>
    
                    <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                        <div className="flex flex-col space-y-2 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">Register as Freelancer</h2>
                            <p className="text-md md:text-xl">Fill your <span className='font-medium'>Details</span> and then become a <span className='font-medium'>Freelancer!</span></p>
                        </div>
                        <div className="flex flex-col max-w-md space-y-5">


                            <select value={userLevel} onChange={(e) => setUserLevel(e.target.value)} 
                                className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg ${ userLevel ? 'font-semibold' : 'font-normal'} ${userLevel === '' ? 'text-[#9ca3af]' : 'text-black'}`} >
                                <option value="">Select Your Level</option>
                                <option value="fresher">Fresher</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="professional">Professional</option>
                            </select>
    
                            <textarea
                            placeholder="About"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            rows={3}
                            />
    
                            <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

    
                            <input type="text" 
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
    
                            <input type="text" 
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
    
                            <input type="text" 
                            placeholder="Coutry"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
    
                            <input
                            type="number"
                            placeholder="Year of Experience"
                            value={yearOfExperience}
                            onChange={(e) => setYearOfExperience(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            min={0}
                            />

                            
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
                            onChange={(e) => setProfileImage(e.target.files[0])}
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

export default FreelancerRegister