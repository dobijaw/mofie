import React from 'react';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import styles from './AuthenticationView.module.scss';

const AuthenticationView = () => (
  <div className={styles.wrapper}>
    <Form
      initialValues={{
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
      }}
      validate={(values) => ({
        username: [
          {
            correct: values.username.length > 5,
            errorMessage: 'Username is to short',
          },
          {
            correct: values.username.length <= 15,
            errorMessage: 'Username is to long',
          },
        ],
        email: [
          {
            correct: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
            errorMessage: "It's not an email",
          },
        ],
        password: [
          {
            correct: values.password
              .split('')
              .some((i) => i === i.toUpperCase()),
            errorMessage: 'One uppercase needed',
          },
          {
            correct: values.password.length > 8,
            errorMessage: 'Username is to short',
          },
          {
            correct: values.password.length <= 15,
            errorMessage: 'Username is to long',
          },
        ],
        repeatPassword: [
          {
            correct: values.repeatPassword === values.password,
            errorMessage: 'Sorry! Please provide correct password',
          },
        ],
      })}
      onSubmit={(values) => {
        fetch('http://localhost:9000/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          });
      }}
      render={(values, errors, handleChange, handleBlur) => (
        <>
          <Field
            id="username"
            type="text"
            placeholder="Your username"
            value={values.username}
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Username"
            error={errors.username}
          />
          <Field
            id="email"
            type="email"
            placeholder="Your email"
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            error={errors.email}
          />
          <Field
            id="password"
            type="password"
            placeholder="Your password"
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            error={errors.password}
          />
          <Field
            id="repeatPassword"
            type="password"
            placeholder="Repeat your password"
            value={values.repeatPassword}
            name="repeatPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password repeat"
            error={errors.repeatPassword}
          />
          <Button type="submit">Sign Up</Button>
        </>
      )}
    />
  </div>
);

export default AuthenticationView;
