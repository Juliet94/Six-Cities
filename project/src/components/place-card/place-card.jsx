import React from 'react';
import {Link, generatePath} from 'react-router-dom';
import PropTypes from 'prop-types';
import offersProp from '../app/offers.prop';
import {AppRoute, Colors, PlaceCardPageType} from '../../const';
import {getPlaceRatingPercent} from '../../utils/place-card';

function PlaceCard({offer, pageType, setActivePlaceCard, activePlaceCard}) {
  const {
    id,
    previewImage,
    price,
    rating,
    title,
    type,
    isFavorite,
    isPremium,
  } = offer;

  const placeRating = getPlaceRatingPercent(rating);

  return (
    <article className={`${pageType.CLASS_LIST_ELEMENT} place-card`}
      onMouseEnter={pageType.TYPE === PlaceCardPageType.MAIN.TYPE ? () => {
        activePlaceCard = null;
        setActivePlaceCard(id);
      } : null}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${pageType.CLASS_LIST_ELEMENT_WRAPPER} place-card__image-wrapper`}>
        <Link to={{pathname: generatePath(AppRoute.OFFER, { id }), state: id }}>
          <img className="place-card__image" src={previewImage} width={pageType.CARD_IMAGE_WIDTH} height={pageType.CARD_IMAGE_HEIGHT} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19"
              style={{stroke: isFavorite ? Colors.FAVORITE_CHECKED : Colors.FAVORITE_NOT_CHECKED,
                fill: isFavorite ? Colors.FAVORITE_CHECKED : null}}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: placeRating}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={{pathname: generatePath(AppRoute.OFFER, { id }), state: id }}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  offer: offersProp,
  pageType: PropTypes.object.isRequired,
  setActivePlaceCard: PropTypes.func,
  activePlaceCard: PropTypes.number,
};

export default PlaceCard;
