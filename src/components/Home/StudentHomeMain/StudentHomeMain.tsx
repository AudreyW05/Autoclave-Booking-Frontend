import React, { useState } from 'react';

import { Grid } from '@mui/material';

import AutoclaveWrapper from '@/components/Home/StudentHomeMain/Autoclave/AutoclaveWrapper';
import MyBookingsWrapper from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsWrapper';
import BookingModal from './BookingModal/BookingModal';

const StudentHomeMain = () => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenBookingModal(false);
  };

  const handleOpenModal = () => {
    setOpenBookingModal(true);
  };

  return (
    <Grid container direction='row' className='h-screen'>
      <BookingModal openState={openBookingModal} handleCloseModal={handleCloseModal} />
      <AutoclaveWrapper handleOpenModal={handleOpenModal} />
      <MyBookingsWrapper />
    </Grid>
  );
};

export default StudentHomeMain;
