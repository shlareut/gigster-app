import { AntDesign } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Explore',
          tabBarIcon: () => <AntDesign name="search1" size={24} color="grey" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <AntDesign name="user" size={24} color="grey" />,
        }}
      />
    </Tabs>
  );
};
