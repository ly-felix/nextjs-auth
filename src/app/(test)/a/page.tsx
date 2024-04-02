'use client'
import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import swr from "swr";


import React, { useState, useEffect } from 'react';

const Page: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/emailverifycheck");
        if (!response.ok) {
          throw new Error('获取数据失败');
        }
        const jsonData: string = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();

    // 清理函数
    return () => {
      // 如果需要的话，进行任何清理代码
    };
  }, []); // 空的依赖数组意味着这个 effect 只会在组件挂载时运行一次


  return (
    <div className="w-full">
      {error !== null ? (
        <p>错误：{error.message}</p>
      ) : (
        <p>你好 {data?.map((one: { message: any; })=>{one.message})}</p>
      )}
    </div>
  );
};

export default Page;




// const session = await getServerSession(authOptions);

      {/* <EmailVerifyCheck /> */}


// import EmailVerifyCheck from "@/components/emailverify/EmailVerfyCheck";
// const fetcher = async (username: string) => {
//   const response = await fetch("/api/emailverifycheck", {
// method: "POST",
// headers: {
//   "Content-Type": "application/json",
// },
// body: JSON.stringify({
//   username: username,
// })})