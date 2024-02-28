import { AntDesign } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Venues',
          tabBarIcon: () => <AntDesign name="search1" size={24} color="grey" />,
        }}
      />
    </Tabs>
  );
};
