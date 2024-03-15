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
        name="myBookings"
        options={{
          title: 'Applications',
          tabBarActiveTintColor: '#155e75',
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="profile"
              size={24}
              color={focused ? '#155e75' : 'grey'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myProfile"
        // remove initial params once done!
        // initialParams={{ username: '+436764105889' }}
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
