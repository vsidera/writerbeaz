import React, { useState, useEffect } from 'react';
import UserSidebar from './UserSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`https://backend-writerbeaz-production-bc082bae8f0e.herokuapp.com/users/job-order/${user.user_id}/`);
        return response.data;
      } catch (error) {
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

          return {...order, instructions: instructions};
        });
        setUserOrders(orders);
      });
    }
  }, [user]);

  return (
    <div>
      <UserSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Citation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spacing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Educational Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sources
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userOrders.length === 0 ? (
              <tr>
                <td colSpan="12" className="px-6 py-4 text-center">
                  No orders to display.
                </td>
              </tr>
            ) : (
              userOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.orderTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.pages}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.citation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.spacing}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.educationLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.sources}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.language}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.instructions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.dueDate}</td>
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
