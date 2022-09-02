import React from 'react';

import { Container, Stack, Typography } from '@mui/material';

import AllBookingsCalendar from '@/components/Home/StudentHomeMain/MyBookings/AllBookingsDisplay/AllBookingsCalendar/AllBookingsCalendar';

import { BookingData } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  myFutureBookings: BookingData[];
  isLoading: boolean;
  handleDeleteBooking: (uuid: string) => void;
  allBookingsExpand: boolean;
  handleChangeAllBookingsExpand: () => void;
  allBookings: BookingData[];
  users: UserData[];
};

const AllBookingsDisplay = (props: Props) => {
  return (
    <Container
      className='rounded-[40px] hover:drop-shadow-2xl z-10 w-[500px] bg-bgWhite cursor-pointer'
      style={props.allBookingsExpand ? { height: '450px' } : { height: '95px' }}
    >
      <Stack className='h-full'>
        <Typography
          className='font-Inter font-extrabold text-[35px] pt-5 pb-7 text-center'
          onClick={() => {
            props.handleChangeAllBookingsExpand();
          }}
        >
          ALL BOOKINGS
        </Typography>
        {props.allBookingsExpand && <AllBookingsCalendar allBookings={props.allBookings} users={props.users} />}
      </Stack>
    </Container>
  );
};

export default AllBookingsDisplay;
