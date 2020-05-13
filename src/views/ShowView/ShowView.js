import React, { useContext } from 'react';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Select from 'components/Select/Select';
import Button from 'components/Button/Button';
import { AppContext } from 'context';
import PageTitle from '../../components/PageTitle/PageTitle';

const ShowView = () => {
  const context = useContext(AppContext);

  return (
    <>
      <PageTitle>Search show</PageTitle>
      <Form
        initialValues={{
          category: '',
          email: '',
          password: '123',
          repeatPassword: '123',
          message: '',
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
          category: [
            {
              correct: values.category.length,
              errorMessage: 'Category needs a value!',
            },
          ],
          message: [],
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
        render={(values, errors, handleChange, handleBlur) => (
          <div style={{ background: 'white' }}>
            <Select
              id="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              name="category"
              label="Category"
              error={errors.category}
              options={context.stateCategories}
              placeholder="Choose a category"
              lightTheme
              withButton
            />
            <Field
              id="message"
              type="textarea"
              placeholder="Enter your message"
              value={values.message}
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Message"
              lightTheme
              error={errors.message}
            />
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
};

export default ShowView;
