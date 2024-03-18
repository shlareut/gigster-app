'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [nearestStation, setNearestStation] = useState('');
  // useEffect(() => {
  //   const getDistance = async () => {
  //     const distanceRequest = await fetch(`./api/nearbyStation`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         lat,
  //         long,
  //       }),
  //     }).catch(console.error);
  //     const distanceResponse = await distanceRequest.json();
  //     console.log(distanceResponse);
  //   };
  //   getDistance();
  // }, []);
  const handleClick = async () => {
    const distanceRequest = await fetch(`./api/nearbyStation`, {
      method: 'POST',
      body: JSON.stringify({
        lat,
        long,
      }),
    }).catch(console.error);
    const distanceResponse = await distanceRequest.json();
    setNearestStation(JSON.stringify(distanceResponse[0]));
    console.log(distanceResponse);
  };
  return (
    <>
      <div>
        <div>ADMIN DASHBOARD</div>
        <div>Distance checker</div>
        <div>
          <label>
            Latitude
            <input
              value={lat}
              onChange={(event) => {
                const newLat = event.currentTarget.value;
                setLat(newLat);
              }}
            />
          </label>
          <label>
            Longitude
            <input
              value={long}
              onChange={(event) => {
                const newLong = event.currentTarget.value;
                setLong(newLong);
              }}
            />
          </label>
        </div>
        <div>
          <button onClick={handleClick}>Check distance</button>
        </div>
        <div>{nearestStation}</div>
      </div>
    </>
  );
}
