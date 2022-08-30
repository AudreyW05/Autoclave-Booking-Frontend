import React, { useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { EventClickArg } from '@fullcalendar/react';

import DeleteAlert from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/DeleteAlert/DeleteAlert';

import { UserData } from '@/modules/user/types';

type Props = {
  eventData: EventClickArg;
  users: UserData[];
  handleDeleteBooking: (uuid: string) => void;
  handleRemoveHover: (val: boolean) => void;
};

const EventDisplay = (props: Props) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
    props.handleRemoveHover(false);
  };

  return (
    <>
      <Grid container>
        <Grid item className='w-full '>
          <Stack direction='row'>
            <Typography className='font-bold w-3/12 '>{props.eventData.event.extendedProps.timeslot}</Typography>
            <Typography className='w-4/12'>{`Booked by: ${props.users
              .find(user => user.id === props.eventData.event.extendedProps.userId)
              ?.email.replace('@stu.dulwich.org', '')}`}</Typography>
            <Typography className='w-4/12'>{`Teacher supervisor: ${props.eventData.event.extendedProps.supervisor}`}</Typography>
            <Typography
              className='text-dulwichRed hover:underline w-1/12 text-center'
              onMouseEnter={() => {
                props.handleRemoveHover(true);
              }}
              onMouseLeave={() => {
                openAlert ? null : props.handleRemoveHover(false);
              }}
              onClick={() => {
                handleAlertOpen();
              }}
            >
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
