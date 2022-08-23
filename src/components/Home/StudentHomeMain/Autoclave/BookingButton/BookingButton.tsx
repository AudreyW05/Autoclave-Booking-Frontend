import React from 'react';

import { Button } from '@mui/material';

type Props = {
  handleOpenModal: () => void;
};

const BookingButton = ({ handleOpenModal }: Props) => {
  return (
    <Button
      onClick={() => {
        handleOpenModal();
      }}
      className='bg-darkGray absolute mb-[230px] z-10 h-20 w-56 rounded-3xl text-white font-bold text-xxxl hover:drop-shadow-2xl'
    >
      BOOK
    </Button>
  );
};

export default BookingButton;
