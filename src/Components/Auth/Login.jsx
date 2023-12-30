import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { setUser, setEmailAddress, setRefreshToken, setTokenExpiry, setAccessToken } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook, FaBookOpen, FaLockOpen, FaPen, FaUnlock } from 'react-icons/fa';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailAddress = useSelector(state => state.emailAddress);
    const user = useSelector(state => state.user);
    const tokenExpiry = useSelector(state => state.tokenExpiry);
    const refreshToken = useSelector(state => state.refreshToken);
    const accessToken = useSelector(state => state.accessToken);
    const [loading, setLoading] = useState(false); // New state for loading indicator


    console.log('Stored Email in Redux:', emailAddress);
    console.log('User Details in Redux:', user);

    function handleClick(params) {
        navigate('/');
    }

    const handleLogin = async () => {
        try {
            setLoading(true); // Enable loading state


            const response = await api.post('/accounts/signin/', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const { user, access_token, refresh_token, token_expiry } = response.data;

                dispatch(setUser(user));
                dispatch(setEmailAddress(email));
                dispatch(setAccessToken(access_token));
                dispatch(setRefreshToken(refresh_token));
                dispatch(setTokenExpiry(token_expiry));
                toast.success('Logged in successfully.');
                if (user.user_type === "Admin") {
                    navigate('/admin');
                } else if (user.user_type === "User") {
                    navigate('/user');
                } else if (user.user_type === "Tutor") {
                    if (user.is_profile) {
                        navigate('/tutor');
                    } else {
                        navigate('/tutor/register');
                    }
                }

            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('An error occurred during login.');
        }
        finally {
            setLoading(false); // Disable loading state, regardless of success or failure
        }
    };


    return (
        <>
            <div className="flex min-h-screen">
                <div className="flex flex-row w-full">
                    <div style={{ boxShadow: '0 0 2px', background: 'linear-gradient(to bottom ,#AD9551 , goldenrod)' }} className='hidden lg:flex flex-r justify-between bg-gradient-to-r from-yellow-700 to-yellow-600 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>

                        <div className='space-y-5 mb-8 text-center'>
                            <h1 class="header-logo" onClick={handleClick} >WriterBeaz<FaBookOpen /> </h1>
                            <div className='w-96 h-96' style={{ backgroundImage: `url(/images/Login-cuate.svg)` }}></div>
                            <p style={{ fontStyle: 'italic' }} className="text-lg text-center ">If you already have an account?</p>
                            <Link
                                to="/signup"

                            >
                                <button class="button-30" role="button">Click to SignUp</button>
                            </Link>
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
                                    WriterBeaz<FaBookOpen style={{ color: "#AD9551" }} />
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>Don't have Account? </span>
                                <Link to="/signup" className="underline font-bold text-[goldenrod] hover:text-[#AD9551]">
                                    Register now
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                            <div style={{ background: 'white', boxShadow: '0 0 3px ', padding: '10px 30px 30px 30px', borderRadius: '10px' }}> <div className="flex flex-col space-y-2 text-center">
                                <h2 style={{ color: '#AD9551' }} className="text-3xl md:text-4xl font-bold" id='logn' >Login</h2>
                                <p className="text-md md:text-xl">Enter your registered {''}<span className='font-medium text-yellow-500'>Email</span> and <span className='font-medium text-yellow-500'>Password</span> <br></br>to proceed</p>
                            </div>
                                <form className="flex flex-col max-w-md space-y-5">
                                    <input style={{ border: '1px solid gray' }}
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3  rounded-sm font-medium placeholder:font-normal"
                                    />

                                    <input style={{ border: '1px solid gray' }}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex px-3 py-2 md:px-4 md:py-3  rounded-sm font-medium placeholder:font-normal"
                                    />
                                    <button
                                        style={{ background: 'linear-gradient(to right ,#AD9551 , goldenrod)' }}
                                        className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium text-white ${loading ? 'cursor-not-allowed opacity-25' : ''}`}
                                        type="button"
                                        onClick={handleLogin}
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Login"}
                                        <FaLockOpen className='icon' />
                                    </button>
                                </form>
                            </div></div>
                    </div>
                </div>

            </div> </>
    );
}

export default Login;
