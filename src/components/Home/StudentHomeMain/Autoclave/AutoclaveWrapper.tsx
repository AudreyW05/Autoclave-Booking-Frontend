import React from 'react';

import { Grid } from '@mui/material';

import AutoclaveImage from '@/assets/images/Autoclave-Image.png';
import BookingButton from '@/components/Home/StudentHomeMain/Autoclave/BookingButton/BookingButton';

type Props = {
  handleOpenModal: () => void;
};

const AutoclaveWrapper = ({ handleOpenModal }: Props) => {
  return (
    <Grid item className='w-1/2 laptop:block hidden'>
      <Grid container className='justify-center flex items-end h-screen'>
        <BookingButton handleOpenModal={handleOpenModal} />
        <img className='z-0 pb-16' src={AutoclaveImage} />
      </Grid>
    </Grid>
  );
};

export default AutoclaveWrapper;
