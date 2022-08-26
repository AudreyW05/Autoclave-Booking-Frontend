import React, { useState } from 'react';

import { Box } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import BookingForm from '@/components/Home/StudentHomeMain/BookingModal/Calendar/BookingForm/BookingFormWrapper';

import { BookingData, BookingTimeslots } from '@/modules/bookings/types';

type Props = {
  myBookings: BookingData[];
  handleAddBooking: (date: Date, timeslot: BookingTimeslots) => void;
  allBookings: BookingData[];
};

const Calendar = (props: Props) => {
  const [openBookingForm, setOpenBookingForm] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const currentDate = new Date();

  const handleDateClick = (e: DateClickArg) => {
    if (e.date.valueOf() >= currentDate.valueOf() - 86400000) {
      setOpenBookingForm(true);
      setDate(e.date);
    }
  };

  return (
    <>
      {openBookingForm && (
        <BookingForm
          handleCloseModal={() => {
            setOpenBookingForm(false);
          }}
          date={date}
          handleAddBooking={props.handleAddBooking}
          allBookings={props.allBookings}
        />
      )}
      <Box className='h-full pt-6 px-12'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          height={'90%'}
          fixedWeekCount={false}
          weekends={false}
          dateClick={handleDateClick}
          events={props.myBookings.map(booking => ({
            ...booking,
            backgroundColor: new Date(booking.date).valueOf() >= currentDate.valueOf() - 86400000 ? '' : 'orange',
            display: 'background',
            allDay: true,
          }))}
        />
      </Box>
    </>
  );
};

export default Calendar;
