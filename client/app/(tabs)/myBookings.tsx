import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import checkLoginStatus from '../../util/sessions';
import BookingCard from '../components/BookingCard';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function MyBookingsScreen() {
  // -------------------------------------------
  // #region variables

  const emptyScreenImage = require('../../assets/bookings.jpg');
  const path = usePathname();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region check login status & do something

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('myBooking screen focussed!');
      const checkIfLoggedIn = async () => {
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            try {
              // fetch user details
              const userBookingsRequest = await fetch(
                `${nextHost}/api/users/id/${status.userId}/bookings`,
              );
              const userBookingsResponse = await userBookingsRequest.json();
              if (userBookingsResponse) {
                setBookings(userBookingsResponse);
                setIsLoading(false);
              }
            } catch (error) {
              console.error;
            }
            // console.log(status);
          } else {
            // do something if NOT logged in
            setBookings([]);
            setIsLoading(false);
          }
        } catch (error) {
          console.error;
        }
      };
      checkIfLoggedIn();
      // do something if screen is UNfocussed
      return () => {
        // console.log('myBooking screen unfocussed!');
      };
    }, []),
  );

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  // #endregion
  // -------------------------------------------

  if (bookings) {
    return (
      <View className="flex-1 bg-white">
        {bookings.length > 0 ? (
          <FlatList
            className="w-screen"
            contentContainerStyle={{ paddingBottom: 40 }}
            snapToInterval={1}
            bounces={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookingCard booking={item} />}
          />
        ) : (
          <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
            <Image className="w-48 h-48 mb-10" source={emptyScreenImage} />
            <Text className="mb-5 text-base text-gray-400">
              You don't have any applications yet.
            </Text>
            <CustomButton onPress={() => router.navigate('listings')}>
              Explore now
            </CustomButton>
          </View>
        )}
      </View>
    );
  } else {
    // if user is null, show non-logged-in screen
    return (
      <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
        <Image className="w-48 h-48 mb-10" source={emptyScreenImage} />
        <CustomButton
          onPress={() =>
            router.navigate({
              pathname: '/identify',
              params: { entryPoint: '/myBookings' },
            })
          }
        >
          Log in to view
        </CustomButton>
      </View>
    );
  }
}
