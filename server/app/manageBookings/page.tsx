'use client';

import { useEffect, useState } from 'react';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllBookings = async () => {
      setIsLoading(true);
      const bookingsRequest = await fetch(`./api/bookings`).catch(
        console.error,
      );
      const bookingsResponse = await bookingsRequest.json();
      setBookings(bookingsResponse);
      console.log('Bookings fetched!');
      setIsLoading(false);
    };
    getAllBookings();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div>Manage Bookings</div>
        <ul>
          {bookings.map((item) => (
            <li>
              {item.id} {item.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
