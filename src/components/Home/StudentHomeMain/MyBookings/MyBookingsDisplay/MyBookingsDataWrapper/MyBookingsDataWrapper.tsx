import React from 'react';

import { Stack, Typography } from '@mui/material';

import BookingDataWrapper from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDataWrapper/BookingDataWrapper/BookingDataWrapper';
import { BookingData } from '@/modules/bookings/types';
import Loading from '@/components/Loading/Loading';

type Props = {
  myFutureBookings: BookingData[];
  isLoading: boolean;
  handleDeleteBooking: (uuid: string) => void;
};

const MyBookingsDataWrapper = (props: Props) => {
  return (
    <>
      {props.isLoading ? (
        <Loading />
      ) : props.myFutureBookings.length !== 0 ? (
        <Stack className='max-h-80 overflow-auto' spacing={3}>
          {props.myFutureBookings.map(booking => (
            <BookingDataWrapper key={booking.uuid} bookingData={booking} handleDeleteBooking={props.handleDeleteBooking} />
          ))}
        </Stack>
      ) : (
        <Typography className='pl-6 text-lg'>You have no future bookings</Typography>
      )}
    </>
  );
};

export default MyBookingsDataWrapper;
