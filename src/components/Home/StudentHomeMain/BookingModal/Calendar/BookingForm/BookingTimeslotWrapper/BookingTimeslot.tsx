import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { severity } from '@/consts/constants';

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
  Input,
} from '@mui/material';

const { colors } = TailWindTheme.theme;
import TailWindTheme from '@/tailwind.config';

import { BookingTimeslots, Supervisor, Supervisors } from '@/modules/bookings/types';
import { toggleShowNotification } from '@/modules/ui/uiSlice';

type Props = {
  timeslot: BookingTimeslots;
  available: boolean;
  date: Date;
  handleAddBooking: (date: Date, timeslot: BookingTimeslots, supervisor: Supervisors, reasoning: string) => void;
  handleCloseModal: () => void;
};

const BookingTimeslot = (props: Props) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [supervisor, setSupervisor] = useState<Supervisors>(Supervisor.MR_WILSON);
  const [reasoning, setReasoning] = useState<string>('');
  const [reasoningError, setReasoningError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleSupervisorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupervisor(
      event.target.defaultValue === Supervisor.MR_DESHPANDE
        ? Supervisor.MR_DESHPANDE
        : event.target.defaultValue === Supervisor.MR_WILLIAMS
        ? Supervisor.MR_WILLIAMS
        : event.target.defaultValue === Supervisor.MR_WILSON
        ? Supervisor.MR_WILSON
        : Supervisor.MS_CROWIE,
    );
  };

  const handleReasoningChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    reasoningError === true ? setReasoningError(false) : null;
    setReasoning(event.target.value);
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
                      value={Supervisor.MR_WILSON}
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
                      label={Supervisor.MR_WILSON}
                    />
                    <FormControlLabel
                      value={Supervisor.MR_DESHPANDE}
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
                      label={Supervisor.MR_DESHPANDE}
                    />
                    <FormControlLabel
                      value={Supervisor.MR_WILLIAMS}
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
                      label={Supervisor.MR_WILLIAMS}
                    />
                    <FormControlLabel
                      value={Supervisor.MS_CROWIE}
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
                      label={Supervisor.MS_CROWIE}
                    />
                  </RadioGroup>
                </FormControl>
                <Input
                  placeholder={'Please enter the reasoning for your booking'}
                  value={reasoning}
                  className='w-full color-bgWhite font-Inter font-light px-0 pt-2'
                  onChange={handleReasoningChange}
                  error={reasoningError}
                />
              </DialogContent>
              <DialogActions>
                <Button className='text-darkGray' onClick={handleAlertClose}>
                  Close
                </Button>
                <Button
                  className='text-green'
                  onClick={() => {
                    if (reasoning.trim().length === 0) {
                      setReasoningError(true);
                      dispatch(toggleShowNotification({ message: 'Reasoning cannot be empty', severity: severity.ERROR }));
                    } else {
                      handleAlertClose();
                      props.handleAddBooking(props.date, props.timeslot, supervisor, reasoning);
                      props.handleCloseModal();
                    }
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
