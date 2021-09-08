import React from 'react';
import Alert from '@material-ui/lab/Alert';
import './BookingConfirm.scss';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';

const DeleteConfirm = () => {
  const alertPage = (
    <Alert variant="filled" severity="success">
      Delete Success!
    </Alert>
  );
  const removeAlertNode = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('alertPage'));
  };
  return (
    <Box className="alertContainer" onClick={removeAlertNode} boxShadow={3}>
      {alertPage}
    </Box>
  );
};

export default DeleteConfirm;
