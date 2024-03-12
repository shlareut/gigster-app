// --> moved everything to login api

// import bcrypt from 'bcrypt';
// import { NextRequest, NextResponse } from 'next/server';
// import {
//   getSingleUserByUsername,
//   updateUserPassword,
// } from '../../../../database/users';

// // create otp // in fact that's a pre-login?!
// export async function POST(request: NextRequest) {
//   // TESTING HARDCODED
//   const otp = '123456';
//   const sms = {
//     success: true,
//   };

//   // real OTP generation
//   // disabled for testing purposes
//   // const otp = generateOtp();

//   // read request
//   const body = await request.json();

//   // encrypt otp
//   const otpHash = await bcrypt.hash(otp, 12).catch(console.error);

//   try {
//     // check if username is provided
//     if (body.username) {
//       // check db if username exists
//       const user = await getSingleUserByUsername(body.username).catch(
//         console.error,
//       );
//       if (user) {
//         // send sms here
//         // disabled for testing purposes
//         // const sms = await sendOTP(username, otp).catch(console.error);

//         // check if sms was successful
//         if (sms.success) {
//           // update user with new password
//           const updatedUser = await updateUserPassword(
//             body.username,
//             otpHash,
//           ).catch(console.error);
//           if (updatedUser) {
//             return new NextResponse(
//               JSON.stringify({
//                 success: true,
//                 message: `OTP sent via sms.`,
//               }),
//             );
//           } else {
//             return new NextResponse(
//               JSON.stringify({
//                 success: false,
//                 message: `Failed to send sms.`,
//               }),
//             );
//           }
//         } else {
//           return new NextResponse(
//             JSON.stringify({
//               success: false,
//               message: `Failed to send sms.`,
//             }),
//           );
//         }
//       } else {
//         return new NextResponse(
//           JSON.stringify({
//             success: false,
//             message: `Username not found.`,
//           }),
//         );
//       }
//     } else {
//       return new NextResponse(
//         JSON.stringify({
//           success: false,
//           message: `Username not provided.`,
//         }),
//       );
//     }
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({
//         success: false,
//         message: `Server error.`,
//       }),
//     );
//   }
// }
