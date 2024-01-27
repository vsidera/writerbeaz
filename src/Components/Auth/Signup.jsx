import React, { useState, useEffect } from 'react';
import { setUser, setEmailAddress } from '../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import OtpVerification from './OtpVerification';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBookOpen, FaUser } from 'react-icons/fa';
import logoheader from '../../images/assets/logonobg.png'



const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const [error, setError] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpVerification, setOtpVerification] = useState(false);

  const dispatch = useDispatch();
  const emailAddress = useSelector(state => state.emailAddress);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // New state for loading indicator

  

function handleClick(params) {
  navigate('/');
  
}

  useEffect(() => {
    setAllFieldsFilled(
      firstName !== '' &&
      lastName !== '' &&
      userName !== '' &&
      email !== '' &&
      phone !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      userType !== ''
    );
  }, [firstName, lastName, userName, email, phone, password, confirmPassword, userType]);

  const handleEmailChange = (value) => {
    setEmail(value);

    if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/)) {
      if (error !== 'phone' && error !== 'password' && error !== 'confirm password') {
        setError('email');
      }
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      if (error === 'email') setError('');
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);

    if (!/^\d{10}$/.test(value)) {
      if (error !== 'email' && error !== 'password' && error !== 'confirm password') {
        setError('phone');
      }
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
      if (error === 'phone') setError('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (value.length < 5) {
      if (error !== 'email' && error !== 'phone' && error !== 'confirm password') {
        setError('password');
      }
      setPasswordError('Password must be at least 5 characters');
    } else {
      setPasswordError('');
      if (error === 'password') setError('');
    }

    if (confirmPassword !== value) {
      if (error !== 'email' && error !== 'phone' && error !== 'password') {
        setError('confirm password');
      }
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      if (error === 'confirm password') setError('');
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    if (password !== value) {
      if (error !== 'email' && error !== 'phone' && error !== 'password') {
        setError('confirm password');
      }
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      if (error === 'confirm password') setError('');
    }
  };

  const handleSignup = async () => {
    try {
            setLoading(true); // Enable loading state

      const response = await api.post('/accounts/signup/', {
        
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        phone_number: phone,
        password: password,
        user_type: userType,
      });
  
      console.log('Request Payload:', {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        phone_number: phone,
        password: password,
        user_type: userType,
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 201) {
        dispatch(setUser(response.data));
        dispatch(setEmailAddress(email));
        toast.success("Registration success. Please Enter your OTP and verify your account.");
        navigate('/otp-verification');

      } else {
        toast.error("Error occurred! Please check your inputs");
      }
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error occurred! Please check your inputs');
      }
    }
    finally {
      setLoading(false); // Disable loading state, regardless of success or failure
    }
  };

  return (
    <div  className="flex min-h-screen">
        <div  className="flex flex-row w-full">
            <div style={{boxShadow:'0 0 2px',background: 'linear-gradient(to bottom ,#AD9551 , goldenrod)'}}  className='hidden lg:flex flex-r justify-between bg-gradient-to-r from-yellow-700 to-yellow-600 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
                
                <div  className='space-y-5 mb-8 text-center'>
                <h1 class="header-logo" onClick={handleClick}>WriterBeaz<FaBookOpen /> </h1>
                    <div className='w-96 h-96' style={{backgroundImage: `url(/images/Fingerprint-cuate.svg)`}}></div>
                    <p style={{fontStyle:'italic'}} className="text-lg text-center ">if you already have an account?</p>
                    <Link to="/login" >
<button class="button-30" role="button">Click To Login </button>                    </Link>
                </div>
            </div>

            <div  className="flex flex-1 flex-col items-center justify-center px-10 relative">
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
                        <Link   to="/login" className="underline font-bold text-[goldenrod] hover:text-[#AD9551]">
                            Login now
                        </Link>
                    </div>
                </div>

                <div  className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                   <div style={{background:'white', padding:'0px 30px 0px 30px', borderRadius:'5px', boxShadow:'0 0 3px'  }} >
                     <div  className="flex flex-col space-y-2 text-center">
                        <h2 style={{color:'#AD9551'}} className="text-3xl md:text-4xl font-bold" id='logn' >Register</h2>
                        <p className="text-md md:text-xl">Enter the correct <span className='font-medium text-yellow-500'>Details</span> to register as a <span className='font-medium text-yellow-500' >User</span></p>
                    </div>
                    <div className="flex flex-col max-w-md space-y-4">

                        <input style={{border:'1px solid gray'}} type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />

                        <input style={{border:'1px solid gray'}} type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />

                        <input style={{border:'1px solid gray'}} type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />

                        <input style={{border:'1px solid gray'}} type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />
                        {error === 'email' && <p className="text-xs text-red-500">{emailError}</p>}

                        <input style={{border:'1px solid gray'}} type="text" placeholder="Phone Number" value={phone} onChange={(e) => handlePhoneChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />
                        {error === 'phone' && <p className="text-xs text-red-500">{phoneError}</p>}

                        <input style={{border:'1px solid gray'}} type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />
                        {error === 'password' && <p className="text-xs text-red-500">{passwordError}</p>}
                        
                        <input style={{border:'1px solid gray'}} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm font-medium placeholder:font-normal" />
                        {error === 'confirm password' && <p className="text-xs text-red-500">{confirmPasswordError}</p>}
                        <span style={{marginBottom:'-15px'}}>Select Account Type:</span>
                        <select style={{border:'1px solid gray', color:'black'}} value={userType} onChange={(e) => setUserType(e.target.value)} 
                            className={`flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-sm ${ userType ? 'font-semibold' : 'font-normal'} ${userType === '' ? 'text-[#9ca3af]' : 'text-black'}`} >
                          {/*<option value="Tutor">Tutor</option>*/}
                            <option value="User">User</option>
                        </select>

                         <button
      style={{ background: 'linear-gradient(to right ,#AD9551 , goldenrod)' }}
      className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium ${allFieldsFilled ? 'bg-yellow-700 text-white' : ' bg-black text-white'} ${loading ? 'cursor-not-allowed opacity-25' : ''}`}
      type="submit"
      onClick={handleSignup}
      disabled={!allFieldsFilled || loading}
    >
      {loading ? "Loading..." : "Create Account"}
    </button>
                        <div className="mt-2 text-center">
                            {allFieldsFilled ? "" :<p className="text-s text-red-500">All fields are required</p>}
                        </div>
                        {/* <div className="flex justify-center items-center">
                            <span className="w-full border border-black"></span>
                            <span className="px-4">Or</span>
                            <span className="w-full border border-black"></span>
                        </div>  
                        <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                            <span className="absolute left-4">
                            </span>
                            <span>Sign in with Google</span>
                        </button> */}
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Signup;
