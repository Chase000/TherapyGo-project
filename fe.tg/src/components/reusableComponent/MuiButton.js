import { makeStyles, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    backgroundColor: '#73d6ca',
    border: '1px solid #c5c5c5',
    fontSize: '18px',
    borderRadius: '0.5em',
    width: '120px',
    color: 'ffffff',
    height: '40px',
  },
  label: {
    textTransform: 'none',
    color: 'ffffff',
    fontSize: '18px',
  },
}));

const MuiButton = (props) => {
  const { text, size, color, type, variant, onClick } = props;
  const classes = useStyles();
  return (
    <Button
      classes={{ root: classes.root, label: classes.label }}
      className="login-form__submit"
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      type={type}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default MuiButton;
