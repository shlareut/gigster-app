import Image from 'next/image';
import { getListings } from '../../../database/listings';
import { BookingCron } from '../../../utils/cronjob';
import PageLink from '../../components/PageLink';
import styles from './page.module.scss';

export default async function ListingsScreen() {
  // should introduce a new field "offer timestamp" on the booking level // can run a cron here and check for this field
  // const job = new CronJob(
  //   '* * * * * *', // cronTime
  //   function () {
  //     console.log('You will see this message every second');
  //   }, // onTick
  //   null, // onComplete
  //   true, // start
  //   'America/Los_Angeles', // timeZone
  // );
  BookingCron();
  const listings = await getListings();
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Listings</h1>
        <PageLink to="/pages/createListing">Create listing</PageLink>
      </div>
      <div className={styles.listings}>
        {listings
          .sort((a, b) => a.id - b.id)
          .map((listing) => (
            <div className={styles.card} key={`listing-${Number(listing.id)}`}>
              <Image
                className={styles.listingImage}
                alt="listing"
                src={
                  listing.id < 7
                    ? `/hero_images/${listing.id}.jpeg`
                    : `/hero_images/placeholder.jpeg`
                }
                width={262}
                height={262}
              />
              <div className={styles.listingText}>
                <p className={styles.listingTitle}>{listing.name}</p>
                <p className={styles.listingProperties}>
                  <span className={styles.listingCondition}>
                    {listing.type}
                  </span>{' '}
                  in {listing.district}, {listing.city}
                </p>
              </div>
              {/* <div className={styles.listingPrice}>
              <p>
                From {listing.min_price}
                {listing.currency}
              </p>
            </div> */}
            </div>
          ))}
      </div>
    </>
  );
}
