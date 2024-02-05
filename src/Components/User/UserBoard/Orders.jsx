import React, { useState, useEffect } from 'react';
import UserSidebar from './UserSidebar';
import { MdRemoveRedEye } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";


import { useSelector } from 'react-redux';
import api from '../../../api/axiosConfig';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';

const Order = ({ order, LinkComponent }) => {
  // statuses = pending, progress, completed, cancelled
  const Status = ({ status }) => {
    let bg = '';
    switch (status.toLowerCase()) {
      case 'pending':
        bg = 'bg-yellow-500';
        break;
      case 'progress':
        bg = 'bg-blue-500';
        break;
      case 'completed':
        bg = 'bg-green-500';
        break;
      case 'cancelled':
        bg = 'bg-red-500';
        break;
      default:
        bg = 'bg-yellow-500';
    }
    return (
      <span className={`px-3 py-1.5 text-sm font-semibold rounded-lg w-fit text-white ${bg}`}>
        {status}
      </span>
    );
  }

  const createDate = (d) => {
    //return wed 5th may 2021 12:00 am
    const date = new Date(d);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
    return `${day} ${month} ${year} ${formattedTime}`;
  }

  const getDueTime = (d) => {
    // return something like 4 days and 3 hours remaining
    const dueDate = new Date(d);
    const now = new Date();
    console.log('now', now);
    console.log('due', dueDate);
    const diff = dueDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(diff / (1000 * 60) % 60);
    if (days > 0) {
      return `${days} days and ${hours} hours remaining`;
    }
    if (hours > 0) {
      return `${hours} hours and ${minutes} minutes remaining`;
    }
    return `${minutes} minutes remaining`;
  }

  const DueOrCompleted = (status, dueDate, completedDate) => {
    if (status.toLowerCase() === 'completed') {
      return "Completed on " + createDate(completedDate);
    }
    return "Due on " + createDate(dueDate);
  }

  return (
    <div className='shadow-custom rounded my-6 p-4 flex flex-row justify-between items-start'>
      <div className='w-full md:w-1/3'>
        <h2 className="text-xl font-bold">{order.orderTitle}</h2>
        <p className='text-sm text-ellipsis'>{order.instructions}</p>
        <p className='text-md text-gray-400 font-bold mt-2'>{order.order_number}</p>
      </div>
      <div className='hidden md:block w-1/3'>
        <p className="text-lg">{order.subject}</p>
        <p className='text-sm'>{order.pages} pages</p>
      </div>
      <div className='h-full flex flex-col gap-4 items-center'>
        <Status status={order.status} />
        <LinkComponent id={order.id} />
        <p className='text-sm text-gray-400'>{DueOrCompleted(order.status, order.dueDate, order.completed_at)}</p>
      </div>
    </div>
  )
}

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [progressOrders, setProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [selected, setSelected] = useState('pending');
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get(`/users/job-order/`)
        const orders = response.data;
        return orders;
      }
      catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    if (user && user.user_id) {
      fetchUserOrders().then((data) => {
        let orders = data.map((order) => {
          let instructions = order.instructions;
          if (order.instructions.length > 30) {
            instructions = order.instructions.slice(0, 30) + '...';
          }

          return { ...order, instructions: instructions };
        });
        setUserOrders(orders);
        setPendingOrders(orders.filter((order) => order.status.toLowerCase() === 'pending'));
        setProgressOrders(orders.filter((order) => order.status.toLowerCase() === 'progress'));
        setCompletedOrders(orders.filter((order) => order.status.toLowerCase() === 'completed'));
        setCancelledOrders(orders.filter((order) => order.status.toLowerCase() === 'cancelled'));
        setLoading(false);
      });
    }
  }, [user]);

  const getOrders = () => {
    let orders = [];
    switch (selected) {
      case 'pending':
        orders = pendingOrders;
        break;
      case 'progress':
        orders = progressOrders;
        break;
      case 'completed':
        orders = completedOrders;
        break;
      case 'cancelled':
        orders = cancelledOrders;
        break;
      default:
        orders = pendingOrders;
    }

      // //filter orders by search
      if (search.length > 0) {
        orders = orders.filter((order) => order.orderTitle.toLowerCase().includes(search.toLowerCase()));
      }
      return orders || [];
  }

  const getUserActions = (status) => {
    let userActions = [];
    if (selected === 'pending') {
      userActions = ["edit", "cancel"];
    }
    if (selected === 'progress') {
      userActions = ["accept", "cancel"];
    }
    if (selected === "completed") {
      userActions = ["upload files"]
    }

    return userActions;
  }

  const LinkComponent = ({ id }) => {


    return (
      <Link
        to={`/user/job-details/${id}`}
        state={{ userActions: getUserActions(selected) }}
        className="text-indigo-600 hover:text-indigo-900 flex gap-2 justify-center"
      >
        <MdRemoveRedEye style={{ color: '#ffb300' }} size={15} />

        {selected === 'pending' &&
          <>
            <MdOutlineEdit fill='black' size={15}
            />
            <MdCancel fill='red' size={15} />
          </>
        }
        {selected === 'progress' &&
          <>
            <FaCheck fill='green' size={15} />
            <MdCancel fill='red' size={15} />
          </>
        }

      </Link>
    );
  }

  const SelectorLg = ({className}) => {
    return (
      <div className={"flex flex-row justify-around items-center py-2 mb-4 w-fit gap-3 mx-auto border rounded-lg border-2 " + className}>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'pending' ? 'bg-amber-600' : ''}`} onClick={() => setSelected('pending')}>
            <span className="text-lg font-bold mb-2">Pending</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'progress' ? 'bg-amber-600' : ''}`} onClick={() => setSelected('progress')}>
            <span className="text-lg font-bold mb-2">In Progress</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'completed' ? 'bg-amber-600' : ''}`} onClick={() => setSelected('completed')}>
            <span className="text-lg font-bold mb-2">Completed</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'cancelled' ? 'bg-amber-600' : ''}`} onClick={() => setSelected('cancelled')}>
            <span className="text-lg font-bold mb-2">Cancelled</span>
          </div>
        </div>
    )
  }

  const SelectorSm = ({className}) => {
    // create a select element
    return (
      <div className={"" + className}>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="px-6 py-2 rounded-lg cursor-pointer"
        >
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    );
  }




  return (
    <div className='md:flex'>
      <UserSidebar />
      <div class="ml-0 lg:ml-80 mb-6 lg:w-[50%] xl:w-[50%] 2xl:w-[50%] p-4">

        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <SelectorLg className={"hidden lg:flex"}/>
        <SelectorSm className={"lg:hidden"}/>
        <input type="text" placeholder="Search orders by title" className="w-full p-2 rounded-lg border-2 border-gray-200 " onChange={(e) => setSearch(e.target.value)} />
        {getOrders().length === 0 ? (
          <div className='flex flex-col items-center justify-center'>
            {loading ? (
              <Loader />
            ) : (
              <h2 className='text-2xl font-bold text-center'>No orders available</h2>
            )}
          </div>
        ) : (
          getOrders().map((order) => (
            <Link
              to={`/user/job-details/${order.id}`}
              state={{ userActions: getUserActions(selected) }}
              className='text-black hover:text-black'
            >
              <Order order={order} LinkComponent={LinkComponent} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
