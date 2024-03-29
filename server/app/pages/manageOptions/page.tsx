import { getAllOptions } from '../../../database/options';
import PageLink from '../../components/PageLink';
import styles from './page.module.scss';

export default async function OptionsScreen() {
  const options = await getAllOptions();
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Vacancies</h1>
        <PageLink to="/pages/createOption">Create vacancy</PageLink>
      </div>
      <ol className={styles.list}>
        {options.map((option) => (
          <li key={option.id} className={styles.listItem}>
            {option.name}, location: {option.listing_id}, hourly pay:{' '}
            {option.price} {option.currency}
          </li>
        ))}
      </ol>
    </>
  );
}
