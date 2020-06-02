import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { updateInCollection } from 'actions/collection';
import { AppContext } from 'context';

import AddNewProduction from 'components/AddNewProduction/AddNewProduction';
import Button from 'components/Button/Button';
import CommentsItem from './CommentsItem/CommentsItem';
import SubHeadline from '../SubHeadline/SubHeadline';
import styles from './Comments.module.scss';

const Comments = ({ category, rate, comment, collectionItemID }) => {
  const { categories, collectionDispatch } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const handleSubmit = (values) => {
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
  };

  return (
    <section className={styles.comments}>
      <SubHeadline>My comments</SubHeadline>
      <div className={styles.comments_section}>
        <div className={styles.comments_data}>
          {visible ? (
            <AddNewProduction
              initialCategory={
                categories.find((item) => item.id === category) || {
                  id: 'nocategory',
                  value: '',
                }
              }
              initialRate={rate}
              initialComment={comment}
              handleSubmit={handleSubmit}
              buttonCopy="Update"
              listLightTheme
            />
          ) : (
            <>
              <CommentsItem title="rate">{rate.value}</CommentsItem>
              <CommentsItem title="category">
                {categories.find((item) => item.id === category)?.value || 'NO CATEGORY'}
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

Comments.propTypes = {
  category: PropTypes.string.isRequired,
  rate: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
  collectionItemID: PropTypes.string.isRequired,
};

export default Comments;
