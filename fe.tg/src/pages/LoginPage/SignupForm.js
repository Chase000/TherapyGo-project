import React, { useState } from 'react';
import Input from '../../components/reusableComponent/Input';
import { signup } from '../../api/login';
import MyButton from '../../components/LoginFormComponent/MyButton';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  mobile: '',
};

const Signup = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    const reg = {};
    reg.name = /^\w{4,16}$/;
    reg.email = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    reg.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;

    if ('name' in fieldValues)
      temp.name = reg.name.test(fieldValues.name) ? '' : 'This field is required.';
    if ('email' in fieldValues)
      temp.email = reg.email.test(fieldValues.email) ? '' : 'Email is not valid.';
    if ('password' in fieldValues) {
      if (fieldValues.password.length < 6) {
        temp.password = 'Password is at least 6 characters';
      } else {
        temp.password = reg.password.test(fieldValues.password)
          ? ''
          : 'Password must include 1 uppercase letter and 1 number.';
      }
    }
    if ('confirmPassword' in fieldValues)
      temp.confirmPassword =
        fieldValues.confirmPassword === values.password ? '' : 'Password must be matched';

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(values)
      .then((res) => {
        if (res.code === 409) {
          setErrors({ ...errors, email: res.message });
        }
      })
      .catch((err) => {
        throw new Error(`Sign up form - sign up fail ${err}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="Name"
        name="name"
        autoFocus
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Input
        type="password"
        label="Confirm password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <div className="register-buttons">
        <MyButton text="SUBMIT" type="submit" />
        <MyButton type="reset" text="RESET" onClick={resetForm} />
      </div>
    </form>
  );
};

export default Signup;
