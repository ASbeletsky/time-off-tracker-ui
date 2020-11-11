import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDialog({ isOpen, onClose, onOk }) {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">{'Edit approved request'}</DialogTitle>
        <DialogContent>
          <span className="alert-dialog-description">
            Do you really want to edit the approved request?
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOk} color="primary">
            OK
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}