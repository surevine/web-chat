import React from 'react';
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

class RoomList extends React.Component {

    isRoomActive(jid) {
        if(this.props.rooms[jid] && this.props.rooms[jid].isCurrent) {
            return true;
        }
        return false;
    }

    isRoomUnread(jid) {
        if(this.props.rooms[jid]) {
            return (this.props.rooms[jid].unreadMessageCount > 0);
        }
        return false;
    }

    getRoomUnread(jid) {
        if(this.props.rooms[jid]) {
            return this.props.rooms[jid].unreadMessageCount
        }
    }

    render() {
        return (
        <div className="RoomList">
            <h3>Bookmarked Rooms</h3>
            
            { this.props.bookmarks.conferences ? (
                <ul>
                    { this.props.bookmarks.conferences
                        .sort((a, b) => a.jid.bare > b.jid.bare)
                        .map(room => (
                        <li key={room.jid.bare}>
                            <Link to={`/room/` + room.jid.bare} className={(this.isRoomActive(room.jid.bare)) ? "active" : ""}>
                                <span>#</span><span className="local">{room.jid.local}</span>
                                { this.isRoomUnread(room.jid.bare) && (
                                    <span className="unread badge">{this.getRoomUnread(room.jid.bare)}</span>
                                )
                                }
                                {/* <span className="domain">@{room.jid.domain}</span> */}
                            </Link>
                        </li>
                    ))}
                </ul>

            ) : (
                <div>Loading...</div>
            )}

            <h3>Recent Rooms</h3>

            {/* TODO ensure a room doesn't appear in both. Bookmark should take priority */}
            {/* Move this to the join form page */}

            { this.props.recentRooms ? (
                <ul>
                    { this.props.recentRooms
                        .map(room => (
                        <li key={room.jid.bare}><Link to={`/room/` + room.jid.bare}><span>#</span>{room.jid.local}</Link></li>
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
  rooms: state.rooms,
  recentRooms: state.local.recent
});

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
