import React, { useState } from 'react';

import { Container, Stack, Typography } from '@mui/material';
import BookingDataDisplay from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsDisplay/MyBookingsDataWrapper/MyBookingsDataWrapper';

const MyBookingsDisply = () => {
  const [expand, setExpand] = useState<boolean>(false);

  const handleChangeExpand = () => {
    setExpand(!expand);
  };

  return (
    <Container
      className='rounded-[40px] hover:drop-shadow-2xl z-10 w-[500px] absolute top-52 bg-bgWhite cursor-pointer '
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
        {expand && <BookingDataDisplay />}
      </Stack>
    </Container>
  );
};

export default MyBookingsDisply;
