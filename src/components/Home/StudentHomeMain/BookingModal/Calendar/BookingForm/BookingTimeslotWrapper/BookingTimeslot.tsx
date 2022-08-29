import React, { useState } from 'react';

import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const { colors } = TailWindTheme.theme;
import TailWindTheme from '@/tailwind.config';

import { BookingTimeslots, Supervisor, Supervisors } from '@/modules/bookings/types';

type Props = {
  timeslot: BookingTimeslots;
  available: boolean;
  date: Date;
  handleAddBooking: (date: Date, timeslot: BookingTimeslots, supervisor: Supervisors) => void;
  handleCloseModal: () => void;
};

const BookingTimeslot = (props: Props) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [supervisor, setSupervisor] = useState<Supervisors>(Supervisor.Mr_Wilson);

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleSupervisorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupervisor(
      event.target.defaultValue === Supervisor.Mr_Deshpande
        ? Supervisor.Mr_Deshpande
        : event.target.defaultValue === Supervisor.Mr_Williams
        ? Supervisor.Mr_Williams
        : Supervisor.Mr_Wilson,
    );
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
              <DialogTitle id='alert-dialog-title' className='font-bold ml-4'>
                {'Confirm Booking?'}
              </DialogTitle>
              <DialogContent className='px-16'>
                <DialogContentText id='alert-dialog-description' className='text-black pb-2'>
                  Select your teacher supervisor:
                </DialogContentText>
                <FormControl>
                  <RadioGroup
                    className='font-Inter font-light px-2 align-center text-grayAccent'
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    onChange={handleSupervisorChange}
                    defaultValue='never'
                    value={supervisor}
                  >
                    <FormControlLabel
                      value={Supervisor.Mr_Wilson}
                      control={
                        <Radio
                          sx={{
                            color: colors.black,
                            '&.Mui-checked': {
                              color: colors.green,
                            },
                          }}
                        />
                      }
                      label={Supervisor.Mr_Wilson}
                    />
                    <FormControlLabel
                      value={Supervisor.Mr_Deshpande}
                      control={
                        <Radio
                          sx={{
                            color: colors.black,
                            '&.Mui-checked': {
                              color: colors.green,
                            },
                          }}
                        />
                      }
                      label={Supervisor.Mr_Deshpande}
                    />
                    <FormControlLabel
                      value={Supervisor.Mr_Williams}
                      control={
                        <Radio
                          sx={{
                            color: colors.black,
                            '&.Mui-checked': {
                              color: colors.green,
                            },
                          }}
                        />
                      }
                      label={Supervisor.Mr_Williams}
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button className='text-darkGray' onClick={handleAlertClose}>
                  Close
                </Button>
                <Button
                  className='text-green'
                  onClick={() => {
                    handleAlertClose();
                    props.handleAddBooking(props.date, props.timeslot, supervisor);
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
