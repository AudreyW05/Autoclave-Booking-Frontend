import React from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';
import BookingsService from '@/api/bookings/BookingsService';
import { Button, Stack, Typography } from '@mui/material';
import { ApiData } from '@/api/ApiService';
import { isSuccess } from '@/api/ApiHandler';

const Test = () => {
  const [loginStudent] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd', 1), true, true);
  const [loginTeacher] = useApi(() => AuthService.login('teacher@dulwich.org', 'asdasd', 1), true, true);
  const [loginAdmin] = useApi(() => AuthService.login('admin@dulwich.org', 'asdasd', 1), true, true);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);
  const [getAllBookings] = useApi(() => BookingsService.getAllBookings(), true, true);

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
          </Stack>
        </Stack>
        <br />
      </div>
    </>
  );
};

export default Test;
