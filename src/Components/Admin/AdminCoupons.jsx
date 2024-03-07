import api from "../../api/axiosConfig";
import AdminSidebar from "../Layout/AdminSidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddCoupon({ setCouponName, setCouponValue }) {
    return (
        <div className="flex flex-col items-center justify-between px-6 py-2.5 bg-gray-100 2xl:container">
            <div className="flex space-x-4">
                {/* coupon name is select with values new_user_coupon and invite_user_coupon */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500">Coupon Name</label>
                    <select className="w-80 h-10 px-3 text-sm border border-gray-300 rounded-lg" onChange={(e) => setCouponName(e.target.value)}>
                        <option value="new_user_coupon">New User Coupon</option>
                        <option value="invite_user_coupon">Invite User Coupon</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500">Coupon Value</label>
                    <input type="text" className="w-80 h-10 px-3 text-sm border border-gray-300 rounded-lg" onChange={(e) => setCouponValue(e.target.value)} />
                </div>
            </div>
        </div>

    )
}

function CouponList({ couponData }) {
    return (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {couponData.map((coupon, index) => (
                <div key={index} className="shadow-xl rounded-lg overflow-hidden mt-10 bg-gray-200 w-1/2 mx-auto">
                    <div className="py-3 px-5 font-bold text-lg">{coupon.name}</div>
                    <div className="py-3 px-5">
                        <p className="text-sm text-gray-500">Coupon Value: {coupon.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function AdminCoupons() {
    const [couponData, setCouponData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [couponName, setCouponName] = useState('new_user_coupon');
    const [couponValue, setCouponValue] = useState('');



    useEffect(() => {
        fetchCouponData();
    }, []);

    const fetchCouponData = async () => {
        await api
            .get('/coupons/type/')
            .then((response) => {
                setCouponData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching coupon data:', error);
            });
    }

    const handleAddCoupon = () => {
        if (!showForm) {
            setShowForm(true);
            return
        }

        if (couponName === '' || couponValue === '') {
            alert('Please fill in all fields');
            return
        }

        const data = {
            name: couponName,
            value: couponValue
        }

        api
            .post('/coupons/type/', data)
            .then((response) => {
                console.log(response.data);
                fetchCouponData();
                setShowForm(false);
            })
            .catch((error) => {
                toast.error('Error adding coupon');
            })
            .finally(() => {
                setCouponName('new_user_coupon');
                setCouponValue('');
            })

    }



    return (
        <div>
            <AdminSidebar />

            {/* User Management */}
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div className="top-0 h-16 border-b bg-white lg:py-2.5">
                    <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                        <h5 className="text-2xl text-black font-medium lg:block">Coupon management</h5>
                        <div className="flex space-x-4">
                            <div className="md:block">
                                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                                    <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                        <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                            <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CouponList couponData={couponData} />
                    <div className="flex flex-col items-center justify-between px-6 py-2.5 bg-gray-100 2xl:container">

                        {/* add coupon */}
                        {showForm ? <AddCoupon setCouponName={setCouponName} setCouponValue={setCouponValue} /> : <></>}
                        <button className="flex items-center justify-center px-4 py-2.5 text-white bg-cyan-600 rounded-lg" onClick={handleAddCoupon}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM8 10H5a1 1 0 010-2h3V5a1 1 0 012 0v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0V10z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 font-medium">{showForm ? 'save coupon' : 'Add coupon'}</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminCoupons;
