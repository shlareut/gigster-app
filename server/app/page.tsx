import { redirect } from 'next/navigation';

export default function HomeScreen() {
  redirect('/pages/manageListings');
  return <></>;
}
