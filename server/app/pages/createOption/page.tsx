'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import styles from './page.module.scss';

export default function ManageOptionsScreen() {
  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // fetch listings for selection
  useEffect(() => {
    const getAllListings = async () => {
      setIsLoading(true);
      const listingsRequest = await fetch(`./../api/listings`).catch(
        console.error,
      );
      const listingsResponse = await listingsRequest.json();
      setListings(listingsResponse);
      console.log('Listings fetched!');
      setIsLoading(false);
    };
    getAllListings();
  }, []);

  // create option function
  const createOption = async () => {
    const option = await fetch(`./../api/options`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        price: price,
        currency: currency,
        description: description,
        listing_id: listing,
      }),
    }).catch(console.error);
    console.log(listing);
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>Create vacancy</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.form}>
            <p className={styles.subTitle}>
              Step 1: select location from the dropdown.
            </p>
            <div className={styles.inputDetails}>
              <label className={styles.input}>
                Location:{' '}
                <select
                  onChange={(event) => setListing(event.currentTarget.value)}
                >
                  <option value="">--Please select--</option>
                  {listings
                    .sort((a, b) => a.id - b.id)
                    .map((listing) => (
                      <option value={listing.id}>
                        {listing.id}: {listing.name}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <form
              onSubmit={(event) => {
                alert('Option created!');
                event.preventDefault();
                createOption();
                router.push('/pages/manageOptions');
              }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <p className={styles.subTitle}>Step 2: enter vacancy details.</p>
              <div className={styles.inputDetails}>
                <label>
                  Location id:{' '}
                  <input
                    className={styles.input}
                    required
                    value={listing}
                    disabled={true}
                  />
                </label>
                <label>
                  Job title:{' '}
                  <input
                    className={styles.input}
                    required
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                  />
                </label>
                <label>
                  Hourly pay:{' '}
                  <input
                    className={styles.input}
                    required
                    value={price}
                    type="number"
                    onChange={(event) => setPrice(event.currentTarget.value)}
                  />
                </label>
                <label>
                  Currency:{' '}
                  <input
                    className={styles.input}
                    required
                    value={currency}
                    disabled={true}
                  />
                </label>
                <label>
                  Description:{' '}
                  <input
                    className={styles.input}
                    required
                    value={description}
                    onChange={(event) =>
                      setDescription(event.currentTarget.value)
                    }
                  />
                </label>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
