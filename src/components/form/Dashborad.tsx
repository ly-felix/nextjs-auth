'use client'
import React, { useState, useEffect } from 'react';

function Dashboard({ email }: { email: any }) {
    // 状态变量
    const [dashboardData , setdashboardData] = useState();

    // 模拟获取数据的副作用
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("/api/dashboard", {
              method: "POST",
              body: JSON.stringify({ email: email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            setdashboardData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      console.log(dashboardData)
    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="data-container">
                <div className="data">
                    <h2>Users</h2>
                    <p>{}</p>
                </div>
                <div className="data">
                    <h2>Orders</h2>
                    <p>{}</p>
                </div>
                <div className="data">
                    <h2>Revenue</h2>
                    <p>{}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
