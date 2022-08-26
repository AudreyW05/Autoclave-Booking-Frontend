import React from 'react';
import loadingGif from '@/assets/Loading.gif';
import { Stack } from '@mui/material';

const Loading = () => {
  return (
    <div className='w-full h-5/6 flex justify-center items-center'>
      <Stack>
        <img className='pt-10' src={loadingGif} />
        <p className='font-Inter italic'>Loading...</p>
      </Stack>
    </div>
  );
};

export default Loading;
