import React, { useState } from 'react';

import { Container, Stack, Typography } from '@mui/material';

import BookingDataDisplay from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDataWrapper/MyBookingsDataWrapper';

import { BookingData } from '@/modules/bookings/types';

type Props = {
  myFutureBookings: BookingData[];
  isLoading: boolean;
  handleDeleteBooking: (uuid: string) => void;
};

const MyBookingsDisply = (props: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  const handleChangeExpand = () => {
    setExpand(!expand);
  };

  return (
    <Container
      className='rounded-[40px] hover:drop-shadow-2xl z-10 w-[500px] absolute bg-bgWhite cursor-pointer'
      style={expand ? { height: '450px' } : { height: '95px' }}
    >
      <Stack>
        <Typography
          className='font-Inter font-extrabold text-[35px] pt-5 pb-7 text-center '
          onClick={() => {
            handleChangeExpand();
          }}
        >
          MY BOOKINGS
        </Typography>
        {expand && (
          <BookingDataDisplay
            myFutureBookings={props.myFutureBookings}
            isLoading={props.isLoading}
            handleDeleteBooking={props.handleDeleteBooking}
          />
        )}
      </Stack>
    </Container>
  );
};

export default MyBookingsDisply;
