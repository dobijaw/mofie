import React, { useState, useContext, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import { AppContext } from 'context';
import { routes } from 'routes';
import { authenticate } from 'actions/user';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import Checkbox from 'components/Checkbox/Checkbox';
import Button from 'components/Button/Button';
import Field from 'components/Field/Field';
import Form from 'components/Form/Form';
import Bar from 'components/Bar/Bar';

const LoginView = () => {
  const { user, userDispatch } = useContext(AppContext);
  const [isMessageVisible, toggleMessage] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, [user]);

  return (
    <div>
      {user.isAuth && <Redirect to={routes.home} />}
      {isMessageVisible && (
        <Bar
          message="Incorrect email or password. Please enter again."
          handleClose={() => toggleMessage(false)}
        />
      )}

      <UserAuthentication
        title="Login"
        description="Please enter your data to log in."
        errorMessage="Incorrect email or password. Please enter again."
        copy="Don't have an account?"
        route={routes.signup}
        routeName="Sign Up"
      >
        <Form
          inputRequiringCleaning={['password']}
          checkChanges={user}
          initialValues={{
            email: '',
            password: '',
            stayLogIn: false,
          }}
          validate={(values) => ({
            email: [
              {
                correct: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
                errorMessage: 'The login must be an email.',
              },
            ],
            password: [
              {
                correct: values.password.length >= 6,
                errorMessage: 'Your password was probably longer?',
              },
              {
                correct: values.password.length <= 18,
                errorMessage: 'Oh, surely the password was shorter.',
              },
            ],
            stayLogIn: [],
          })}
          onSubmit={(values) => {
            authenticate(userDispatch, {
              email: values.email,
              password: values.password,
              stayLogIn: values.stayLogIn,
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
                label="Password"
                error={errors.password}
              />
              <Checkbox
                id="stayLogIn"
                type="checkbox"
                value={values.stayLogIn}
                name="stayLogIn"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Don't log me out"
                error={errors.stayLogIn}
              />
              <Button type="submit" inForm disabled={disabledSubmit}>
                login
              </Button>
            </>
          )}
        />
      </UserAuthentication>
    </div>
  );
};

export default LoginView;
