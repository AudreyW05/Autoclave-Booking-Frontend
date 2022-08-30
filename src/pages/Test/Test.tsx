import React from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import BookingsService from '@/api/bookings/BookingsService';
import { Button, Stack, Typography } from '@mui/material';
import { ApiData } from '@/api/ApiService';
import { isSuccess } from '@/api/ApiHandler';
import { CreateBookingData } from '@/modules/bookings/types';
import { BookingTimeslot } from '@/modules/bookings/types';

const createBookingData: CreateBookingData = {
  userId: 2,
  date: new Date(),
  timeslot: BookingTimeslot.LUNCH,
  supervisor: 'Mr. Williams',
  reasoning: 'Biology IA',
};

const Test = () => {
  const [loginStudent] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd', 1), true, true);
  const [loginTeacher] = useApi(() => AuthService.login('teacher@dulwich.org', 'asdasd', 1), true, true);
  const [loginAdmin] = useApi(() => AuthService.login('admin@dulwich.org', 'asdasd', 1), true, true);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);
  const [getAllBookings] = useApi(() => BookingsService.getAllBookings(), true, true);
  const [getOneBooking] = useApi(() => BookingsService.getBookingByUuid('0dbc8ae9-bf53'), true, true, true);
  const [getSelf] = useApi(() => BookingsService.getSelf(2), true, true);
  const [createBooking] = useApi(() => BookingsService.createBooking(createBookingData), true, true);
  const [deleteBooking] = useApi(() => BookingsService.deleteBookingByUuid('b15ed398-02a2-42d7-84dc-544b25af430b'), true, true);

  const handleButtonClick = async (func: () => Promise<ApiData & isSuccess>) => {
    const res = await func();
    if (res.isSuccess) {
      console.log(res.data);
    }
  };

  return (
    <>
      <div className='pt-6 pl-6'>
        <Typography className='pb-6' variant='h3'>
          Add your own test components below!
        </Typography>
        <Typography variant='h4'>APIs</Typography>
        <Stack spacing={2} direction='column'>
          <Typography variant='h5'>Auth</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(loginStudent)}>
              Sign In Student
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(loginTeacher)}>
              Sign In Teacher
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(loginAdmin)}>
              Sign In Admin
            </Button>
            <Button variant='contained' onClick={() => AuthService.logout()}>
              Logout
            </Button>
          </Stack>
          <Typography variant='h5'>User</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(getAllUsers)}>
              Get All Users
            </Button>
          </Stack>
          <Typography variant='h5'>Bookings</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => handleButtonClick(getAllBookings)}>
              Get All Bookings
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getOneBooking)}>
              Get One Booking
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(getSelf)}>
              Get Self
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(createBooking)}>
              Create Booking
            </Button>
            <Button variant='contained' onClick={() => handleButtonClick(deleteBooking)}>
              Delete Booking
            </Button>
          </Stack>
        </Stack>
        <br />
      </div>
    </>
  );
};

export default Test;
