export type BookingTimeslots = 'BreakTime' | 'Lunch Time' | 'Afterschool First Hour' | 'Afterschool Second Hour';
export const BookingTimeslot = {
  Break: 'BreakTime' as BookingTimeslots,
  Lunch: 'Lunch Time' as BookingTimeslots,
  Afterschool1: 'Afterschool First Hour' as BookingTimeslots,
  Afterschool2: 'Afterschool Second Hour' as BookingTimeslots,
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
