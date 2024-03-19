'use client';

import { useState } from 'react';
import { geoCoder } from '../../utils/geoCoder';

export default function ManageListingsScreen() {
  // define state variables
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [station, setStation] = useState(null);

  // convert address into coordinates
  const getCoordinates = async () => {
    const coordinates = await geoCoder(address, postalCode, city);
    return {
      status: coordinates.status,
      lat: coordinates.lat,
      long: coordinates.long,
    };
  };

  // get nearest public transport station
  const getNearestStation = async () => {
    const coordinates = await getCoordinates();
    if (coordinates.status !== 'OK') {
      console.log('Error!');
    }
    const lat = coordinates.lat;
    const long = coordinates.long;
    const stationRequest = await fetch(`./api/nearbyStation`, {
      method: 'POST',
      body: JSON.stringify({
        lat,
        long,
      }),
    }).catch(console.error);
    const [stationResponse] = await stationRequest.json();
    setStation({
      city: stationResponse.station_city,
      type: stationResponse.station_type,
      name: stationResponse.station_name,
      distance: stationResponse.distance_in_meters,
    });
    console.log(stationResponse);
  };

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
          <div>
            {!station
              ? 'No station selected'
              : `Station: ${station.name} ${station.type}, ${station.distance}m away.`}
          </div>
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
          <button onClick={getNearestStation}>Check nearest station</button>
        </div>
      </div>
    </>
  );
}
