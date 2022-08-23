export type BookingTimes = 'BreakTime' | 'Lunch Time' | 'Afterschool First Hour' | 'Afterschool Second Hour';
export const BookingTime = {
  Break: 'BreakTime',
  Lunch: 'Lunch Time',
  Afterschool1: 'Afterschool First Hour',
  Afterschool2: 'Afterschool Second Hour',
};

export type BookingData = {
  uuid: string;
  userId: number;
  date: string;
  time: BookingTimes;
};
