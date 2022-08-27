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
    <Grid item className='laptop:w-1/2 w-full content-center items-center h-screen relative right-0'>
      <div className='float-right h-screen w-full absolute z-0'>
        <img className='object-cover h-screen' width='100%' src={ScienceLabImage} />
      </div>
      <Grid container className='w-full h-screen items-center justify-center align-center absolute z-10'>
        <Grid item className='h-[450px]'>
          <MyBookingsDisply
            myFutureBookings={props.myFutureBookings}
            isLoading={props.isLoading}
            handleDeleteBooking={props.handleDeleteBooking}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyBookingsWrapper;
