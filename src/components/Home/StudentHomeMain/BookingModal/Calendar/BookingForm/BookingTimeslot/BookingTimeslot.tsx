import React, { useState } from 'react';

import { Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
  label: string;
  available: boolean;
  handleAddBooking: () => void;
  handleCloseModal: () => void;
};

const BookingTimeslot = (props: Props) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Grid container className='mx-3'>
      <Grid item className='w-1/2 content-center'>
        <Typography className='text-xl ml-2'>{props.label}</Typography>
      </Grid>
      <Grid item className='w-1/2 text-center'>
        {props.available ? (
          <>
            <Button
              className='w-fit px-10 border-green text-green text-md rounded-xl font-bold hover:bg-green hover:text-white'
              variant='outlined'
              onClick={handleAlertOpen}
            >
              BOOK
            </Button>
            <Dialog
              open={openAlert}
              onClose={handleAlertClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title' className='font-bold text-center'>
                {'Confirm Booking?'}
              </DialogTitle>
              <DialogContent className='px-16'>
                <DialogContentText id='alert-dialog-description'>your teacher will be notified</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className='text-green' onClick={handleAlertClose}>
                  Close
                </Button>
                <Button
                  className='text-green'
                  onClick={() => {
                    handleAlertClose();
                    props.handleAddBooking();
                    props.handleCloseModal();
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Typography className='text-lg text-dulwichRed'>unavailable</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default BookingTimeslot;
