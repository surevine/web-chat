import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import history from './history'

import App from './App';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Main from './screens/Main';
import Room from './screens/Room';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import configureStore from "./store/configureStore";

const store = configureStore({});
window.store = store;

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
          <div>

            <App>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              
              <PrivateRoute path="/" exact={true} component={Main} />
              <PrivateRoute path="/room/:jid" component={Room} />
            </App>

          </div>
      </Router>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
