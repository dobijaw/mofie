import React from 'react';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Button from 'components/Button/Button';
import PageTitle from '../../components/PageTitle/PageTitle';

const ShowView = () => (
  <>
    <PageTitle>Search show</PageTitle>
    <Form
      initialValues={{
        email: '',
        password: '123',
        repeatPassword: '123',
      }}
      validate={(values) => ({
        email: [
          {
            correct: !!values.email,
            errorMessage: 'Needs data',
          },
          {
            correct: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email),
            errorMessage: 'Sorry, this is not email',
          },
        ],
        password: [
          {
            correct: values.password.length >= 8,
            errorMessage: 'The password need min. 8 letters',
          },
          {
            correct: /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/.test(
              values.password,
            ),
            errorMessage: 'One capital letter required',
          },
        ],
        repeatPassword: [
          {
            correct: values.repeatPassword === values.password,
            errorMessage: 'Incorrect password',
          },
        ],
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
      render={(values, errors, handleChange, handleBlur) => (
        <div>
          <Field
            id="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            lightTheme
            error={errors.email}
          />
          <Field
            id="password"
            type="text"
            placeholder="Enter your name"
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            lightTheme
            error={errors.password}
          />
          <Field
            id="repeatPassword"
            type="text"
            placeholder="Enter your name"
            value={values.repeatPassword}
            name="repeatPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            label="repeatPassword"
            lightTheme
            error={errors.repeatPassword}
          />
          <Button type="submit">Submit</Button>
        </div>
      )}
    />
  </>
);

export default ShowView;
