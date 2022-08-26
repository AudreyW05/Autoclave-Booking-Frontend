import React from 'react';

import { Grid, Box } from '@mui/material';

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
    <Grid item className='laptop:w-1/2 w-full content-center items-center'>
      <Grid container className='justify-center items-center h-screen border-2'>
        <Box className='w-1/2 h-1/2 border-2 border-black'>
          <MyBookingsDisply
            myFutureBookings={props.myFutureBookings}
            isLoading={props.isLoading}
            handleDeleteBooking={props.handleDeleteBooking}
          />
        </Box>
        <img className='object-cover h-screen z-0 fixed w-1/2' width='100%' src={ScienceLabImage} />
      </Grid>
    </Grid>
  );
};

export default MyBookingsWrapper;
