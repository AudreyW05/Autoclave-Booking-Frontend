import React, { useState } from 'react';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

import { Box } from '@mui/material';

import EventDisplay from '@/components/Home/TeacherHomeMain/Calendar/EventDisplay/EventDisplay';
import EventModal from '@/components/Home/TeacherHomeMain/Calendar/EventModal/EventModal';

import { BookingData, BookingTimeslot } from '@/modules/bookings/types';
import { UserData } from '@/modules/user/types';

type Props = {
  allBookings: BookingData[];
  users: UserData[];
  handleDeleteBooking: (uuid: string) => void;
};

const Calendar = (props: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingData>();
  const [removeHover, setRemoveHover] = useState<boolean>(false);

  const renderEventContent = (e: EventClickArg) => {
    return (
      <EventDisplay
        eventData={e}
        users={props.users}
        handleDeleteBooking={props.handleDeleteBooking}
        handleRemoveHover={handleRemoveHover}
      />
    );
  };

  const handleEventClick = (e: EventClickArg) => {
    setBookingData({
      uuid: e.event.extendedProps.uuid,
      userId: e.event.extendedProps.userId,
      date: e.event.start ?? new Date(),
      timeslot: e.event.extendedProps.timeslot,
      supervisor: e.event.extendedProps.supervisor,
      reasoning: e.event.extendedProps.reasoning,
    });
    setOpenModal(true);
  };

  const handleRemoveHover = (val: boolean) => {
    setRemoveHover(val);
  };

  return (
    <>
      {openModal && (
        <EventModal
          bookingData={bookingData}
          handleCloseModal={() => {
            setOpenModal(false);
          }}
          users={props.users}
        />
      )}
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
                : booking.timeslot === BookingTimeslot.BREAK
                ? '#3798F2'
                : '#F48B1B',
          }))}
          noEventsContent={'No bookings this week'}
          eventContent={renderEventContent}
          eventClick={removeHover ? undefined : handleEventClick}
          displayEventTime={false}
        />
      </Box>
    </>
  );
};

export default Calendar;
