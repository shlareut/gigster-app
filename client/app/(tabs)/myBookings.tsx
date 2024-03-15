import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import checkLoginStatus from '../../util/sessions';
import BookingCard from '../components/BookingCard';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function MyBookingsScreen() {
  // // define local and state variables
  // const emptyScreenImage = require('../../assets/postings.jpg');

  // //// START LOGIN SESSION CHECKING

  // // ensure login-status is checked before setting isLoaded to false
  // const [isLoginStatusChecked, setIsLoginStatusChecked] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [userId, setUserId] = useState(null);

  // // check login status on every screen load
  // useFocusEffect(() => {
  //   checkLoginStatus().then((status) => {
  //     setIsLoggedIn(status.isLoggedIn);
  //     setUserId(status.userId);
  //     setIsLoginStatusChecked(true);
  //     setIsLoading(false);
  //     console.log('LOGIN STATUS:', status.isLoggedIn);
  //   });
  // });

  // //// END LOGIN SESSION CHECKING

  // // loading screen
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  // if (isLoggedIn) {
  //   // logged-in screen
  //   return (
  //     <View className="flex-1 bg-white">
  //       <View className="my-3">
  //         <BookingCard />
  //         <BookingCard />
  //       </View>
  //     </View>
  //   );
  // } else {
  //   // non-logged-in screen
  //   return (
  //     <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
  //       <Image className="w-48 h-48 mb-10" source={emptyScreenImage} />
  //       <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
  //         Log in to view
  //       </CustomButton>
  //     </View>
  //   );
  // }
  // DELETE ABOVE ONCE IT WORKS!

  // define local and state variables
  const emptyScreenImage = require('../../assets/bookings.jpg');
  const [bookings, setBookings] = useState([]);

  // helper to re-trigger useEffect
  const local = useLocalSearchParams();
  const helperToTriggerUseEffect = local.helperToTriggerUseEffect;
  console.log('REFRESH HELPER:', helperToTriggerUseEffect);

  //// START LOGIN SESSION CHECKING

  // ensure login-status is checked before setting isLoaded to false
  const [isLoginStatusChecked, setIsLoginStatusChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // check login status on every screen load
  useFocusEffect(() => {
    checkLoginStatus().then((status) => {
      setIsLoggedIn(status.isLoggedIn);
      setUserId(status.userId);
      setIsLoginStatusChecked(true);
      console.log('LOGIN STATUS:', status.isLoggedIn);
    });
  });

  //// END LOGIN SESSION CHECKING

  // call user-details api upon "userId" change
  useEffect(() => {
    if (isLoginStatusChecked) {
      const queryUserBookings = async () => {
        setIsLoading(true);
        const userBookingsRequest = await fetch(
          `${nextHost}/api/users/id/${userId}/bookings`,
        );
        const userBookingsResponse = await userBookingsRequest.json();
        setBookings(userBookingsResponse);
        setIsLoading(false);
      };
      if (userId) {
        queryUserBookings();
      } else {
        setBookings([]);
        setIsLoading(false);
      }
    }
  }, [userId, isLoginStatusChecked, helperToTriggerUseEffect]);

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  // logged-in or non-logged-in rendering
  if (bookings && isLoggedIn) {
    return (
      <View className="flex-1 bg-white">
        {bookings.length > 0 ? (
          <FlatList
            className="w-screen mb-10"
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
        {/* <View className="my-3">
          <BookingCard />
          <BookingCard />
        </View> */}
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
