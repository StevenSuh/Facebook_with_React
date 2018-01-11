import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Login from './components/Login/App';
import Messenger from './components/Messenger/App';
import store from './reducers';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/messenger" component={Messenger} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

