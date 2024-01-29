import React, { useState, useEffect } from 'react';
import UserSidebar from './UserSidebar';

import { useSelector } from 'react-redux';
import api from '../../../api/axiosConfig';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [progressOrders, setProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [selected, setSelected] = useState('pending');
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

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
    switch (selected) {
      case 'pending':
        return pendingOrders;
      case 'progress':
        return progressOrders;
      case 'completed':
        return completedOrders;
      case 'cancelled':
        return cancelledOrders;
      default:
        return pendingOrders;
    }
  }

  const LinkComponent = ({ id }) => {
    let userActions = [];
    if (selected === 'pending') {
      userActions = ["edit", "cancel"];
    }
    if (selected === 'progress') {
      userActions = ["accept", "cancel"];
    }
    if(selected === "completed"){
      userActions = ["upload files"]
    }

    return (
      <Link
        to={`/user/job-details/${id}`}
        state={{ userActions: userActions }}
        className="text-indigo-600 hover:text-indigo-900"
      >
        {"view, " + userActions.join(', ')}
      </Link>
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

  return (
    <div>
      <UserSidebar />
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">

        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <div className="flex flex-row justify-around items-center py-2 mb-4 w-1/2 mx-auto border rounded-lg border-2">
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'pending' ? 'bg-blue-500' : ''}`} onClick={() => setSelected('pending')}>
            <span className="text-lg font-bold mb-2">Pending</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'progress' ? 'bg-blue-500' : ''}`} onClick={() => setSelected('progress')}>
            <span className="text-lg font-bold mb-2">In Progress</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'completed' ? 'bg-blue-500' : ''}`} onClick={() => setSelected('completed')}>
            <span className="text-lg font-bold mb-2">Completed</span>
          </div>
          <div className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === 'cancelled' ? 'bg-blue-500' : ''}`} onClick={() => setSelected('cancelled')}>
            <span className="text-lg font-bold mb-2">Cancelled</span>
          </div>
        </div>


        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created on
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completed on
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>

              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getOrders().length === 0 ? (
              <tr>
                <td colSpan="12" className="px-6 py-4 text-center">
                  {loading ? <Loader /> : 'No orders found.'}
                </td>
              </tr>
            ) : (
              getOrders().map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap"><b>{order.order_number}</b></td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.orderTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.pages}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.instructions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{createDate(order.created_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.completed_at ? createDate(order.completed_at) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{createDate(order.dueDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LinkComponent id={order.id} />
                  </td>
                  {/* Add more columns as needed */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
