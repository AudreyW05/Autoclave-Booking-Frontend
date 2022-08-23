import React from 'react';

import HomeHeader from '@/components/Home/HomeHeader/HomeHeader';
import TeacherHomeMain from '@/components/Home/TeacherHomeMain/TeacherHomeMain';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';

const TeacherHome = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      {currentUser && (
        <>
          <HomeHeader currentUser={currentUser} />
          <main>
            <TeacherHomeMain />
          </main>
        </>
      )}
    </>
  );
};

export default TeacherHome;
