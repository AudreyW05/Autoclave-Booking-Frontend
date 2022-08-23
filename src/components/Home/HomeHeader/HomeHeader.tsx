import React, { useState } from 'react';

import { AppBar, Grid, Typography, Box } from '@mui/material';

import { UserData } from '@/modules/user/types';

import LogoutButton from '@components/Home/HomeHeader/LogoutButton/LogoutButton';

export type Props = {
  currentUser: UserData;
};

const HomeHeader = ({ currentUser }: Props) => {
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  const profileName = currentUser.email ? currentUser.email.substring(0, currentUser.email.lastIndexOf('@')) : '?';
  const initials =
    profileName.lastIndexOf('.') === -1
      ? profileName.charAt(0).toUpperCase()
      : (profileName.charAt(0) + profileName.charAt(profileName.lastIndexOf('.') + 1)).toUpperCase();

  return (
    <>
      <AppBar elevation={0} className='bg-bgWhite w-screen bg-bgGray shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)] z-20' position='fixed'>
        <Grid container className='w-screen h-20 items-center flex' direction='row'>
          <Typography className='text-black font-bold font-inter text-lg pl-10 w-1/2'>AUTOCLAVE BOOKING</Typography>
          <div className='justify-end w-1/2'>
            <Box
              className={`flex bg-bgBlue text-black rounded-full justify-center items-center w-12 h-12 cursor-pointer mr-10 float-right`}
              onClick={handleShowLogout}
            >
              <p className='font-Inter'>{initials}</p>
            </Box>
          </div>
        </Grid>
      </AppBar>
      {showLogout && <LogoutButton onClose={handleShowLogout} />}
    </>
  );
};

export default HomeHeader;
