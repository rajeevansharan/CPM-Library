import { Redirect } from 'expo-router';

/**
 * Root index route — redirects to the login screen on app launch.
 * After authentication, the login screen navigates to /(tabs).
 */
export default function Index() {
  return <Redirect href="/login" />;
}
