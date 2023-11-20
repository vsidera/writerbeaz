import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Layout/AdminSidebar';
import api from '../../api/axiosConfig';

function AdminTransactions() {

  const [transactionData, setTransactionData] = useState([])

  useEffect(() => {
    // Fetch TransactionHistory
    api
      .get('/admin/admin-transaction-history/')
      .then((response) => {
        setTransactionData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transaction history data:', error);
      })

  }, []);

  return (
    <div>
        <AdminSidebar />
        
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="px-6 pt-6 2xl:container">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              <div className="shadow-xl rounded-lg overflow-hidden mt-10 bg-gray-200">
                <div className="py-3 px-5 font-bold text-lg">Transaction History</div>
                {transactionData && transactionData.length > 0 ? (
                  <div>
                    <p className="text-gray-800 mb-4 mx-5">
                      Total Transactions: {transactionData.length}
                    </p>
                    {transactionData.map((transaction, index) => (
                      <div key={index} className="lg:flex">
                        <div className="flex flex-col justify-between py-6 lg:mx-6">
                          <p className="text-xl font-semibold text-gray-800 dark:text-black">
                          {index + 1}. Client {transaction.user.first_name} paid ₹{transaction.total_amount.toFixed(2)} for the service "{transaction.order.gig_title}" to Tutor {transaction.tutor.first_name}.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='mx-5 mb-5 mt-5 font-semibold'>No transactions available.</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              <div className="shadow-xl rounded-lg overflow-hidden mt-10 bg-gray-200">
                <div className="py-3 px-5 font-bold text-lg">Commission History</div>
                {transactionData && transactionData.length > 0 ? (
                  <div>
                    <p className="text-gray-800 mb-4 mx-5">
                      Total Commissions: {transactionData.length}
                    </p>
                    {transactionData.map((transaction, index) => (
                      <div key={index} className="lg:flex">
                        <div className="flex flex-col justify-between py-6 lg:mx-6">
                          <p className="text-xl font-semibold text-gray-800 dark:text-black">
                          {index + 1}. Received ₹{transaction.commission.toFixed(2)} Commission from {transaction.user.first_name}.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='mx-5 mb-5 mt-5 font-semibold'>No transactions available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminTransactions