import bcrypt from 'bcrypt';
import express from 'express';
import {
  createUser,
  getSingleUserByUsername,
  updateUserLastLogin,
  updateUserPassword,
} from '../database/user.js';
import generateOtp from '../utils/otpGenerator.js';
import { sendOTP } from './sms.js';

const userRouter = express.Router();

// GET one single user
userRouter.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const data = await getSingleUserByUsername(username).catch(console.error);
  if (data[0]) {
    return res.json({
      exists: true,
      message: 'User found.',
      details: data[0],
    });
  }
  return res.json({
    exists: false,
    message: 'User does not exist.',
  });
});

// Generate OTP, create new user or update existing user password.
userRouter.get('/api/users/generate_otp/:username', async (req, res) => {
  const { username } = req.params;
  const firstName: any = req.query.firstName;
  const lastName: any = req.query.lastName;
  const otp = generateOtp();
  const otpHash = await bcrypt.hash(otp, 12).catch(console.error);
  try {
    // Send SMS
    const sms = await sendOTP(username, otp).catch(console.error);
    // Check if sending was successful
    if (sms.success) {
      // Check if user is existing
      const user = await getSingleUserByUsername(username).catch(console.error);
      if (user[0]) {
        // If existing, update password
        await updateUserPassword(username, otpHash).catch(console.error);
        return res.status(200).json({
          success: true,
          existing_user: true,
          message: `OTP sent successfully. User updated.`,
        });
      } else {
        // If new user, create DB entry
        await createUser(username, otpHash, firstName, lastName).catch(
          console.error,
        );
        return res.status(200).json({
          success: true,
          existing_user: false,
          message: `OTP sent successfully. User created.`,
        });
      }
    } else {
      // If SMS sending failed, return error.
      return res.status(400).json({
        success: false,
        message: `Error sending OTP.`,
      });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
});

// Validate OTP
userRouter.get('/api/users/validate_otp/:username', async (req, res) => {
  const { username } = req.params;
  const typedOtp: any = req.query.otp;
  const user: any = await getSingleUserByUsername(username).catch(
    console.error,
  );
  const hashedOtp = user[0].password_hash;
  console.log(typedOtp, hashedOtp);
  if (user[0]) {
    // compare hashed password with typed password
    const isOtpValid = await bcrypt
      .compare(typedOtp, hashedOtp)
      .catch(console.error);
    console.log('OTP valid?:', isOtpValid);
    // check if password is correct
    if (!isOtpValid) {
      return res.status(401).json({
        success: false,
        message: `Wrong OTP: ${typedOtp}`,
      });
    } else {
      // call function to update last login
      await updateUserLastLogin(username).catch(console.error);
      // return success
      return res.status(200).json({
        success: true,
        user_id: user[0].id,
        message: `Correct OTP: ${typedOtp}`,
      });
    }
  }
  // invalid user error
  return res.status(404).json({
    success: false,
    message: `User not found!`,
  });
});

// old functions below

// // Registration // Send OTP SMS
// userRouter.get('/sms/otp/:phone', async (req, res) => {
//   try {
//     // Generate OTP
//     const otp = generateOTP();
//     // Encrypt generated OTP
//     const otpHash = await bcrypt.hash(otp, 12);
//     // Compare both
//     const compareOtp = await bcrypt.compare(otp, otpHash);
//     const { phone } = req.params;

//     // Pass data to SMS function and wait for the result
//     const data = await sendOTP(phone, otp, otpHash, compareOtp);

//     // Check the success property in the result
//     if (data.success) {
//       // If successful, check if user exists
//       const data = await getSingleUserByUsername(phone);
//       if (data[0]) {
//         // If existing -> update user password
//         const updatedUser = await updateUserPassword(phone, otpHash);
//         return res.json({
//           success: true,
//           exists: true,
//           message: `OTP sent successfully. Password updated for: ${phone}.`,
//           data,
//         });
//       }
//       // If new -> create user
//       const newUser = await createUser(phone, otpHash);
//       return res.json({
//         success: true,
//         exists: false,
//         message: `OTP sent successfully. User created: ${phone}`,
//         data,
//       });
//       // // Lastly, send a JSON response indicating success
//       // return res.json({
//       //   success: true,
//       //   message: 'OTP sent successfully',
//       //   data,
//       // });
//     } else {
//       // even if failure, check if user exists
//       const data = await getSingleUserByUsername(phone);
//       if (data[0]) {
//         // If existing
//         return res.json({
//           success: false,
//           exists: true,
//           message: 'Error sending OTP. Existing user.',
//           data,
//         });
//       }
//       // If new
//       return res.json({
//         success: false,
//         exists: false,
//         message: 'Error sending OTP. New user!',
//         data,
//       });
//       // // If there's an error, log it and send a JSON response indicating failure
//       // console.error('Error sending OTP', data);
//       // return res.json({ success: false, message: 'OTP sending failed', data });
//     }
//   } catch (error) {
//     // Handle unexpected errors
//     console.error('Unexpected error:', error);
//     return res
//       .status(500)
//       .json({ success: false, message: 'Internal server error' });
//   }
// });

// // Generate OTP function
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// Login user
// userRouter.get('/api/login/:phone', async (req, res) => {
//   const { phone } = req.params;
//   const typedOtp = req.query.otp;
//   const user = await getSingleUserByUsername(phone).catch((error) =>
//     console.log(error),
//   );
//   const hashedOtp = user[0].password_hash;
//   console.log(typedOtp, hashedOtp);
//   if (user[0]) {
//     // compare hashed password with typed password
//     const isOtpValid = await bcrypt
//       .compare(typedOtp, hashedOtp)
//       .catch((error) => console.log(error));
//     console.log(isOtpValid);
//     // check if password is correct
//     if (!isOtpValid) {
//       return res.json({
//         success: false,
//         message: `Wrong OTP: ${typedOtp}`,
//       });
//     } else {
//       // call function to set is_registered = true
//       await updateUserLastLogin(phone).catch(console.error);
//       // return success
//       return res.json({
//         success: true,
//         message: `Correct OTP: ${typedOtp}`,
//       });
//     }
//   }
//   // invalid user error
//   return res.json({
//     success: false,
//     message: `User not found!`,
//   });
// });

// end user APIs

export default userRouter;
