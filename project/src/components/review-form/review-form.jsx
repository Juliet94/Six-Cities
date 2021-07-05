import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReviewRatingStars from '../review-rating-stars/review-rating-stars';
import {postReview} from '../../store/api-actions';

function ReviewForm({id, sendReview}) {
  const [userReview, setUserReview] = useState({rating: '', text: ''});

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    sendReview(id, userReview.text, userReview.rating);
    setUserReview({rating: '', text: ''});
  };
  const onTextChange = ({target}) => {
    setUserReview({...userReview, text: target.value});
  };
  const onRatingChange = ({target}) => {
    setUserReview({...userReview, rating: target.value});
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRatingStars onRatingChange={onRatingChange}/>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={50}
        onChange={onTextChange}
        value={userReview.text}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
  sendReview: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  sendReview: postReview,
};

export {ReviewForm};
export default connect(null, mapDispatchToProps)(ReviewForm);
