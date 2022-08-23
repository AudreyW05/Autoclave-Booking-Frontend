import React from 'react';

import HomeHeader from '@/components/Home/HomeHeader/HomeHeader';
import StudentHomeMain from '@/components/Home/StudentHomeMain/StudentHomeMain';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';

const StudentHome = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      {currentUser && (
        <>
          <HomeHeader currentUser={currentUser} />
          <main>
            <StudentHomeMain />
          </main>
        </>
      )}
    </>
  );
};

export default StudentHome;
