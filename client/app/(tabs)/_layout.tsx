import { AntDesign } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Explore',
          tabBarActiveTintColor: '#155e75',
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={24}
              color={focused ? '#155e75' : 'grey'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarActiveTintColor: '#155e75',
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? '#155e75' : 'grey'}
            />
          ),
        }}
      />
    </Tabs>
  );
};
