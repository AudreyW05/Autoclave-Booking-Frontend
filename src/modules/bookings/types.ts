export type BookingTimeslots = 'BreakTime' | 'Lunch Time' | 'Afterschool First Hour' | 'Afterschool Second Hour';
export const BookingTimeslot = {
  BREAK: 'BreakTime' as BookingTimeslots,
  LUNCH: 'Lunch Time' as BookingTimeslots,
  AFTERSCHOOL1: 'Afterschool First Hour' as BookingTimeslots,
  AFTERSCHOOL2: 'Afterschool Second Hour' as BookingTimeslots,
};

export type BookingData = {
  uuid: string;
  userId: number;
  date: Date;
  timeslot: BookingTimeslots;
};

export type CreateBookingData = {
  userId: number;
  date: Date;
  timeslot: BookingTimeslots;
};
