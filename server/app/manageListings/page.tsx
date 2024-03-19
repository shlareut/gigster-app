'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ManageListingsScreen() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [nearestStation, setNearestStation] = useState({});
  const [stationCity, setStationCity] = useState('');
  const [stationType, setStationType] = useState('');
  const [stationName, setStationName] = useState('');
  const [stationDistance, setStationDistance] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  useEffect(() => {
    const getDistance = async () => {
      const distanceRequest = await fetch(`./api/nearbyStation`, {
        method: 'POST',
        body: JSON.stringify({
          lat,
          long,
        }),
      }).catch(console.error);
      const distanceResponse = await distanceRequest.json();
      setNearestStation(distanceResponse[0]);
      setStationCity(distanceResponse[0].station_city);
      setStationType(distanceResponse[0].station_type);
      setStationName(distanceResponse[0].station_name);
      setStationDistance(distanceResponse[0].distance_in_meters);
      console.log(distanceResponse);
    };
    getDistance();
  }, [lat, long]);
  const geoCode = async () => {
    const fetchRequest = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}%20${postalCode}%20${city}&key=AIzaSyAF5RSVyrHp91FnLqbqpy5MMmNzliJ8LHA`,
    ).catch(console.error);
    const fetchResponse = await fetchRequest.json();
    setLat(fetchResponse.results[0].geometry.location.lat);
    setLong(fetchResponse.results[0].geometry.location.lng);
    console.log(fetchResponse.results[0].geometry.location);
  };
  // const handleClick = async () => {
  //   const distanceRequest = await fetch(`./api/nearbyStation`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       lat,
  //       long,
  //     }),
  //   }).catch(console.error);
  //   const distanceResponse = await distanceRequest.json();
  //   setNearestStation(distanceResponse[0]);
  //   setStationCity(distanceResponse[0].station_city);
  //   setStationType(distanceResponse[0].station_type);
  //   setStationName(distanceResponse[0].station_name);
  //   setStationDistance(distanceResponse[0].distance_in_meters);
  //   console.log(nearestStation);
  // };
  return (
    <>
      <div>
        <div>Manage Listings:</div>
        <div>Distance checker</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
            border: 'solid 1px',
            alignContent: 'space-between',
            gap: '10px',
          }}
        >
          <label>
            Latitude
            <input value={lat} disabled={true} />
          </label>
          <label>
            Longitude
            <input value={long} disabled={true} />
          </label>
          <label>
            City
            <input value={stationCity} disabled={true} />
          </label>
          <label>
            Type
            <input value={stationType} disabled={true} />
          </label>
          <label>
            Name
            <input value={stationName} disabled={true} />
          </label>
          <label>
            Distance
            <input value={`${stationDistance}m`} disabled={true} />
          </label>
          <label>
            Address
            <input
              value={address}
              onChange={(event) => {
                const newAddress = event.currentTarget.value;
                setAddress(newAddress);
              }}
            />
          </label>
          <label>
            Postal code
            <input
              value={postalCode}
              onChange={(event) => {
                const newPostalCode = event.currentTarget.value;
                setPostalCode(newPostalCode);
              }}
            />
          </label>
          <label>
            City
            <input
              value={city}
              onChange={(event) => {
                const newCity = event.currentTarget.value;
                setCity(newCity);
              }}
            />
          </label>
        </div>
        <div>
          {/* <button onClick={handleClick}>Check distance</button> */}
          <button onClick={geoCode}>Check geocode</button>
        </div>
        {/* <div>{JSON.stringify(nearestStation)}</div> */}
      </div>
    </>
  );
}
