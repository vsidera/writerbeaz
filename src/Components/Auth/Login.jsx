import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { setEmailAddress } from '../../Redux/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        const response = await api.post('/accounts/signin/', {
            email: email,
            password: password,
        });

        if (response.status === 200) {
            const { email } = response.data; // Assuming the API response contains the user's email
            dispatch(setEmailAddress(email));
            toast.success('Logged in successfully.');
            navigate('/'); // Change this route to the appropriate dashboard route
        } else {
            toast.error('Login failed. Please check your credentials.');
        }
        } catch (error) {
        console.error('Login Error:', error);
        toast.error('An error occurred during login.');
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
                        <h1 className="lg:text-3xl xl:text-4xl xl:leading-snug font-extrabold text-start">Enter your account and discover new experiences</h1>
                        <div className='w-96 h-96' style={{ backgroundImage: `url(/images/log-in-girl.svg)` }}></div>
                        <p className="text-lg text-center font-semibold">Don't have an Account?</p>
                        <Link to="/signup" className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-[#1d1d1d]">
                            Register Account here
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
                            <span>Don't have Account? </span>
                            <Link to="/signup" className="underline font-bold text-[#121331] hover:text-blue-700">
                                Register now
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                        <div className="flex flex-col space-y-2 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">Login Now!</h2>
                            <p className="text-md md:text-xl">SignUp or Login to <span className='font-medium'>Hire</span> or to become <span className='font-medium'>Freelancer!</span></p>
                        </div>
                        <form className="flex flex-col max-w-md space-y-5">
                            <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />

                            <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                            />
                            <button
                            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-black text-white"
                            type="button"
                            onClick={handleLogin}
                            >
                            Login Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
