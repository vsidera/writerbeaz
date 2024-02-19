import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';
import { FaBookOpen, FaUser } from 'react-icons/fa';


const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const emailAddress = useSelector(state => state.emailAddress);

    const handleOtpChange = (index, value) => {
        if (value == ''){
            setOtp(otp.slice(0, -1));
            if (index > 0) {
                let allInputs = document.querySelectorAll('input');
                allInputs[index-1].focus();
            }
        }
        if (isNaN(value)) return;
       let allInputs = document.querySelectorAll('input');
       if (index >= 0 && index < allInputs.length - 1) {
         allInputs[index+1].focus();
       }
         const otpArray = otp.split('');
            otpArray[index] = value;
            setOtp(otpArray.join(''));

    };

    useEffect(() => {
        if (!emailAddress) {
          navigate('/signup');
        }
    }, [user, navigate]);

    const handleVerifyOtp = async () => {
        try {
          const response = await api.post('/accounts/verify-otp/', {
            otp: otp,
            email: emailAddress,
          });

          if (response.status === 200) {
            setVerificationStatus('User is verified');
            toast.success('Account verified. You can now log in.');
            navigate('/login');
          } else {
            setVerificationStatus('OTP verification failed');
          }
        } catch (error) {
          console.error('OTP Verification Error:', error);
          toast.error('An error occurred during OTP verification');
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

                    <div style={{boxShadow:'0 0 3px'}} className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-bold text-3xl">
                                    <h2 style={{color:'#AD9551'}} className="text-3xl md:text-4xl font-bold" id='logn' >Verify E-mail</h2>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-black">
                                    {emailAddress && <p>We have sent a code to your email {emailAddress}</p>}
                                </div>
                            </div>

                            <div>
                                <form action="" method="post">
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">

                                            {Array.from({ length: 4 }).map((_, index) => (
                                            <div key={index} className="w-16 h-16">
                                                <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-yellow-700"
                                                type="text"
                                                maxLength="1"
                                                value={otp[index] || ''}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                />
                                            </div>
                                            ))}

                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button style={{background:'linear-gradient(to right ,#AD9551 , goldenrod)', width:'100%', color:'white' }}
                                                    className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium`}
                                                    type="button"
                                                    onClick={handleVerifyOtp}
                                                >
                                                    Verify Account<FaUser className='icon'/>
                                                </button>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-black">
                                                <p>Didn't receive the code?</p>{' '}
                                                <a
                                                    className="flex flex-row items-center text-[#AD9551]"
                                                    href="http://"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Resend
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  );
};

export default OtpVerification;
