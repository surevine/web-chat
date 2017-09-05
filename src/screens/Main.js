import React from 'react';

import EnterRoomForm from '../components/main/EnterRoomForm';

class Home extends React.Component {

    render() {
        return (
        <div className="Home">
            <h4>Enter Room</h4>
            <EnterRoomForm />
        </div>
        );
    }

}

export default Home;