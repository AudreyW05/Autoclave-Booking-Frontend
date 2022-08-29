import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { severity } from '@/consts/constants';

import { Box } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import BookingForm from '@/components/Home/StudentHomeMain/BookingModal/Calendar/BookingForm/BookingFormWrapper';

import { BookingData, BookingTimeslots, Supervisors } from '@/modules/bookings/types';
import { toggleShowNotification } from '@/modules/ui/uiSlice';

type Props = {
  myBookings: BookingData[];
  handleAddBooking: (date: Date, timeslot: BookingTimeslots, supervisor: Supervisors) => void;
  allBookings: BookingData[];
};

const Calendar = (props: Props) => {
  const [openBookingForm, setOpenBookingForm] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const currentDate = new Date();

  const dispatch = useDispatch();

  const handleDateClick = (e: DateClickArg) => {
    if (e.date.valueOf() >= currentDate.valueOf() - 86400000) {
      setOpenBookingForm(true);
      setDate(e.date);
    } else {
      dispatch(toggleShowNotification({ message: 'Select a future date', severity: severity.ERROR }));
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
