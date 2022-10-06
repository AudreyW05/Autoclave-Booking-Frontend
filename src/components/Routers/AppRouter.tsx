import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Routes from '@/utilities/routes';
import { getLocalStorageValue } from '@/utilities/localStorage';
import { isTeacher } from '@/utilities/authorisation';

import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';

import { getCurrentUser } from '@/modules/user/userSlice';
import { updateCurrentUser } from '@/modules/user/userSlice';

import Login from '@pages/Landing/Login/Login';
import IsTemporaryUser from '@pages/Landing/IsTemporaryUser/IsTemporaryUser';
import StudentHome from '@/pages/Home/StudentHome/StudentHome';
import Test from '@pages/Test/Test';
import TeacherHome from '@/pages/Home/TeacherHome/TeacherHome';

const AppRouter = () => {
  const dispatch = useDispatch();
  const accessToken: string | null = getLocalStorageValue('accessToken') ?? null;
  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);
  const currentUser = useSelector(getCurrentUser);
  const isUserTeacher = isTeacher(currentUser);
  const isTemp = !currentUser?.isConfirmed && currentUser?.isTemporary;

  const fetchSelf = async () => {
    try {
      const res = await getSelf();
      if (!res.isSuccess) return;
      dispatch(updateCurrentUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchSelf();
  }, [accessToken]);

  return (
    <Switch>
      <Route exact path={Routes.base}>
        <Redirect
          to={
            accessToken
              ? isTemp
                ? Routes.authentication.isTempUser
                : isUserTeacher
                ? Routes.home.teacher
                : Routes.home.student
              : Routes.authentication.login
          }
        />
      </Route>
      <Route exact path={Routes.authentication.login} component={Login} />
      {accessToken && <Route exact path={Routes.authentication.isTempUser} component={IsTemporaryUser} />}
      {accessToken && !isTemp && isUserTeacher && <Route exact path={Routes.home.teacher} component={TeacherHome} />}
      {accessToken && !isTemp && !isUserTeacher && <Route exact path={Routes.home.student} component={StudentHome} />}

      <Route exact path={Routes.test} component={Test} />
      <Route exact path='*'>
        <Redirect to={Routes.base} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
