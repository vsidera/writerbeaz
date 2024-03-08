import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../../../api/axiosConfig';
import Loader from '../../Loader';

function Coupons() {
    const [coupons, setCoupons] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user_id) {
            getCoupons();
            getCouponCode().then(() => setLoading(false));
        }
    }, [user.user_id]);

    const getCoupons = async () => {
        try {
            const response = await api.get('/coupons/coupon/');
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    }

    const generateCoupon = async () => {
        try {
            const response = await api.post('/coupons/coupon/', {
                user_id: user.user_id
            });
            setCouponCode(response.data.code);
        } catch (error) {
            console.error('Error generating coupon:', error);
        }
    }

    const getCouponCode = async () => {
        try {
            const response = await api.get('/coupons/code/')
            if (response.data.code) {
                setCouponCode(response.data.code);
            }
        }
        catch (error) {
            console.error('Error fetching coupon code:', error);
        }
    }

    if(loading) {
        return (
            <div className='md:flex'>
                <UserSidebar />
                <div class="ml-0 lg:ml-80 mb-6 lg:w-[50%] xl:w-[50%] 2xl:w-[50%] p-4">
                    <h1 className="text-3xl font-bold mb-4">Your coupons</h1>
                    <Loader />
                </div>
            </div>
        )
    }

    return (
        <div className='md:flex'>
            <UserSidebar />
            <div class="ml-0 lg:ml-80 mb-6 lg:w-[50%] xl:w-[50%] 2xl:w-[50%] p-4">
                <h1 className="text-3xl font-bold mb-4">Your coupons</h1>
                {couponCode !== '' &&
                    <>
                    <p>Share the code with your friends and get a coupon once <br/>they place an order successfully</p>
                        Your coupon code:
                        <div className='flex justify-start items-center gap-2'>
                            <div className='py-3 px-6 border border-black rounded w-fit my-4'>
                                {couponCode}
                            </div>
                            <button className='bg-blue-500 text-white py-2 px-6 rounded' onClick={(e) => {
                                navigator.clipboard.writeText(couponCode)
                                e.target.innerText = 'copied!'
                            }
                            }>
                                copy
                            </button>
                        </div>
                    </>
                }

                {couponCode === '' &&
                    <div>
                        <p>You do not have a coupon. <br/>Click on this button to generate your coupon code. <br/>Share the code with your friends and get a coupon once <br/>they place an order successfully</p>
                        <button className='bg-blue-500 text-white py-2 px-6 rounded' onClick={() => generateCoupon()}>
                            Generate Coupon
                        </button>
                    </div>
                }


                {/* coupons */}
                <div className="mt-8">
                    {coupons.map(coupon => (
                        <div className='px-8 py-4 w-fit rounded shadow-custom'>
                            code: {coupon.code}
                            <div className="flex items-center mt-4">
                                <span key={coupon.id} className='text-white px-3 py-1 rounded mr-2 cursor-pointer bg-gray-500'>
                                    {coupon.coupon_type.value}%
                                    {/* coupon count */}
                                    <span className='rounded-full bg-white text-gray-500 px-1 ml-3'>{coupon.count}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Coupons;
