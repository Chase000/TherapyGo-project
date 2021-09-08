import React from 'react';
import { Button } from '@material-ui/core/';
import './LoginFormComponent.scss';

const MyButton = (props) => {
  const { text, type, onClick } = props;
  return (
    <>
      <Button
        id="login-form__submit"
        type={type}
        variant="contained"
        className="login-form__submit"
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  );
};

export default MyButton;
