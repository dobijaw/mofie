import React, { useContext } from 'react';
import Select from 'components/Select/Select';
import Form from 'components/Form/Form';
import Button from 'components/Button/Button';
import { AppContext, RootContext } from 'context';
import Field from 'components/Field/Field';
import { updateInCollection } from 'actions/collection';
import SubHeadline from '../SubHeadline/SubHeadline';
import styles from './Comments.module.scss';

const Comments = ({ category, rate, comment, collectionItemID }) => {
  const { categories, collectionDispatch } = useContext(AppContext);
  const rootContext = useContext(RootContext);

  return (
    <section className={styles.comments}>
      <SubHeadline>My comments</SubHeadline>
      {/* <p>{rate}</p>
    <p>{category}</p>
    <p>{comment}</p>
    <button>edit</button> */}
      <Form
        initialValues={{
          category,
          rate,
          comment,
        }}
        validate={(values) => ({
          category: [
            {
              correct: values.category.value,
              errorMessage: 'Category required!',
            },
          ],
          rate: [
            {
              correct: values.rate.value,
              errorMessage: 'Rate required!',
            },
          ],
          comment: [
            {
              correct: values.comment.length,
              errorMessage: 'Comment required!',
            },
          ],
        })}
        onSubmit={(values) => {
          // handleSubmit(values);
          updateInCollection(collectionDispatch, collectionItemID, values);
        }}
        render={(values, errors, handleChange, handleBlur) => (
          <>
            <Select
              id="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              name="category"
              label="Category"
              error={errors.category}
              options={categories}
              placeholder="Choose a category"
              withButton
            />
            <Select
              id="rate"
              value={values.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              name="rate"
              label="Rate"
              error={errors.rate}
              options={rootContext.ratingScale}
              placeholder="Choose a rate"
            />
            <Field
              id="comment"
              type="textarea"
              placeholder="Enter your name"
              value={values.comment}
              name="comment"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Comment"
              error={errors.comment}
            />
            <Button type="submit">update production</Button>
          </>
        )}
      />
    </section>
  );
};

export default Comments;
