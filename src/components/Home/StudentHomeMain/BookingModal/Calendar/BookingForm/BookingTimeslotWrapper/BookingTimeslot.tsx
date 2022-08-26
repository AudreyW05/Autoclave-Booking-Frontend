import React, { useState } from 'react';

import { Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { BookingTimeslots } from '@/modules/bookings/types';

type Props = {
  timeslot: BookingTimeslots;
  available: boolean;
  date: Date;
  handleAddBooking: (date: Date, timeslot: BookingTimeslots) => void;
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
        <Typography className='text-xl ml-2'>{props.timeslot}</Typography>
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
                <Button className='text-darkGray' onClick={handleAlertClose}>
                  Close
                </Button>
                <Button
                  className='text-green'
                  onClick={() => {
                    handleAlertClose();
                    props.handleAddBooking(props.date, props.timeslot);
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
