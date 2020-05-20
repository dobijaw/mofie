import React, { useState, useEffect, useContext } from 'react';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import { routes } from 'routes';
import { AppContext } from 'context';
import { AUTH_SUCCESS } from 'actions/user';
import { Redirect } from 'react-router';
import { useUserContext } from 'hooks';

const LoginView = () => {
  const [logData, setLogData] = useState({});
  const state = useContext(AppContext);
  const isLoggedIn = useUserContext();

  useEffect(() => {
    if (logData.email && logData.password) {
      fetch('http://localhost:9000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: logData.email,
          password: logData.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          state.userDispatch({
            type: AUTH_SUCCESS,
            payload: {
              email: res.email,
              id: res._id,
            },
          });
          console.log(res);
        });
    }
  }, [logData, state]);

  return (
    <div>
      {isLoggedIn && <Redirect to="/" />}
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
            setLogData({
              email: values.email,
              password: values.password,
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
};

export default LoginView;
