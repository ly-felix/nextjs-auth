import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// const fetcher = async (username: string) => {
//   const response = await fetch("/api/emailverifycheck", {
// method: "POST",
// headers: {
//   "Content-Type": "application/json",
// },
// body: JSON.stringify({
//   username: username,
// })})

// const checkEmailVerify = (username: string) => {
//   const {data, error} = useSWR("emailverifycheck", fetcher(username: string))
//     if (response.ok) {
//       const data = await response.json();
//   }
//   console.log(data);

//   // const response = await fetch("/api/emailverifycheck", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify({
//   //     username: username,
//   //   }),
//   // });

//   // return true;
// };

const EmailVerifyCheck = () => {
  // if (session?.user) {
  //   if (session?.user.username) {
  //     // only Email&Password User has a nonempty "username"
  //     // const checkEmailVerifed = await checkEmailVerify(session?.user.username);
  //     const checkEmailVerifed_ = true
  //     if (checkEmailVerifed_) {
  //       return (
  //         <h2 className="text-2xl">
  //           Email&Password User {session?.user.username}, please check your
  //           email and verify!
  //         </h2>
  //       );
  //     } else {
  //       return (
  //         <h2 className="text-2xl">
  //           Hello, Email&Password User {session?.user.username}!
  //         </h2>
  //       );
  //     }
  //   }

  //   if (!session?.user.username) {
  //     // only Google User has a empty "username"

  //     return (
  //       <h2 className="text-2xl">Hello, Google User{session?.user.name}!</h2>
  //     );
  //   }
  // }
  // //   console.log(session);
  return <h2>Please login to see this admin page</h2>;
};

export default EmailVerifyCheck;
