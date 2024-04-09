'use client'
import { useEffect } from 'react';
import { useParams } from 'next/navigation'

function ActivateUserPage() {
  const params = useParams<{ token: string }>()
  const token = params.token
  console.log(token)

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await fetch("/api/activate", {
          method: "POST",
          body: JSON.stringify({ token: token }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to activate user');
        }
        window.location.href = '/admin';
      } catch (error) {
        console.error('Error activating user:', error);
      }
    };

    activateUser();
  }, [token]);

  return null; // or render loading indicator
}

export default ActivateUserPage;



// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";

// export const page = async ({ params }: { params: { token: string } }) => {
//   // console.log(params);
//   try {
//     const token = params.token;

//     const existingtoken = await db.activateToken.findFirst({
//       where: {
//         AND: [
//           // {
//           //   activedAt: null,
//           // },
//           // {
//           //   createdAt: {
//           //     gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
//           //   },
//           // },
//           {
//             token: token,
//           },
//         ],
//       },
//     });

//     if (!existingtoken) {
//       throw new Error("Token not found");
//     }
//     // console.log(existingtoken);
//     await db.user.update({
//       where: {
//         id: existingtoken.userId,
//       },
//       data: { active: true },
//     });

//     await db.activateToken.update({
//       where: { token },
//       data: {
//         activedAt: new Date(Date.now()),
//       },
//     });
//     // res.redirect("/sign-in");
//     return {
//       redirect: {
//         destination: "/admin",
//         permanent: false,
//       },
//     };
//   } catch (error) {
//     return <h2>Something went wrong</h2>;
//   }
// };

// export default page;
