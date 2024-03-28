'use client';

import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import styles from './page.module.scss';

export default function ManageBookingsScreen() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllBookings = async () => {
      setIsLoading(true);
      const bookingsRequest = await fetch(`./../api/bookings`).catch(
        console.error,
      );
      const bookingsResponse = await bookingsRequest.json();
      setBookings(bookingsResponse);
      console.log('Bookings fetched!');
      setIsLoading(false);
    };
    getAllBookings();
  }, []);

  const updateBooking = async (id: any, status: any) => {
    const updateBookingRequest = await fetch(`./../api/bookings`, {
      method: 'PATCH',
      body: JSON.stringify({
        bookingId: id,
        status: status,
      }),
    }).catch(console.error);
    const updateBookingResponse = await updateBookingRequest.json();
    if (updateBookingResponse.success) {
      console.log('Success:', updateBookingResponse.message);
    } else {
      console.log('Failed:', updateBookingResponse.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Applications</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Job title</th>
              <th>Location</th>
              <th>Applied on</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .sort((a, b) => a.id - b.id)
              .map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>
                    {booking.first_name} {booking.last_name}
                  </td>
                  <td>{booking.option_name}</td>
                  <td>{booking.listing_name}</td>
                  <td>{booking.date}</td>
                  <td>
                    {booking.status[0] +
                      booking.status.slice(1).toLowerCase().replace('_', ' ')}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        alert(`
                      Experience: ${booking.experience}
                      Message: ${booking.remarks}
                      `);
                      }}
                    >
                      View details
                    </button>
                  </td>
                  <th>
                    {booking.status === 'IN_REVIEW' ? (
                      <Button
                        onClick={() => {
                          updateBooking(booking.id, 'REJECTED');
                          alert('Applicant rejected!');
                          location.reload();
                        }}
                      >
                        Reject
                      </Button>
                    ) : (
                      ''
                    )}
                  </th>
                  <th>
                    {booking.status === 'IN_REVIEW' ? (
                      <Button
                        onClick={() => {
                          updateBooking(booking.id, 'OFFER');
                          alert('Role offered to applicant!');
                          location.reload();
                        }}
                      >
                        Offer
                      </Button>
                    ) : (
                      ''
                    )}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <ol className={styles.list}>
          {bookings.map((item) => (
            <li key={item.id} className={styles.listItem}>
              Booking: {item.id} - User: {item.user_id} - Status: {item.status}
            </li>
          ))}
        </ol> */}
      </div>
    </>
  );
}
