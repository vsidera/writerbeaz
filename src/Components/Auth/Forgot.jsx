import { FaBook, FaBookOpen, FaLockOpen, FaPen, FaUnlock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Forgot() {
    //get query params
    const navigate = useNavigate();
    const param = new URLSearchParams(window.location.search);
    const from = param.get('from');
    if (from === 'reset') {
        toast.error("Password reset was not successful. Try again!")
        param.delete('from');
    }


    const [reset, setReset] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const email = data.get('email');


        api.post('accounts/forgot/', { email })
            .then((res) => {
                setReset(true);
            }
            )
            .catch((err) => {
                toast.error("Error sending reset link. Try again!")
                e.target.email.value = "";
            });
    }


    const resend = () => {
        setReset(false);
    }


    return (
        <div className='h-screen flex'>
            <div className="flex flex-row w-full">
                <div style={{ boxShadow: '0 0 2px', background: 'linear-gradient(to bottom ,#AD9551 , goldenrod)' }} className='hidden lg:flex flex-r justify-between bg-gradient-to-r from-yellow-700 to-yellow-600 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>

                    <div className='space-y-5 mb-8 text-center'>
                        <h1 class="header-logo" onClick={() => { }} >WriterBeaz<FaBookOpen /> </h1>
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
                    {reset === true ? <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                        <div style={{ background: 'white', boxShadow: '0 0 3px ', padding: '10px 30px 30px 30px', borderRadius: '10px' }}>
                            <div className="flex flex-col space-y-2 text-center">
                                <h2 style={{ color: '#AD9551' }} className="text-3xl md:text-4xl font-bold" id='logn' >Link sent</h2>
                                <p className="text-md md:text-xl">A link has been sent to your email address. Follow instructions to complete reset password.</p>
                                <button
                                    style={{ background: 'linear-gradient(to right ,#AD9551 , goldenrod)' }}
                                    className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium text-white`}
                                    onClick={() => resend()}
                                >
                                    Resend link
                                </button>

                            </div>
                        </div>
                    </div>
                        :
                        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                            <div style={{ background: 'white', boxShadow: '0 0 3px ', padding: '10px 30px 30px 30px', borderRadius: '10px' }}> <div className="flex flex-col space-y-2 text-center">
                                <h2 style={{ color: '#AD9551' }} className="text-3xl md:text-4xl font-bold" id='logn' >Forgot your password</h2>
                                <p className="text-md md:text-xl">Enter your registered {''}<span className='font-medium text-yellow-500'>Email</span><br></br>to proceed</p>
                            </div>
                                <form className="flex flex-col max-w-md space-y-5" onSubmit={handleSubmit}>
                                    <input style={{ border: '1px solid gray' }}
                                        type="text"
                                        name='email'
                                        placeholder="Email"
                                        className="flex px-3 py-2 md:px-4 md:py-3  rounded-sm font-medium placeholder:font-normal"
                                    />
                                    <p>
                                        A link will be sent to this email address. Follow instructions to complete reset password.
                                    </p>

                                    <button
                                        style={{ background: 'linear-gradient(to right ,#AD9551 , goldenrod)' }}
                                        className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium text-white`}
                                        type="submit"
                                    >
                                        Reset password
                                    </button>
                                </form>
                                <a
                                    className='text-blue-500 hover:text-blue-700 underline float-right mt-2'
                                    href="/login"
                                >
                                    Go to login
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>


    );
}
