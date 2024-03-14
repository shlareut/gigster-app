import React from 'react';
import { Text } from 'react-native';

function BookingStatusDisplay(props) {
  const bookingStatus =
    props.status[0] + props.status.slice(1).toLowerCase().replace('_', ' ');
  switch (bookingStatus) {
    case 'In review':
      return <Text className="text-yellow-700 font-bold">In review</Text>;
    case 'Rejected':
      return <Text className="text-red-700 font-bold">Rejected</Text>;
    case 'Offer':
      return <Text className="text-green-700 font-bold">Offer</Text>;
    default:
      return <Text>Invalid status</Text>;
  }
}

export default BookingStatusDisplay;
