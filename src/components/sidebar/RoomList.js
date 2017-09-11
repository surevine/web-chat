import React from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

class RoomList extends React.Component {

    render() {
        return (
        <div className="RoomList">
            <h3>Bookmarked Rooms</h3>
            
            { this.props.bookmarks.conferences ? (
                <ul>
                    { this.props.bookmarks.conferences
                        .sort((a, b) => a.jid.bare > b.jid.bare)
                        .map(room => (
                        <li key={room.jid.bare}><Link to={`/room/` + room.jid.bare}>#{room.jid.local}</Link></li>
                    ))}
                </ul>

            ) : (
                <div>Loading...</div>
            )}

            <h3>Recent Rooms</h3>
            <p>TODO</p>

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  bookmarks: state.bookmarks,
});

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
