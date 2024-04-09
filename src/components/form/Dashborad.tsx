"use client";
import React, { useState, useEffect } from "react";
interface DashboardData {
  body: {
    createdAt: string;
    loginCount: string;
    lastActiveSession: string;
    totalUsers: string;
    totalUsersActiveToday: string;
    totalUsersActive7day: string;
  };
}
function Dashboard({ email }: { email: any }) {
  const [dashboardData, setdashboardData] = useState<
    DashboardData | undefined
  >();

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
  // console.log(dashboardData?.body.createdAt);
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="data-container">
        <div className="data">
          <h2>Timestamp of user sign up: {dashboardData?.body.createdAt}</h2>
        </div>
        <div className="data">
          <h2>Number of times logged in: {dashboardData?.body.loginCount}</h2>
        </div>
        <div className="data">
          <h2>
            Timestamp of the last user session:{" "}
            {dashboardData?.body.lastActiveSession}
          </h2>
        </div>

        <div className="data">
          <h2>
            Total number of users who have signed up:{" "}
            {dashboardData?.body.totalUsers}
          </h2>
        </div>
        <div className="data">
          <h2>
            Total number of users with active sessions today:{" "}
            {dashboardData?.body.totalUsersActiveToday}
          </h2>
        </div>
        <div className="data">
          <h2>
            Average number of active session users in the last 7 days rolling:{" "}
            {dashboardData?.body.totalUsersActive7day}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
