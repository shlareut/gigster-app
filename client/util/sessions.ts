import { nextHost } from '../app/constants';

export default async function checkLoginStatus() {
  const sessionRequest = await fetch(`${nextHost}/api/auth/login`).catch(
    console.error,
  );
  const sessionResponse = await sessionRequest.json();
  console.log('SESSION API:', sessionResponse.message);
  return {
    isLoggedIn: sessionResponse.success,
    userId: sessionResponse.userId,
  };
}
