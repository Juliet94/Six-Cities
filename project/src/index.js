import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import App from './components/app/app';

import rootReducer from './store/root-reducer';
import {fetchOffersList, fetchFavorites, checkAuth} from './store/api-actions';
import {createAPI} from './services/api';
import {requireAuthorization} from './store/action';
import {AuthorizationStatus} from './const';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());
store.dispatch(fetchFavorites());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>,
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
