import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const FormImage = ({ picture, title }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div className='file-input'>
        <img
          src={picture}
          alt=''
          style={{ width: '100%' }}
          onClick={() => setOpen(true)}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='md'
        scroll='body'
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers={true}>
          <img src={picture} alt='' style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

FormImage.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FormImage;
