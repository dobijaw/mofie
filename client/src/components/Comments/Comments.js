import React, { useContext, useState } from 'react';
import Select from 'components/Select/Select';
import Form from 'components/Form/Form';
import Button from 'components/Button/Button';
import { AppContext, RootContext } from 'context';
import Field from 'components/Field/Field';
import { updateInCollection } from 'actions/collection';
import SubHeadline from '../SubHeadline/SubHeadline';
import styles from './Comments.module.scss';
import CommentsItem from './CommentsItem/CommentsItem';

const Comments = ({ category, rate, comment, collectionItemID }) => {
  const { categories, collectionDispatch } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const { ratingScale } = useContext(RootContext);

  return (
    <section className={styles.comments}>
      <SubHeadline>My comments</SubHeadline>
      <div className={styles.comments_section}>
        <div className={styles.comments_data}>
          {visible ? (
            <Form
              initialValues={{
                category: categories.find((item) => item.id === category),
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
                const customData = {
                  categoryId: values.category.id,
                  comment: values.comment,
                  rate: {
                    id: values.rate.id,
                    value: values.rate.value,
                  },
                };
                updateInCollection(collectionDispatch, collectionItemID, customData);
                setVisible(false);
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
                    addNewItem
                    className={styles.comments_formItem}
                  />
                  <Select
                    id="rate"
                    value={values.rate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="rate"
                    label="Rate"
                    error={errors.rate}
                    options={ratingScale}
                    placeholder="Choose a rate"
                    className={styles.comments_formItem}
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
                    className={styles.comments_formItem}
                  />
                  <Button type="submit">update production</Button>
                </>
              )}
            />
          ) : (
            <>
              <CommentsItem title="rate">{rate.value}</CommentsItem>
              <CommentsItem title="category">
                {categories.find((item) => item.id === category)?.value}
              </CommentsItem>
              <CommentsItem title="comment">{comment}</CommentsItem>
            </>
          )}
        </div>
        <Button className={styles.comments_button} handleClick={() => setVisible(!visible)}>
          {visible ? 'close' : 'edit'}
        </Button>
      </div>
    </section>
  );
};

export default Comments;
