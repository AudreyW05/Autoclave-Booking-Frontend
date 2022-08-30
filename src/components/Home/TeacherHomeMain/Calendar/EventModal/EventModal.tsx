import React from 'react';

import moment from 'moment';

import { Modal, createTheme, Stack, ThemeProvider, Box, Input, Typography } from '@mui/material';

import { BookingData } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  bookingData: BookingData | undefined;
  handleCloseModal: () => void;
  users: UserData[];
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

const EventModal = ({ handleCloseModal, bookingData, users }: Props) => {
  return (
    <>
      {bookingData && (
        <ThemeProvider theme={theme}>
          <Modal
            className='flex justify-center items-center'
            open={true}
            onClose={handleCloseModal}
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
            disableAutoFocus
          >
            <Box className='rounded-2xl w-1/3 h-fit  bg-white shadow-[0_4px_15px_0px_rgba(0,0,0,0.25)] ring-0 py-6'>
              <Stack spacing={3} className='px-10'>
                <Typography className='text-center text-[35px] font-Inter font-bold w-full'>
                  {moment(bookingData.date).format('dddd MMMM D')}
                </Typography>
                <Typography className='text-lg font-Inter'>{`Booking Timeslot: ${bookingData.timeslot}`}</Typography>
                <Typography className='text-lg font-Inter'>{`Booked By: ${users
                  .find(user => user.id === bookingData.userId)
                  ?.email.replace('@stu.dulwich.org', '')}`}</Typography>
                <Typography className='text-lg font-Inter'>{`Teacher Supervisor: ${bookingData.supervisor}`}</Typography>
                <Typography className='text-lg font-Inter pb-4'>{`Reasoning: ${bookingData.reasoning}`}</Typography>
              </Stack>
            </Box>
          </Modal>
        </ThemeProvider>
      )}
    </>
  );
};

export default EventModal;
