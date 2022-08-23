import React, { useState } from 'react';

import { Stack, Grid, Typography } from '@mui/material';

import DeleteAlert from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/DeleteAlert/DeleteAlert';

type Props = {
  bookingUuid: string;
  bookingDate: string;
  bookingTime: string;
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
            <Typography className='font-semibold text-lg'>{props.bookingDate}</Typography>
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
        <Typography className='pl-10'>{props.bookingTime}</Typography>
      </Stack>
      <DeleteAlert openAlert={openAlert} handleAlertClose={handleAlertClose} />
    </>
  );
};

export default BookingDataWrapper;
