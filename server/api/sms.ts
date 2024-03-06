import dotenv from 'dotenv';
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
import twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// export async function sendOTP(phone, otp, otpHash, compareOtp) {
//   client.messages
//     .create({
//       body: `Your OTP is ${otp}. Hashed OTP: ${otpHash}. Compare: ${compareOtp}`,
//       from: '+16078004729',
//       to: `${phone}`,
//     })
//     .then((message) => {
//       console.log(message.sid);
//       return { success: true, message: 'OTP sent successfully' };
//     })
//     .catch((error) => {
//       console.error('Error:', error.code, error.message);
//       return { success: false, code: error.code, message: error.message };
//     });
// }

export async function sendOTP(username: string, otp: string) {
  try {
    const message = await client.messages.create({
      body: `Your final project OTP is ${otp}.`,
      from: '+16078004729',
      to: `${username}`,
    });

    console.log('OTP sent successfully:', message.sid);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error: any) {
    console.error('Error:', error.code, error.message);
    return { success: false, code: error.code, message: error.message };
  }
}
