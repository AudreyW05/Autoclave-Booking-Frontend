import React, { useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { EventClickArg } from '@fullcalendar/react';

import DeleteAlert from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/DeleteAlert/DeleteAlert';

type Props = {
  eventData: EventClickArg;
};

const EventDisplay = ({ eventData }: Props) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Grid container>
        <Grid item className='w-11/12'>
          <Stack direction='row' spacing={3}>
            <Typography className='font-bold w-52'>{eventData.event.extendedProps.time}</Typography>
            <Typography>{`booked by: ${eventData.event.extendedProps.userId}`}</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Typography className='text-dulwichRed hover:underline' onClick={handleAlertOpen}>
            DELETE
          </Typography>
        </Grid>
      </Grid>
      <DeleteAlert openAlert={openAlert} handleAlertClose={handleAlertClose} />
    </>
  );
};

export default EventDisplay;
