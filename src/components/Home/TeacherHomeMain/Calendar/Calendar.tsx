import React from 'react';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

import { Box } from '@mui/material';

import EventDisplay from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/EventDisplay';

import { BookingData, BookingTimeslot } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  allBookings: BookingData[];
  users: UserData[];
  handleDeleteBooking: (uuid: string) => void;
};

const Calendar = (props: Props) => {
  const renderEventContent = (e: EventClickArg) => {
    return <EventDisplay eventData={e} users={props.users} handleDeleteBooking={props.handleDeleteBooking} />;
  };
  return (
    <Box className='h-full pt-32 px-12'>
      <FullCalendar
        plugins={[listPlugin]}
        initialView={'listWeek'}
        height={'90%'}
        firstDay={0}
        events={props.allBookings.map(booking => ({
          ...booking,
          allDay: true,
          color:
            booking.timeslot === BookingTimeslot.LUNCH
              ? '#E4C249'
              : booking.timeslot === BookingTimeslot.AFTERSCHOOL1
              ? '#27C049'
              : booking.timeslot === BookingTimeslot.AFTERSCHOOL2
              ? '#A037F2'
              : '#3798F2',
        }))}
        noEventsContent={'No bookings this week'}
        eventContent={renderEventContent}
        displayEventTime={false}
      />
    </Box>
  );
};

export default Calendar;
