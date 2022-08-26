import React, { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import BookingsService from '@/api/bookings/BookingsService';

import Calendar from '@/components/Home/TeacherHomeMain/Calendar/Calendar';
import Loading from '@/components/Loading/Loading';

import { BookingData } from '@/modules/bookings/types';

const TeacherHomeMain = () => {
  const [allBookings, setAllBookings] = useState<BookingData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getAllBookings] = useApi(() => BookingsService.getAllBookings(), false, true, false);

  const fetchAllData = async () => {
    setIsLoading(true);

    const bookings = await retrieveAllData<BookingData[]>(getAllBookings);
    setAllBookings(bookings ?? []);

    setIsLoading(false);
  };

  // Fetch Data from API
  useEffect(() => {
    fetchAllData();
  }, []);

  return <Container className='h-screen w-5/6'>{isLoading ? <Loading /> : <Calendar allBookings={allBookings ?? []} />}</Container>;
};

export default TeacherHomeMain;
