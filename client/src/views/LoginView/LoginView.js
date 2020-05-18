import React from 'react';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import { routes } from 'routes';

const LoginView = () => (
  <div>
    <UserAuthentication
      title="Login"
      description="Please enter your data to log in."
      copy="Don't have an account?"
      route={routes.signup}
      routeName="Sign Up"
    >
      <Form
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => ({
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
        })}
        onSubmit={(values) => {
          fetch('http://localhost:9000/user/login', {
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
              id="email"
              type="email"
              placeholder="Type here..."
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
              placeholder="Type here..."
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Password"
              error={errors.password}
            />
            <Button type="submit">login</Button>
          </>
        )}
      />
    </UserAuthentication>
  </div>
);

export default LoginView;
