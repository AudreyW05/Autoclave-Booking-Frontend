import React from 'react';

import { Grid } from '@mui/material';

import ScienceLabImage from '@/assets/images/ScienceLab-Image.jpeg';
import MyBookingsDisply from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDisplay';

import { BookingData } from '@/modules/bookings/types';

type Props = {
  myFutureBookings: BookingData[];
  isLoading: boolean;
  handleDeleteBooking: (uuid: string) => void;
};

const MyBookingsWrapper = (props: Props) => {
  return (
    <Grid item className='w-1/2 content-center items-center'>
      <Grid container className='justify-center'>
        <MyBookingsDisply
          myFutureBookings={props.myFutureBookings}
          isLoading={props.isLoading}
          handleDeleteBooking={props.handleDeleteBooking}
        />
        <img className='object-cover h-screen z-0' width='100%' src={ScienceLabImage} />
      </Grid>
    </Grid>
  );
};

export default MyBookingsWrapper;
