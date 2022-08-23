import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
  openAlert: boolean;
  handleAlertClose: () => void;
};

const DeleteAlert = (props: Props) => {
  return (
    <Dialog
      open={props.openAlert}
      onClose={props.handleAlertClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className='font-bold text-center'>
        {'Are you sure you want to delete this booking?'}
      </DialogTitle>
      <DialogContent className='px-16'>
        <DialogContentText id='alert-dialog-description'>you will not be able to undo this action</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className='text-darkGray' onClick={props.handleAlertClose}>
          Cancel
        </Button>
        <Button
          className='text-dulwichRed'
          onClick={() => {
            props.handleAlertClose();
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
