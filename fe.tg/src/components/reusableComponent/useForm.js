import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    maxWidth: '100%',
    padding: theme.spacing(1),
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const { children, onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className={classes.root} autoComplete="off">
      {children}
    </form>
  );
};

export default Form;