import React from 'react';

import Sidebar from './components/sidebar/Sidebar';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">

        <Sidebar />

        <div className="main">
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default App;
