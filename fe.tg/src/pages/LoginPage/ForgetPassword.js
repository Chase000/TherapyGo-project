import React, { useState } from 'react';
import './LoginPage';
import Input from '../../components/reusableComponent/Input';
import Button from '../../components/LoginFormComponent/MyButton';
import axios from '../../utils/axios';

const ForgotPassword = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/admin/forgotpassword';
    await axios.post(url, { ...values }).then((res) => {
      if (res.code === 404) {
        setErrors({ ...errors, email: res.message });
      }
      if (res.code === 200) {
        window.location.reload();
      }
    });
  };

  return (
    <div className="forget-password">
      <h3>Please type in your email you registered:</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          name="email"
          autoFocus
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Button text="SUBMIT" type="submit" />
      </form>
    </div>
  );
};

export default ForgotPassword;
