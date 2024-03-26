import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo/logo.jpeg';
import styles from './Navbar.module.scss';
import PageLink from './PageLink';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <div>
          {' '}
          <Link href="/">
            <Image
              className={styles.logoImage}
              alt="logo"
              src={logo}
              width={50}
            />
          </Link>
        </div>
        <div className={styles.logoText}>
          <p className={styles.logoTitle}>
            <Link href="/">Admin</Link>
          </p>
          <p className={styles.logoSubTitle}>
            <Link href="/">Dashboard</Link>
          </p>
        </div>
      </div>
      <ul className={styles.linkList}>
        {/* <li>
          <Link className="styledLink" href="/" data-test-id="products-link">
            Products
          </Link>
        </li>
        <li>
          <Link className="styledLink" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="styledLink" href="/cart" data-test-id="cart-link">
            🛒 : <span data-test-id="cart-count">{cartItems()}</span>
          </Link>
        </li> */}
        <li>
          <PageLink to="/pages/manageListings">Listings</PageLink>
        </li>
        <li>
          <PageLink to="/pages/manageOptions">Options</PageLink>
        </li>
        <li>
          <PageLink to="/pages/manageBookings">Bookings</PageLink>
        </li>
      </ul>
    </div>
  );
}
