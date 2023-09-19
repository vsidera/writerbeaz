import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Layout/AdminSidebar';
import api from '../../api/axiosConfig';
import Chart from 'chart.js/auto';

function AdminDashboard() {
  const [categoryData, setCategoryData] = useState([]);
  const [gigsData, setGigsData] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0)
  const [acceptedOrders, setAcceptedOrders] = useState(0)
  const [startedOrders, setStartedOrders] = useState(0)
  const [completedOrders, setCompletedOrders] = useState(0)
  const [paymentOrders, setPaymentOrders] = useState(0)
  const [closedOrders, setClosedOrders] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [freelancersCount, setFreelancersCount] = useState(0)

  useEffect(() => {
    // Fetch CategoryData
    api
      .get('/admin/categories/')
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });

    // Fetch GigsData
    api
      .get('/admin/gigs/')
      .then((response) => {
        setGigsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching gigs data:', error);
      });

      // Fetch Count of Orders
      api
      .get('/admin/order-status/')
      .then((response) => {
        setPendingOrders(response.data.pending_orders);
        setAcceptedOrders(response.data.accepted_orders);
        setStartedOrders(response.data.started_orders);
        setCompletedOrders(response.data.completed_orders);
        setPaymentOrders(response.data.payment_orders);
        setClosedOrders(response.data.closed_orders);
      })
      .catch((error) => {
        console.error('Error fetching total amounts:', error);
      });

      // Fetch Count of Accounts
      api
      .get('/admin/account-count/')
      .then((response) => {
        setUsersCount(response.data.users);
        setFreelancersCount(response.data.freelancer);
      })
      .catch((error) => {
        console.error('Error fetching account count:', error);
      });
  }, []);

  useEffect(() => {
    if (categoryData.length > 0 && gigsData.length > 0) {
      const labels = categoryData.map((category) => category.name);
      
      const gigCounts = categoryData.map((category) => {
        const matchingGigs = gigsData.filter((gig) => gig.category.id === category.id);
        return matchingGigs.length;
      });
  
      const data = {
        labels: labels,
        datasets: [
          {
            label: "No. of Gigs",
            backgroundColor: "blue",
            borderColor: "hsl(216, 93%, 60%)",
            data: gigCounts,
          },
        ],
      };
  
      const configLineChart = {
        type: "line", data, options: { scales: { x: { ticks: { font: {
                  size: 14,
                  weight: 'bold',
                }, }, }, y: { ticks: { font: {
                  size: 14,
                  weight: 'bold',
                }, }, }, }, plugins: { legend: { labels: { font: {
                  size: 14,
                  weight: 'bold',
                }, }, }, }, }, };
  
      const chartLine = new Chart(document.getElementById("chartLine"), configLineChart);
    }
  }, [categoryData, gigsData]);


  useEffect(() => {
    if (pendingOrders > 0 || acceptedOrders > 0 || startedOrders > 0 || completedOrders > 0 ||paymentOrders > 0 || closedOrders > 0) {
      const dataPie = {
        labels: ["Pending", "Accepted", "Work Started", "Completed", "Payment Pending", "Deal Closed"],
        datasets: [
          {
            label: "Order Statuses",
            data: [pendingOrders, acceptedOrders, startedOrders, completedOrders, paymentOrders, closedOrders],
            backgroundColor: [
              "rgb(101, 143, 241)",
              "rgb(164, 101, 241)",
              "rgb(123, 115, 241)",
              "rgb(133, 105, 241)",
              "rgb(128, 128, 255)",
              "rgb(173, 216, 230)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      const configPie = {
        type: "pie",
        data: dataPie,
        options: {},
      };

      var chartPie = new Chart(document.getElementById("chartPie"), configPie);
    }
  }, [pendingOrders, startedOrders, closedOrders]);


  useEffect(() => {
    if (usersCount > 0 || freelancersCount > 0) {
      const labelsBarChart = [
        "Users",
        "Freelancers",
      ];
      const dataBarChart = {
        labels: labelsBarChart,
        datasets: [
          {
            label: "Accounts",
            backgroundColor: "rgb(75, 128, 255)",
            borderColor: "rgb(75, 128, 255)",
            data: [usersCount, freelancersCount],
          },
        ],
      };
    
      const configBarChart = {
        type: "bar", data: dataBarChart, options: { scales: { x: { ticks: { font: {
                  size: 14,
                  weight: 'bold',
                }, }, }, y: { ticks: { font: {
                  size: 14,
                  weight: 'bold',
                }, }, }, }, plugins: { legend: { labels: { font: {
                  size: 14,
                  weight: 'bold',
                }, }, }, }, }, };
      
      var chartBar = new Chart(
        document.getElementById("chartBar"),
        configBarChart
      );
    }
  }, [usersCount, freelancersCount]);

  return (
    <div>
      <AdminSidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="px-6 pt-6 2xl:container">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <div class="shadow-xl rounded-lg overflow-hidden mt-10 bg-gray-200">
              <div class="py-3 px-5 font-bold text-lg">Gigs Order Status</div>
              <canvas class="p-1 ml-40 mr-40" id="chartPie"></canvas>
            </div>
            <div class="shadow-xl rounded-lg overflow-hidden mt-10 bg-gray-200">
              <div class="py-3 px-5 font-bold text-lg">Authorized Accounts</div>
              <canvas nvas class="p-10" id="chartBar"></canvas>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <div className="shadow-xl rounded-lg overflow-hidden mt-10 bg-gray-200">
              <div className="py-3 px-5 font-bold text-lg">Categories</div>
              <canvas className="p-10" id="chartLine"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
