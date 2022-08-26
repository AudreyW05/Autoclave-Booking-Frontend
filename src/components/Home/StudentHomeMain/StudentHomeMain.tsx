import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import BookingsService from '@/api/bookings/BookingsService';

import AutoclaveWrapper from '@/components/Home/StudentHomeMain/Autoclave/AutoclaveWrapper';
import MyBookingsWrapper from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsWrapper';
import BookingModal from '@/components/Home/StudentHomeMain/BookingModal/BookingModal';

import { BookingData, BookingTimeslot, BookingTimeslots, CreateBookingData } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  currentUser: UserData;
};

const StudentHomeMain = ({ currentUser }: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

  const [allBookings, setAllBookings] = useState<BookingData[]>();
  const [myBookings, setMyBookings] = useState<BookingData[]>();
  const [myFutureBookings, setMyFutureBookings] = useState<BookingData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getAllBookings] = useApi(() => BookingsService.getAllBookings(), false, true, false);
  const [getMyBookings] = useApi(() => BookingsService.getSelf(currentUser.id), false, true, false);
  const [createBooking] = useApi((data: CreateBookingData) => BookingsService.createBooking(data), false, true, false);
  const [deleteBooking] = useApi((data: string) => BookingsService.deleteBookingByUuid(data), false, true, false);

  const fetchAllData = async () => {
    setIsLoading(true);

    const bookings = await retrieveAllData<BookingData[]>(getAllBookings);
    const myBookings = await retrieveAllData<BookingData[]>(getMyBookings);

    bookings?.sort((a, b) => {
      return new Date(a.date).valueOf() >= new Date(b.date).valueOf() ? 1 : -1;
    });
    myBookings?.sort((a, b) => {
      return new Date(a.date).valueOf() >= new Date(b.date).valueOf() ? 1 : -1;
    });
    bookings?.sort((a, b) => {
      return a.date !== b.date
        ? a.timeslot !== b.timeslot
          ? a.timeslot === BookingTimeslot.BREAK
            ? 1
            : a.timeslot === BookingTimeslot.LUNCH && b.timeslot !== BookingTimeslot.BREAK
            ? 1
            : a.timeslot === BookingTimeslot.AFTERSCHOOL1 && b.timeslot === BookingTimeslot.AFTERSCHOOL2
            ? 1
            : -1
          : 0
        : 0;
    });
    myBookings?.sort((a, b) => {
      return a.date !== b.date
        ? a.timeslot !== b.timeslot
          ? a.timeslot === BookingTimeslot.BREAK
            ? 1
            : a.timeslot === BookingTimeslot.LUNCH && b.timeslot !== BookingTimeslot.BREAK
            ? 1
            : a.timeslot === BookingTimeslot.AFTERSCHOOL1 && b.timeslot === BookingTimeslot.AFTERSCHOOL2
            ? 1
            : -1
          : 0
        : 0;
    });

    setAllBookings(bookings ?? []);
    setMyBookings(myBookings ?? []);
    const currentDate = new Date();
    setMyFutureBookings(myBookings?.filter(booking => new Date(booking.date).valueOf() + 1 >= currentDate.valueOf() - 86400000));

    setIsLoading(false);
  };

  // Fetch Data from API
  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCloseModal = () => {
    setOpenBookingModal(false);
  };

  const handleOpenModal = () => {
    setOpenBookingModal(true);
  };

  const handleAddBooking = async (date: Date, timeslot: BookingTimeslots) => {
    setIsLoading(true);

    const bookingData: CreateBookingData = { userId: currentUser.id, date: date, timeslot: timeslot };
    await createBooking(bookingData);
    await fetchAllData();

    setIsLoading(false);
  };

  const handleDeleteBooking = async (uuid: string) => {
    setIsLoading(true);

    await deleteBooking(uuid);
    await fetchAllData();

    setIsLoading(false);
  };

  return (
    <Grid container direction='row' className='h-screen'>
      <BookingModal
        openState={openBookingModal}
        handleCloseModal={handleCloseModal}
        myBookings={myBookings ?? []}
        isLoading={isLoading}
        handleAddBooking={handleAddBooking}
        allBookings={allBookings ?? []}
      />
      <AutoclaveWrapper handleOpenModal={handleOpenModal} />
      <MyBookingsWrapper myFutureBookings={myFutureBookings ?? []} isLoading={isLoading} handleDeleteBooking={handleDeleteBooking} />
    </Grid>
  );
};

export default StudentHomeMain;
