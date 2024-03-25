'use client';

import { useEffect, useState } from 'react';

export default function ManageOptionsScreen() {
  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // fetch listings for selection
  useEffect(() => {
    const getAllListings = async () => {
      setIsLoading(true);
      const listingsRequest = await fetch(`./api/listings`).catch(
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
    const option = await fetch(`./api/options`, {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div>Manage Options</div>
        <label>
          Listing:{' '}
          <select onChange={(event) => setListing(event.currentTarget.value)}>
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
        <form
          onSubmit={createOption}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label>
            Listing id: <input required value={listing} disabled={true} />
          </label>
          <label>
            Role name:{' '}
            <input
              required
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </label>
          <label>
            Price:{' '}
            <input
              required
              value={price}
              type="number"
              onChange={(event) => setPrice(event.currentTarget.value)}
            />
          </label>
          <label>
            Currency: <input required value={currency} disabled={true} />
          </label>
          <label>
            Description:{' '}
            <input
              required
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
