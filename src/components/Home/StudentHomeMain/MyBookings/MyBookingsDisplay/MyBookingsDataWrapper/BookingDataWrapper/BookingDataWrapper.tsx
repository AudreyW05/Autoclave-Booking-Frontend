import React, { useState } from 'react';
import Moment from 'react-moment';

import { Stack, Grid, Typography } from '@mui/material';

import DeleteAlert from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/DeleteAlert/DeleteAlert';
import { BookingData } from '@/modules/bookings/types';

type Props = {
  bookingData: BookingData;
  handleDeleteBooking: (uuid: string) => void;
};

const BookingDataWrapper = (props: Props) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Stack className='px-8' spacing={0.5}>
        <Grid container>
          <Grid item className='w-3/4'>
            <Moment className='font-semibold text-lg' format='dddd, MMMM D'>
              {props.bookingData.date}
            </Moment>
          </Grid>
          <Grid item className='w-1/4'>
            <Typography
              onClick={() => {
                handleAlertOpen();
              }}
              className='text-dulwichRed float-right hover:underline font-inter'
            >
              REMOVE
            </Typography>
          </Grid>
        </Grid>
        <Typography className='pl-10'>{props.bookingData.timeslot}</Typography>
      </Stack>
      <DeleteAlert
        openAlert={openAlert}
        handleAlertClose={handleAlertClose}
        handleDeleteBooking={props.handleDeleteBooking}
        bookingDataUuid={props.bookingData.uuid}
      />
    </>
  );
};

export default BookingDataWrapper;
