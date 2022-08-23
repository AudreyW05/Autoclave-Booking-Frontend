import React from 'react';

import { ThemeProvider, createTheme, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ModalWrapper from '@/components/Home/StudentHomeMain/BookingModal/ModalWrapper/ModalWrapper';
import Calendar from '@/components/Home/StudentHomeMain/BookingModal/Calendar/Calendar';

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
  openState: boolean;
  handleCloseModal: () => void;
};

const BookingModal = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalWrapper
        isOpen={props.openState}
        handleClose={props.handleCloseModal}
        bodyComponent={
          <Box className='calendarLaptop:w-5/6 calendarLaptop:h-5/6 calendarLaptop:mt-12 calendarLaptop:rounded-2xl w-full h-full px-8 pt-6 bg-white'>
            <CloseIcon onClick={props.handleCloseModal} className='float-right cursor-pointer hover:text-grayAccent' />
            <Calendar />
          </Box>
        }
      />
    </ThemeProvider>
  );
};

export default BookingModal;
