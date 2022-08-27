import React from 'react';
import BookingsLoadingGif from '@/assets/BookingsLoading.gif';
import { Stack } from '@mui/material';

const LoadingBookings = () => {
  return (
    <div className='w-full h-5/6 flex justify-center items-center'>
      <Stack>
        <img className='pt-10' src={BookingsLoadingGif} />
        <p className='font-Inter italic text-center w-full pr-6'>Loading...</p>
      </Stack>
    </div>
  );
};

export default LoadingBookings;
