import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import find from 'lodash/find';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

import { joinRoom } from '../../ducks/rooms';

import history from '../../history';

class RoomList extends React.Component {

    isRoomActive(jid) {
        if(this.props.rooms[jid] && this.props.rooms[jid].isCurrent) {
            return true;
        }
        return false;
    }

    // TODO replace this with state flag?
    isRoomBookmarked(jid) {
        return find(this.props.bookmarks.conferences, function(bookmark) {
            return bookmark.jid.bare === jid
        });
    }

    isRoomUnread(jid) {
        if(this.props.rooms[jid]) {
            return (this.props.rooms[jid].unreadMessageCount > 0);
        }
        return false;
    }

    getRoomUnread(jid) {
        if(this.props.rooms[jid]) {

            // TODO make this limit configurable
            if(this.props.rooms[jid].unreadMessageCount > 10) {
                return "10+";
            }

            return this.props.rooms[jid].unreadMessageCount
        }
    }

    goToRoom = (jid) => {

        // Only join once
        if(!this.props.rooms[jid] || !this.props.rooms[jid].joined) {

            // TODO consider fallback global nickname OR saving nickname for bookmarks from previous session
            this.props.joinRoom(jid, this.props.client.jid.local);

        }

        history.push('/room/' + jid);
    };

    render() {
        
        return (
        <div className="RoomList">
            <h3>Bookmarked Rooms</h3>
            
            { this.props.bookmarks.conferences ? (
                <ul>
                    { this.props.bookmarks.conferences
                        .sort((a, b) => a.jid.bare > b.jid.bare)
                        .map(room => (
                        <li key={"bookmark-" + room.jid.bare}>
                            <a onClick={() => this.goToRoom(room.jid.bare)} className={(this.isRoomActive(room.jid.bare)) ? "active" : ""}>
                                <FontAwesome name='hashtag' /><span className="local">{room.jid.local}</span>
                                { this.isRoomUnread(room.jid.bare) && (
                                    <span className="unread badge">{this.getRoomUnread(room.jid.bare)}</span>
                                )}
                                {/* <span className="domain">@{room.jid.domain}</span> */}
                            </a>
                        </li>
                    ))}
                </ul>

            ) : (
                <div>Loading...</div>
            )}

            <h3>Rooms</h3>

            <Link to='/' className="joinRoom iconButton"
                data-offset="{'left': 2}"
                data-delay-show='100'
                data-tip="Join a room">
                <FontAwesome name='plus-circle' />
            </Link>

            {/* TODO DRY... */}

            { this.props.rooms ? (
                <ul>
                    { Object.keys(this.props.rooms)
                        .filter(roomJid => {
                            return !this.isRoomBookmarked(roomJid)
                        })
                        .sort((a, b) => a > b)
                        .map(roomJid => (
                        <li key={roomJid}>
                            <a onClick={() => this.goToRoom(roomJid)} className={(this.isRoomActive(roomJid)) ? "active" : ""}>
                                <FontAwesome name='hashtag' /><span className="local">{roomJid.substr(0, roomJid.indexOf('@'))}</span>
                                { this.isRoomUnread(roomJid) && (
                                    <span className="unread badge">{this.getRoomUnread(roomJid)}</span>
                                )}
                            </a>
                        </li>                        
                    ))}
                </ul>

            ) : (
                <div>
                    <p className="noRooms">You have not joined any rooms. <Link to='/'>Click here</Link> to join a room.</p>
                </div>
            )}

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  bookmarks: state.bookmarks,
  client: state.client,
  rooms: state.rooms,
  recentRooms: state.local.recent
});

const mapDispatchToProps = (dispatch, props) => {
    return {
      joinRoom: (jid, nickname) => dispatch(joinRoom(jid, nickname)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
