export type BookingTimeslots = 'Form Time' | 'Break Time' | 'Lunch Time' | 'Afterschool First Hour' | 'Afterschool Second Hour';
export const BookingTimeslot = {
  FORM: 'Form Time' as BookingTimeslots,
  BREAK: 'Break Time' as BookingTimeslots,
  LUNCH: 'Lunch Time' as BookingTimeslots,
  AFTERSCHOOL1: 'Afterschool First Hour' as BookingTimeslots,
  AFTERSCHOOL2: 'Afterschool Second Hour' as BookingTimeslots,
};

export type Supervisors = 'Mr. Wilson' | 'Mr. Deshpande' | 'Mr. Williams' | 'Ms. Crowie';
export const Supervisor = {
  MR_WILSON: 'Mr. Wilson' as Supervisors,
  MR_DESHPANDE: 'Mr. Deshpande' as Supervisors,
  MR_WILLIAMS: 'Mr. Williams' as Supervisors,
  MS_CROWIE: 'Ms. Crowie' as Supervisors,
};

export type BookingData = {
  uuid: string;
  userId: number;
  date: Date;
  timeslot: BookingTimeslots;
  supervisor: Supervisors;
  reasoning: string;
};

export type CreateBookingData = {
  userId: number;
  date: Date;
  timeslot: BookingTimeslots;
  supervisor: Supervisors;
  reasoning: string;
};
