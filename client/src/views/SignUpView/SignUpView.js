import React, { useState, useContext, useRef, useEffect } from 'react';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import { routes } from 'routes';
import { registration } from 'actions/user';
import { AppContext } from 'context';
import { Redirect } from 'react-router';
import Checkbox from 'components/Checkbox/Checkbox';
import Bar from 'components/Bar/Bar';

const SignUpView = () => {
  const { user, userDispatch } = useContext(AppContext);
  const [isMessageVisible, toggleMessage] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => emailRef.current.focus(), [user]);

  const isAnyCapitalLetter = (value) =>
    value.split('').some((chart) => isNaN(chart * 1) && chart === chart.toUpperCase());

  const isAnyNumber = (value) => value.split('').some((chart) => !isNaN(chart * 1));

  return (
    <>
      {user.isAuth && <Redirect to={routes.home} />}
      {isMessageVisible && (
        <Bar
          message="Incorrect data. Make sure you enter the correct details."
          handleClose={() => toggleMessage(false)}
        />
      )}

      <UserAuthentication
        title="Sign up"
        copy="Already have an account?"
        description="Enter your email to create an account."
        errorMessage="Sorry, the account with the given address already exists. Enter a different email address."
        route={routes.login}
        routeName="Login"
      >
        <Form
          inputRequiringCleaning={['password', 'repeatPassword', 'accept']}
          checkChanges={user}
          initialValues={{
            email: '',
            password: '',
            repeatPassword: '',
            accept: false,
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
            accept: [
              {
                correct: values.accept,
                errorMessage: 'To set up an account, accept the terms.',
              },
            ],
          })}
          onSubmit={(values) => {
            registration(userDispatch, {
              email: values.email,
              password: values.password,
            });
          }}
          onSubmitCancel={() => {
            toggleMessage(true);
          }}
          render={(values, errors, handleChange, handleBlur, disabledSubmit) => (
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
                fieldRef={emailRef}
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
                message="Between 6 and 18 characters, at least one upper case letter and one number."
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
              <Checkbox
                id="accept"
                type="checkbox"
                value={values.accept}
                name="accept"
                onChange={handleChange}
                onBlur={handleBlur}
                label="I understand that this is only a demo of an application created as part of learning."
                error={errors.accept}
              />
              <Button type="submit" inForm disabled={disabledSubmit}>
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
