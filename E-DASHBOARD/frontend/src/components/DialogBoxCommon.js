import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DialogBoxCommon = ({ open, handleClose, handleAction, actionType, data }) => {
  const navigate = useNavigate();

  const handleConfirmAction = () => {
    handleAction();
    if (actionType === 'edit') {
      navigate(`/update`, {
        state: {
          data
        }
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{actionType === 'edit' ? 'Edit Product' : 'Delete Product'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {actionType === 'edit' ? 'Are you sure you want to edit this product?' : 'Are you sure you want to delete this product?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmAction} color="primary" autoFocus>
          {actionType === 'edit' ? 'Edit' : 'delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};



export default DialogBoxCommon;
