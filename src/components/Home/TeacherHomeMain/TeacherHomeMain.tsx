import React, { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import BookingsService from '@/api/bookings/BookingsService';
import UserService from '@/api/user/UserService';

import Calendar from '@/components/Home/TeacherHomeMain/Calendar/Calendar';
import Loading from '@/components/Loading/Loading';

import { BookingData, BookingTimeslot } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

const TeacherHomeMain = () => {
  const [allBookings, setAllBookings] = useState<BookingData[]>();
  const [users, setUsers] = useState<UserData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getAllBookings] = useApi(() => BookingsService.getAllBookings(), false, true, false);
  const [deleteBooking] = useApi((data: string) => BookingsService.deleteBookingByUuid(data), false, true, false);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);

  const fetchAllData = async () => {
    setIsLoading(true);

    const bookings = await retrieveAllData<BookingData[]>(getAllBookings);
    bookings?.sort((a, b) => {
      return new Date(a.date).valueOf() >= new Date(b.date).valueOf() ? 1 : -1;
    });
    bookings?.sort((a, b) => {
      return a.date === b.date
        ? a.timeslot !== b.timeslot
          ? a.timeslot === BookingTimeslot.BREAK
            ? -1
            : a.timeslot === BookingTimeslot.LUNCH && b.timeslot !== BookingTimeslot.BREAK
            ? -1
            : a.timeslot === BookingTimeslot.AFTERSCHOOL1 && b.timeslot === BookingTimeslot.AFTERSCHOOL2
            ? -1
            : 1
          : 0
        : 0;
    });

    const users = await retrieveAllData<UserData[]>(getAllUsers);

    setAllBookings(bookings ?? []);
    setUsers(users);

    setIsLoading(false);
  };

  const handleDeleteBooking = async (uuid: string) => {
    setIsLoading(true);

    await deleteBooking(uuid);
    await fetchAllData();

    setIsLoading(false);
  };

  // Fetch Data from API
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Container className='h-screen w-5/6'>
      {isLoading ? <Loading /> : <Calendar allBookings={allBookings ?? []} users={users ?? []} handleDeleteBooking={handleDeleteBooking} />}
    </Container>
  );
};

export default TeacherHomeMain;
