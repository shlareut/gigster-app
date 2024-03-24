'use client';

import { useState } from 'react';
import { geoCoder } from '../../utils/geoCoder';
import styles from './page.module.scss';

export default function ManageListingsScreen() {
  // define state variables
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [station, setStation] = useState(null);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address2, setAddress2] = useState('');
  const [district, setDistrict] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  // convert address into coordinates
  const getCoordinates = async () => {
    const coordinates = await geoCoder(address, postalCode, city);
    setLat(coordinates.lat);
    setLong(coordinates.long);
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

  // create listing
  const createListing = async () => {
    const listing = await fetch(`./api/listings`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        type: type,
        address_line_one: address,
        address_line_two: address2,
        postal_code: postalCode,
        city: city,
        city_district: district,
        country: country,
        lat: lat,
        long: long,
        nearest_station_type: station.type,
        nearest_station_name: station.name,
        nearest_station_meter_distance: station.distance,
        description: description,
      }),
    }).catch(console.error);
    console.log(listing);
  };

  return (
    <>
      <div>
        <div>Manage Listings:</div>
        <div>Distance checker</div>
        <div className={styles.box}>
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
          <div>
            <button onClick={getNearestStation}>Check nearest station</button>
          </div>
        </div>
        <form
          onSubmit={() => {
            alert('Submitted');
            createListing();
          }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label>
            Name{' '}
            <input
              required
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </label>
          <label>
            Type{' '}
            <input
              required
              value={type}
              onChange={(event) => setType(event.currentTarget.value)}
            />
          </label>
          <label>
            Address line 1<input required disabled={true} value={address} />
          </label>
          <label>
            Address line 2{' '}
            <input
              value={address2}
              onChange={(event) => setAddress2(event.currentTarget.value)}
            />
          </label>
          <label>
            Postal code <input required disabled={true} value={postalCode} />
          </label>
          <label>
            City <input required disabled={true} value={city} />
          </label>
          <label>
            City district{' '}
            <input
              required
              value={district}
              onChange={(event) => setDistrict(event.currentTarget.value)}
            />
          </label>
          <label>
            Country{' '}
            <input
              required
              value={country}
              onChange={(event) => setCountry(event.currentTarget.value)}
            />
          </label>
          <label>
            Lat <input required disabled={true} value={lat} />
          </label>
          <label>
            Long <input required disabled={true} value={long} />
          </label>
          <label>
            Nearest station type{' '}
            <input required disabled={true} value={station?.type} />
          </label>
          <label>
            Nearest station name{' '}
            <input required disabled={true} value={station?.name} />
          </label>
          <label>
            Nearest station distance{' '}
            <input required disabled={true} value={station?.distance} />
          </label>
          <label>
            Description{' '}
            <input
              required
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div>
          <button onClick={createListing}>Create test listing</button>
        </div>
      </div>
    </>
  );
}
