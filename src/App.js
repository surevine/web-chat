import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Room from './Room';

import './App.css';

import Client from './xmppClient';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

  componentDidMount() {

        Client.connect({
            jid: 'jonnyh@localhost',
            password: 'password'
        });

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>JChat</h2>
        </div>

        <BrowserRouter>
          <div>

            <Route path="/login" component={Login} />
            {/*<PrivateRoute exact={true} path="/" component={Home} />*/}
            {/*<PrivateRoute path="/room/:jid" component={Room} />*/}

            <Route exact={true} path="/" component={Home} />
            <Route path="/room/:jid" component={Room} />

          </div>
        </BrowserRouter>

      </div>
    );
  }
}

window.fakeAuth = {
  isAuthenticated: true
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    window.fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


export default App;
