import React from 'react';
import { useHistory } from 'react-router';

import { Button, ClickAwayListener, Box } from '@mui/material';

import AuthService from '@/api/auth/AuthService';

export type Props = {
  onClose: () => void;
};

const LogoutButton = ({ onClose }: Props) => {
  const history = useHistory();

  return (
    <>
      <ClickAwayListener onClickAway={onClose}>
        <Box className='w-72 h-16 justify-center flex bg-bgWhite absolute right-0 z-10 mt-20 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)] z-30'>
          <Button
            className='text-black text-lg font-Inter w-full'
            onClick={() => {
              AuthService.logout();
              history.push('/auth/login');
            }}
          >
            Sign Out
          </Button>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default LogoutButton;
