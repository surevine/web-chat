import React from 'react';
import { connect } from "react-redux";

import EnterRoomForm from '../components/main/EnterRoomForm';

class Home extends React.Component {

    render() {
        return (
        <div className="Home">
            <h4>Join a room</h4>
            <EnterRoomForm />

            {/* <h3>Recent Rooms</h3>
            { this.props.recentRooms ? (
                <ul>
                    { this.props.recentRooms
                        .map(room => (
                        <li key={room.jid.bare}><Link to={`/room/` + room.jid.bare}><span>#</span>{room.jid.local}</Link></li>
                    ))}
                </ul>

            ) : (
                <div>Loading...</div>
            )} */}

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    recentRooms: state.local.recent
});

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
  