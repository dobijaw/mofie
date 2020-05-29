import React, { useContext, useRef, useEffect } from 'react';
import UserAuthentication from 'components/UserAuthentication/UserAuthentication';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import { routes } from 'routes';
import { AppContext } from 'context';
import { Redirect } from 'react-router';
import { authenticate } from 'actions/user';

const LoginView = () => {
  const { user, userDispatch } = useContext(AppContext);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, [user]);

  return (
    <div>
      {user.isAuth && <Redirect to={routes.home} />}
      <UserAuthentication
        title="Login"
        description="Please enter your data to log in."
        errorMessage="Incorrect password or email. Please enter again."
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
          })}
          onSubmit={(values) => {
            authenticate(userDispatch, {
              email: values.email,
              password: values.password,
            });
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
