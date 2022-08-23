import React from 'react';

import { ThemeProvider, createTheme, Modal, Box, Stack, Typography } from '@mui/material';

import moment from 'moment';
import BookingTimeslot from '@/components/Home/StudentHomeMain/BookingModal/Calendar/BookingForm/BookingTimeslot/BookingTimeslot';

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

type Props = {
  handleCloseModal: () => void;
  date: string;
  handleAddBooking: () => void;
};

const BookingForm = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal
        className='flex justify-center items-center'
        open={true}
        onClose={props.handleCloseModal}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        disableAutoFocus
      >
        <Box className='rounded-3xl w-[500px] h-96 pr-1 pl-6 pt-4 pb-6 bg-bgWhite shadow-[0_4px_20px_0px_rgba(0,0,0,0.25)] ring-0'>
          <Stack spacing={3}>
            <Typography className='pt-4 text-center text-[35px] font-Inter font-bold'>
              {moment(props.date).format('dddd MMMM D')}
            </Typography>
            <Stack spacing={4}>
              <BookingTimeslot
                label={'BreakTime'}
                available={true}
                handleAddBooking={props.handleAddBooking}
                handleCloseModal={props.handleCloseModal}
              />
              <BookingTimeslot
                label={'LunchTime'}
                available={false}
                handleAddBooking={props.handleAddBooking}
                handleCloseModal={props.handleCloseModal}
              />
              <BookingTimeslot
                label={'Afterschool First Hour'}
                available={false}
                handleAddBooking={props.handleAddBooking}
                handleCloseModal={props.handleCloseModal}
              />
              <BookingTimeslot
                label={'Afterschool Second Hour'}
                available={true}
                handleAddBooking={props.handleAddBooking}
                handleCloseModal={props.handleCloseModal}
              />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default BookingForm;
