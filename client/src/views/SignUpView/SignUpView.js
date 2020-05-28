import React, { useContext, useEffect, useState } from 'react';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import { routes } from 'routes';
import { registration , clearErrors } from 'actions/user';
import { AppContext } from 'context';
import { Redirect } from 'react-router';


const SignUpView = () => {
  const { user, userDispatch } = useContext(AppContext);
  const [authErrors, toggleAuthErrors] = useState(false);

  useEffect(() => () => clearErrors(userDispatch), [userDispatch]);
  useEffect(() => toggleAuthErrors(!!user.error), [user]);

  const isAnyCapitalLetter = (value) =>
    value.split('').some((chart) => isNaN(chart * 1) && chart === chart.toUpperCase());

  const isAnyNumber = (value) => value.split('').some((chart) => !isNaN(chart * 1));

  return (
    <>
      {user.isAuth && <Redirect to={routes.home} />}
      <UserAuthentication
        title="Sign up"
        copy="Already have an account?"
        description="Enter your email to create an account."
        errorMessage="Sorry, the account with the given address already exists. Enter a different email address."
        isAnyError={authErrors}
        clearErrorsAfterClose={() => clearErrors(userDispatch)}
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
                errorMessage: "Opps, it doesn't look like e-mail.",
              },
            ],
            password: [
              {
                correct: isAnyCapitalLetter(values.password),
                errorMessage: 'Enter at least one upper case letter.',
              },
              {
                correct: isAnyNumber(values.password),
                errorMessage: 'Enter at least one number.',
              },
              {
                correct: values.password.length >= 6,
                errorMessage: 'The password is too short.',
              },
              {
                correct: values.password.length <= 18,
                errorMessage: 'No exaggeration :) 18 characters are enough for sure.',
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
