import React from 'react';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

import { Box } from '@mui/material';

import AllBookingsEventDisplay from '@/components/Home/StudentHomeMain/MyBookings/AllBookingsDisplay/AllBookingsCalendar/AllBookingsEventDisplay/AllBookingsEventDisplay';

import { BookingData, BookingTimeslot } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  allBookings: BookingData[];
  users: UserData[];
};

const AllBookingsCalendar = (props: Props) => {
  const renderEventContent = (e: EventClickArg) => {
    return <AllBookingsEventDisplay users={props.users} eventData={e} />;
  };
  return (
    <Box className='h-full px-2 w-full'>
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
              : booking.timeslot === BookingTimeslot.BREAK
              ? '#3798F2'
              : '#F48B1B',
        }))}
        noEventsContent={'No bookings this week'}
        eventContent={renderEventContent}
        displayEventTime={false}
      />
    </Box>
  );
};

export default AllBookingsCalendar;
