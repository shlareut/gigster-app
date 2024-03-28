'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { geoCoder } from '../../../utils/geoCoder';
import Button from '../../components/Button';
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
  const [country, setCountry] = useState('Austria');
  const [description, setDescription] = useState('');
  const router = useRouter();

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
    const stationRequest = await fetch(`./../api/nearbyStation`, {
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
    const listing = await fetch(`./../api/listings`, {
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
        <h1 className={styles.title}>Create location</h1>
        <div className={styles.form}>
          <p className={styles.subTitle}>
            Step 1: enter address to get nearest public transport station.
          </p>
          <div className={styles.inputDetails}>
            <label className={styles.input}>
              Address
              <input
                value={address}
                onChange={(event) => {
                  const newAddress = event.currentTarget.value;
                  setAddress(newAddress);
                }}
              />
            </label>
            <label className={styles.input}>
              Postal code
              <input
                value={postalCode}
                onChange={(event) => {
                  const newPostalCode = event.currentTarget.value;
                  setPostalCode(newPostalCode);
                }}
              />
            </label>
            <label className={styles.input}>
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
              {!station
                ? '❌ No station found.'
                : `✓ ${station.name} ${station.type}, ${station.distance}m away.`}
            </div>
            <div>
              <Button onClick={getNearestStation}>Fetch nearest station</Button>
            </div>
          </div>
          <form
            onSubmit={(event) => {
              alert('Listing created!');
              event.preventDefault();
              createListing();
              router.push('/pages/manageListings');
            }}
          >
            <p className={styles.subTitle}>Step 2: enter location details.</p>
            <div className={styles.inputDetails}>
              <label className={styles.input}>
                Name{' '}
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
              </label>
              <label className={styles.input}>
                Type{' '}
                <input
                  required
                  value={type}
                  onChange={(event) => setType(event.currentTarget.value)}
                />
              </label>
              <label className={styles.input}>
                Address line 1<input required disabled={true} value={address} />
              </label>
              <label className={styles.input}>
                Address line 2{' '}
                <input
                  value={address2}
                  onChange={(event) => setAddress2(event.currentTarget.value)}
                />
              </label>
              <label className={styles.input}>
                Postal code{' '}
                <input required disabled={true} value={postalCode} />
              </label>
              <label className={styles.input}>
                City <input required disabled={true} value={city} />
              </label>
              <label className={styles.input}>
                City district{' '}
                <input
                  required
                  value={district}
                  onChange={(event) => setDistrict(event.currentTarget.value)}
                />
              </label>
              <label className={styles.input}>
                Country{' '}
                <input
                  required
                  disabled={true}
                  value={country}
                  onChange={(event) => setCountry(event.currentTarget.value)}
                />
              </label>
              <label className={styles.input}>
                Lat <input required disabled={true} value={lat} />
              </label>
              <label className={styles.input}>
                Long <input required disabled={true} value={long} />
              </label>
              <label className={styles.input}>
                Nearest station type{' '}
                <input required disabled={true} value={station?.type} />
              </label>
              <label className={styles.input}>
                Nearest station name{' '}
                <input required disabled={true} value={station?.name} />
              </label>
              <label className={styles.input}>
                Nearest station distance{' '}
                <input required disabled={true} value={station?.distance} />
              </label>
              <label className={styles.input}>
                Description{' '}
                <input
                  required
                  value={description}
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
                />
              </label>
            </div>
            <Button type="submit">Create location</Button>
          </form>
        </div>
      </div>
    </>
  );
}
