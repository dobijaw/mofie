import React, { useContext } from 'react';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import { routes } from 'routes';
import { registration } from 'actions/user';
import { AppContext } from 'context';
import { Redirect } from 'react-router';

const SignUpView = () => {
  const { user, userDispatch } = useContext(AppContext);

  return (
    <>
      {user.isAuth && <Redirect to="/" />}
      <UserAuthentication
        title="Sign up"
        description="Enter your email to create an account."
        copy="Already have an account?"
        route={routes.login}
        routeName="Login"
      >
        <Form
          initialValues={{
            email: '',
            password: '',
            repeatPassword: '',
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
                correct: values.password.split('').some((i) => i === i.toUpperCase()),
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
            registration(userDispatch, {
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
                label="New password"
                error={errors.password}
              />
              <Field
                id="repeatPassword"
                type="password"
                placeholder="Type here..."
                value={values.repeatPassword}
                name="repeatPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Repeat password"
                error={errors.repeatPassword}
              />
              <Button type="submit" inForm>
                Sign Up
              </Button>
            </>
          )}
        />
      </UserAuthentication>
    </>
  );
};

export default SignUpView;
