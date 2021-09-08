import React, { useState } from 'react';
import './LoginFormComponent.scss';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link/';
import { TextField } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../colour';
import MyButton from './MyButton';
import { login } from '../../api/login';

const LoginFormComponent = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState({ state: false, message: '' });
  const history = useHistory();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleFocus = () => {
    setError({ ...error, state: false, message: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user)
        .then((res) => {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('customer_id', res.customer_id);
          sessionStorage.setItem('role', res.role);
          if (res.token !== undefined) {
            if (res.role === 'admin') {
              history.replace('/worksheet');
            } else if (res.role === 'customer') {
              history.replace('/userProfile');
            } else if (res.role === 'boss') {
              history.replace('/staff');
            }
          }
          if (res.code === 404) {
            setError({ ...error, state: true, message: res.message });
          }
        })
    } catch (err) {
      throw (404, err);
    }
  };

  const { state, message } = error;

  return (
    <div className="form__Container">
      <form className="login__form" onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            required
            fullWidth
            error={state}
            helperText={message}
            variant="outlined"
            margin="normal"
            size="small"
            id="inputEmail"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            onFocus={handleFocus}
          />

          <TextField
            variant="outlined"
            margin="normal"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="inputPassword"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <MyButton text="Login" type="submit" />
          <Link href="/forgetpassword" variant="body2" id="login-form__link">
            Forgot your password? Click here
          </Link>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default LoginFormComponent;
