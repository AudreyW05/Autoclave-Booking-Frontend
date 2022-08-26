import React, { useState } from 'react';

import { Box } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import moment from 'moment';

import { BookingData } from '@/modules/bookings/types';

import BookingForm from '@/components/Home/StudentHomeMain/BookingModal/Calendar/BookingForm/BookingForm';

const Calendar = () => {
  const [openBookingForm, setOpenBookingForm] = useState<boolean>(false);
  const [myBookings, setMyBookings] = useState<BookingData[]>([]);
  const [date, setDate] = useState<string>('');

  const handleDateClick = (e: DateClickArg) => {
    setOpenBookingForm(true);
    setDate(moment(e.date).format());
    console.log(moment(e.date).format());
  };

  const handleAddBooking = () => {
    setMyBookings([...myBookings, { uuid: 'asdfasdf', userId: 2, timeslot: 'BreakTime', date: new Date() }]);
    console.log(date);
  };

  return (
    <>
      {openBookingForm && (
        <BookingForm
          handleCloseModal={() => {
            setOpenBookingForm(false);
          }}
          date={date}
          handleAddBooking={handleAddBooking}
        />
      )}
      <Box className='h-full pt-6 px-12'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          height={'90%'}
          fixedWeekCount={false}
          weekends={false}
          dateClick={handleDateClick}
          events={myBookings.map(booking => ({ ...booking, display: 'background', allDay: true }))}
        />
      </Box>
    </>
  );
};

export default Calendar;
