import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import BookingsService from '@/api/bookings/BookingsService';
import UserService from '@/api/user/UserService';
import EmailService from '@/api/email/EmailService';

import AutoclaveWrapper from '@/components/Home/StudentHomeMain/Autoclave/AutoclaveWrapper';
import MyBookingsWrapper from '@/components/Home/StudentHomeMain/MyBookings/MyBookingsWrapper';
import BookingModal from '@/components/Home/StudentHomeMain/BookingModal/BookingModal';

import { BookingData, BookingTimeslot, BookingTimeslots, CreateBookingData, Supervisor, Supervisors } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';
import { EmailMessage } from '@/modules/email/types';

import moment from 'moment';

type Props = {
  currentUser: UserData;
};

const StudentHomeMain = ({ currentUser }: Props) => {
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

  const [allBookings, setAllBookings] = useState<BookingData[]>();
  const [myBookings, setMyBookings] = useState<BookingData[]>();
  const [myFutureBookings, setMyFutureBookings] = useState<BookingData[]>();
  const [users, setUsers] = useState<UserData[]>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getAllBookings] = useApi(() => BookingsService.getAllBookings(), false, true, false);
  const [getMyBookings] = useApi(() => BookingsService.getSelf(currentUser.id), false, true, false);
  const [createBooking] = useApi((data: CreateBookingData) => BookingsService.createBooking(data), false, true, false);
  const [deleteBooking] = useApi((data: string) => BookingsService.deleteBookingByUuid(data), false, true, false);
  const [sendMail] = useApi((msg: EmailMessage) => EmailService.sendMail(msg), false, true, false);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);

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
    myBookings?.sort((a, b) => {
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
    setMyBookings(myBookings ?? []);
    const currentDate = new Date();
    setMyFutureBookings(myBookings?.filter(booking => new Date(booking.date).valueOf() + 1 >= currentDate.valueOf() - 86400000));
    setUsers(users);

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

  const handleAddBooking = async (date: Date, timeslot: BookingTimeslots, supervisor: Supervisors, reasoning: string) => {
    setIsLoading(true);

    const bookingData: CreateBookingData = {
      userId: currentUser.id,
      date: date,
      timeslot: timeslot,
      supervisor: supervisor,
      reasoning: reasoning,
    };
    await createBooking(bookingData);
    await fetchAllData();
    await sendEmail(date, timeslot, supervisor, reasoning);

    setIsLoading(false);
  };

  const sendEmail = async (date: Date, timeslot: BookingTimeslots, supervisor: Supervisors, reasoning: string) => {
    const supervisorEmail =
      supervisor === Supervisor.MR_WILSON
        ? 'jason.l.wilson@dulwich.org'
        : supervisor === Supervisor.MR_DESHPANDE
        ? 'adam.deshpande@dulwich.org'
        : supervisor === Supervisor.MR_WILLIAMS
        ? 'dominic.williams@dulwich.org'
        : 'michelle.crowie@dulwich.org';

    await sendMail({
      to: supervisorEmail,
      from: 'autoclave-booking@outlook.com',
      subject: 'New Autoclave Booking',
      html: `<b>Booking by ${users?.find(user => user.id === currentUser.id)?.email.replace('@stu.dulwich.org', '')}</b><p>Date: ${moment(
        date,
      ).format(
        'dddd MMMM D',
      )}</p><p>Timeslot: ${timeslot}</p><p>Teacher Supervisor: ${supervisor}</p><p>Reason For Booking: ${reasoning}</p>`,
    });
  };

  const handleDeleteBooking = async (uuid: string) => {
    setIsLoading(true);

    await deleteBooking(uuid);
    await fetchAllData();

    setIsLoading(false);
  };

  return (
    <Grid container direction='row' className='h-screen items-center pt-4 overflow-hidden'>
      <BookingModal
        openState={openBookingModal}
        handleCloseModal={handleCloseModal}
        myBookings={myBookings ?? []}
        isLoading={isLoading}
        handleAddBooking={handleAddBooking}
        allBookings={allBookings ?? []}
      />
      <AutoclaveWrapper handleOpenModal={handleOpenModal} />
      <MyBookingsWrapper
        myFutureBookings={myFutureBookings ?? []}
        isLoading={isLoading}
        handleDeleteBooking={handleDeleteBooking}
        allBookings={allBookings ?? []}
        users={users ?? []}
      />
    </Grid>
  );
};

export default StudentHomeMain;
