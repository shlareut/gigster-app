import { CronJob } from 'cron';
import React from 'react';
import { getAllBookings, updateBookingStatus } from '../../database/bookings';

export default function BookingCron() {
  new CronJob(
    '*/15 * * * * *', // cronTime
    async function () {
      console.log('Booking cron executed.');
      const bookings = await getAllBookings();
      const currentTime = new Date();
      for (const booking of bookings) {
        const offerTime = new Date(booking.last_update_timestamp);
        const cutOffTime = new Date(offerTime.getTime() + 24 * 60 * 60 * 1000);
        if (booking.status === 'OFFER' && cutOffTime <= currentTime) {
          await updateBookingStatus(booking.id, 'REJECTED');
          console.log(`Offers expired: ${booking.id}`);
        }
      }
    }, // onTick
    null, // onComplete
    true, // start
    'Europe/Vienna', // timeZone
  );
}
