import React, { useState } from 'react';

import { Grid, Stack } from '@mui/material';

import ScienceLabImage from '@/assets/images/ScienceLab-Image.jpeg';
import MyBookingsDisply from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDisplay';
import AllBookingsDisplay from './AllBookingsDisplay/AllBookingsDisplay';

import { BookingData } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  myFutureBookings: BookingData[];
  isLoading: boolean;
  handleDeleteBooking: (uuid: string) => void;
  allBookings: BookingData[];
  users: UserData[];
};

const MyBookingsWrapper = (props: Props) => {
  const [myBookingsExpand, setMyBookingsExpand] = useState<boolean>(false);
  const [allBookingsExpand, setAllBookingsExpand] = useState<boolean>(false);

  const handleChangeMyBookingsExpand = () => {
    setMyBookingsExpand(!myBookingsExpand);
  };

  const handleChangeAllBookingsExpand = () => {
    setAllBookingsExpand(!allBookingsExpand);
  };

  return (
    <Grid item className='laptop:w-1/2 w-full content-center items-center h-screen relative right-0'>
      <div className='float-right h-screen w-full absolute z-0'>
        <img className='object-cover h-screen' width='100%' src={ScienceLabImage} />
      </div>
      <Grid container className='w-full h-screen items-center justify-center align-center absolute z-10'>
        <Grid item className='h-[450px]'>
          <Stack className='justify-between h-full'>
            {!allBookingsExpand && (
              <MyBookingsDisply
                myFutureBookings={props.myFutureBookings}
                isLoading={props.isLoading}
                handleDeleteBooking={props.handleDeleteBooking}
                myBookingsExpand={myBookingsExpand}
                handleChangeMyBookingsExpand={handleChangeMyBookingsExpand}
              />
            )}
            {!myBookingsExpand && (
              <AllBookingsDisplay
                myFutureBookings={props.myFutureBookings}
                isLoading={props.isLoading}
                handleDeleteBooking={props.handleDeleteBooking}
                allBookingsExpand={allBookingsExpand}
                handleChangeAllBookingsExpand={handleChangeAllBookingsExpand}
                allBookings={props.allBookings}
                users={props.users}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyBookingsWrapper;
