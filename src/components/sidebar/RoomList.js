import React from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

class RoomList extends React.Component {

    render() {
        return (
        <div className="RoomList">
            <h3>Rooms</h3>
            
            { this.props.bookmarks.conferences ? (
                <ul>
                    { this.props.bookmarks.conferences.map(room => (
                        <li key={room.jid.bare}><Link to={`/room/` + room.jid.bare}>#{room.jid.local}</Link></li>
                    ))}
                </ul>

            ) : (
                <div>Loading...</div>
            )}

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  bookmarks: state.bookmarks,
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    // getBookmarks: () => dispatch(getBookmarks),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
