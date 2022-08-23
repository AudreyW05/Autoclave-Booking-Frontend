import React from 'react';

import { Grid } from '@mui/material';

import ScienceLabImage from '@/assets/images/ScienceLab-Image.jpeg';
import MyBookingsDisply from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDisplay';

const MyBookingsWrapper = () => {
  return (
    <Grid item className='w-1/2 content-center items-center'>
      <Grid container className='justify-center'>
        <MyBookingsDisply />
        <img className='object-cover h-screen z-0' width='100%' src={ScienceLabImage} />
      </Grid>
    </Grid>
  );
};

export default MyBookingsWrapper;
