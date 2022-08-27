import React, { useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { EventClickArg } from '@fullcalendar/react';

import DeleteAlert from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/DeleteAlert/DeleteAlert';

import { UserData } from '@/modules/user/types';

type Props = {
  eventData: EventClickArg;
  users: UserData[];
  handleDeleteBooking: (uuid: string) => void;
};

const EventDisplay = (props: Props) => {
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
        <Grid item className='w-full '>
          <Stack direction='row'>
            <Typography className='font-bold w-4/12 '>{props.eventData.event.extendedProps.timeslot}</Typography>
            <Typography className='w-7/12'>{`Booked by: ${
              props.users.find(user => user.id === props.eventData.event.extendedProps.userId)?.email
            }`}</Typography>
            <Typography className='text-dulwichRed hover:underline w-1/12' onClick={handleAlertOpen}>
              DELETE
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <DeleteAlert
        openAlert={openAlert}
        handleAlertClose={handleAlertClose}
        handleDeleteBooking={props.handleDeleteBooking}
        bookingDataUuid={props.eventData.event.extendedProps.uuid}
      />
    </>
  );
};

export default EventDisplay;
