import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <Tabs>
        <Tabs.Screen
          // Name of the route to hide.
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            title: 'Home',
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="venues/[id]"
          options={{
            // This tab will no longer show up in the tab bar.
            title: 'Details',
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
