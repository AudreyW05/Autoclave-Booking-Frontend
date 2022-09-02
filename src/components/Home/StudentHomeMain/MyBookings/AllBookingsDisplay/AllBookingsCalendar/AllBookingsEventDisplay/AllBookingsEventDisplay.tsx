import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { EventClickArg } from '@fullcalendar/react';

import { UserData } from '@/modules/user/types';

type Props = {
  eventData: EventClickArg;
  users: UserData[];
};

const AllBookingsEventDisplay = (props: Props) => {
  return (
    <>
      <Grid container>
        <Grid item className='w-full '>
          <Stack direction='row'>
            <Typography className='font-bold w-7/12'>{props.eventData.event.extendedProps.timeslot}</Typography>
            <Typography className='w-5/12 text-right'>
              {props.users.find(user => user.id === props.eventData.event.extendedProps.userId)?.email.replace('@stu.dulwich.org', '')}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AllBookingsEventDisplay;
