import React from 'react';

import { Container } from '@mui/material';
import Calendar from '@/components/Home/TeacherHomeMain/Calendar/Calendar';

const TeacherHomeMain = () => {
  return (
    <Container className='h-screen w-5/6'>
      <Calendar />
    </Container>
  );
};

export default TeacherHomeMain;
