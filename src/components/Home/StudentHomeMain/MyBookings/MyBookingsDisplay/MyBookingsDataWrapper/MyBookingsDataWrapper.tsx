import React from 'react';

import { Stack } from '@mui/material';

import BookingDataWrapper from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDataWrapper/BookingDataWrapper/BookingDataWrapper';

export const dummyBookingData = [
  { uuid: 'asdfahsdfasdf', userId: 2, date: 'Monday October 10', time: 'BreakTime' },
  { uuid: 'afdgfgdsgfsdfg', userId: 2, date: 'Wednesday October 19', time: 'Afterschool First Hour' },
];

const MyBookingsDataWrapper = () => {
  return (
    <Stack className='max-h-80 overflow-auto' spacing={3}>
      {dummyBookingData.map(booking => (
        <BookingDataWrapper key={booking.uuid} bookingUuid={booking.uuid} bookingDate={booking.date} bookingTime={booking.time} />
      ))}
    </Stack>
  );
};

export default MyBookingsDataWrapper;
