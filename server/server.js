import bcrypt from 'bcrypt';
import express from 'express';
import {
  createUser,
  getAllListings,
  getSingleListing,
  getSingleUserByUsername,
  updateUserPassword,
} from './db.js';
import { sendOTP } from './sms.js';

const app = express();
const port = 3000;
// const ip = '192.168.0.5';

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// get example

// app.get('/products', async (req, res) => {
//   const data = await getProducts();
//   res.send(data);
// });

// GET all venues
app.get('/api/listings', async (req, res) => {
  const data = await getAllListings();
  return res.send(data);
});

// GET one venue
app.get('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getSingleListing(id);
  return res.send(data[0]);
});

// POST new venue
// app.post('/api/createVenue', async (req, res) => {
//   const data = await createVenue();
//   return res.send(data);
// });

// serve hero image files
app.use('/images', express.static('public/hero_images'));

// GET one user
app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const data = await getSingleUserByUsername(username);
  if (data[0]) {
    return res.json({
      exists: true,
      message: 'User already exists. Redirect to login.',
    });
  }
  return res.json({
    exists: false,
    message: 'User does not exist. Redirect to sign-up.',
  });
});

// Send OTP SMS
app.get('/sms/otp/:phone', async (req, res) => {
  try {
    // Generate OTP
    const otp = generateOTP();
    // Encrypt generated OTP
    const otpHash = await bcrypt.hash(otp, 12);
    // Compare both
    const compareOtp = await bcrypt.compare(otp, otpHash);
    const { phone } = req.params;

    // Pass data to SMS function and wait for the result
    const data = await sendOTP(phone, otp, otpHash, compareOtp);

    // Check the success property in the result
    if (data.success) {
      // If successful, check if user exists
      const data = await getSingleUserByUsername(phone);
      if (data[0]) {
        // If existing -> update user password
        const updatedUser = await updateUserPassword(phone, otpHash);
        return res.json({
          success: true,
          exists: true,
          message: `OTP sent successfully. Password updated for: ${phone}.`,
          data,
        });
      }
      // If new -> create user
      const newUser = await createUser(phone, otpHash);
      return res.json({
        success: true,
        exists: false,
        message: `OTP sent successfully. User created: ${phone}`,
        data,
      });
      // // Lastly, send a JSON response indicating success
      // return res.json({
      //   success: true,
      //   message: 'OTP sent successfully',
      //   data,
      // });
    } else {
      // even if failure, check if user exists
      const data = await getSingleUserByUsername(phone);
      if (data[0]) {
        // If existing
        return res.json({
          success: false,
          exists: true,
          message: 'Error sending OTP. Existing user.',
          data,
        });
      }
      // If new
      return res.json({
        success: false,
        exists: false,
        message: 'Error sending OTP. New user!',
        data,
      });
      // // If there's an error, log it and send a JSON response indicating failure
      // console.error('Error sending OTP', data);
      // return res.json({ success: false, message: 'OTP sending failed', data });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
});

// Generate OTP function
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
