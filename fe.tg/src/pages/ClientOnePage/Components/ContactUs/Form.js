import React from 'react';
import './ContactUs.scss';
import { TextField, Button } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { theme } from '../../../../colour';

const Form = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        Swal.fire(
          'Form sent!',
          'Our customer service will reply to you as soon as possible.',
          'success',
        );
      } else {
        Swal.fire('Failed to send form!', 'Please try again!', 'error');
      }
    };
    xhr.send(data);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      action="https://formspree.io/f/mjvjkzlq"
      method="POST"
    >
      <h2>Get In Touch</h2>
      <ThemeProvider theme={theme}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="text"
          id="name"
          label="Name"
          name="Name"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="Email Address"
          name="Email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          id="phone"
          label="Phone Number"
          name="Phone"
        />
        <TextField
          id="message"
          name="Message"
          label="Message"
          type="textarea"
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <Button id="form__submit" type="submit" variant="contained" className="submit-button">
          Submit
        </Button>
      </ThemeProvider>
    </form>
  );
};

export default Form;
