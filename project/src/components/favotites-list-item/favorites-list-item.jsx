import React from 'react';
import PropTypes from 'prop-types';
import offersProp from '../app/offers.prop';
import PlaceCard from '../place-card/place-card';
import {placeCardPageType} from '../../const';

function FavoritesListItem({favoriteOffers, favoriteCity}) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{favoriteCity}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffers.map((offer) =>
          <PlaceCard key={offer.id} offer={offer} pageType={placeCardPageType.favorite} />,
        )}
      </div>
    </li>
  );
}

FavoritesListItem.propTypes = {
  favoriteOffers: PropTypes.oneOfType([
    PropTypes.arrayOf(offersProp),
    offersProp,
  ]).isRequired,
  favoriteCity: PropTypes.string.isRequired,
};

export default FavoritesListItem;
