import React from 'react';
import { Text } from 'react-native';

function BookingStatusDisplay(props) {
  const bookingStatus =
    props.status[0] + props.status.slice(1).toLowerCase().replace('_', ' ');
  switch (bookingStatus) {
    case 'In review':
      return (
        <Text className="text-yellow-700 opacity-50 font-bold">In review</Text>
      );
    case 'Rejected':
      return (
        <Text className="text-gray-700 opacity-50 font-bold">Rejected</Text>
      );
    case 'Offer':
      return <Text className="text-blue-700 opacity-50 font-bold">Offer</Text>;
    case 'Hired':
      return <Text className="text-green-700 opacity-50 font-bold">Hired</Text>;
    case 'Cancelled':
      return (
        <Text className="text-gray-700 opacity-50 font-bold">Cancelled</Text>
      );
    case 'Declined':
      return (
        <Text className="text-gray-700 opacity-50 font-bold">Declined</Text>
      );
    default:
      return <Text>Invalid status</Text>;
  }
}

export default BookingStatusDisplay;
