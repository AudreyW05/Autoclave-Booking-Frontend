import React from 'react';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

import { Box } from '@mui/material';

import EventDisplay from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/EventDisplay';

import { BookingTime } from '@/modules/bookings/types';

export const dummyBookingData = [
  { uuid: 'asdfahsdfasdf', userId: 2, date: '2022-08-10T00:00:00+08:00', time: BookingTime.Break },
  { uuid: 'afdgfgdsgfsdfg', userId: 2, date: '2022-08-11T00:00:00+08:00', time: BookingTime.Afterschool2 },
  { uuid: 'afdgfgdsgfsdfg', userId: 2, date: '2022-08-11T00:00:00+08:00', time: BookingTime.Lunch },
  { uuid: 'afdgfgdsgfsdfg', userId: 2, date: '2022-09-14T00:00:00+08:00', time: BookingTime.Afterschool1 },
];

const Calendar = () => {
  const renderEventContent = (e: EventClickArg) => {
    return <EventDisplay eventData={e} />;
  };
  return (
    <Box className='h-full pt-32 px-12'>
      <FullCalendar
        plugins={[listPlugin]}
        initialView={'listWeek'}
        height={'90%'}
        events={dummyBookingData.map(booking => ({
          ...booking,
          allDay: true,
          color:
            booking.time === BookingTime.Lunch
              ? '#E4C249'
              : booking.time === BookingTime.Afterschool1
              ? '#27C049'
              : booking.time === BookingTime.Afterschool2
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
