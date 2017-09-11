import React from 'react';
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

import history from '../history';

import { receivedMessage } from '../ducks/messages';
import { receivedPresenceAvailable, receivedPresenceUnavailable } from '../ducks/presence';
import { joinRoom, topicUpdated, currentRoom, leaveRoom } from '../ducks/rooms';
import { addBookmark, removeBookmark } from '../ducks/bookmarks';

import { 
    getRoomInfo, 
    getRoomMessages, 
    getRoomMembers, 
    isRoomBookmarked, 
    getCurrentRoomJid } from '../selectors';

import RoomHeader from '../components/room/RoomHeader';
import MessageList from '../components/room/MessageList';
import ParticipantList from '../components/room/ParticipantList';
import MessageForm from '../components/room/MessageForm';

class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomJid: props.match.params.jid,
            showRoomSidebar: false,
            showParticipantsList: false
        };
    }

    componentDidMount() {

        if(this.state.roomJid) {

            // TODO check that we've not already joined!

            this.props.joinRoom(this.state.roomJid, this.props.nickname);
            this.props.currentRoom(this.state.roomJid, this.props.nickname);
        }

    }

    componentWillUnmount() {
        // Client.leaveRoom(this.state.roomJid);
        // TODO clear state?
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.match.params.jid !== this.state.roomJid) {

            // TODO also need to change the isCurrent?!

            this.setState(function(prevState, props) {
                return {
                    ...prevState,
                    roomJid: nextProps.match.params.jid
                };
            });
            this.props.joinRoom(nextProps.match.params.jid, this.props.nickname);
            this.props.currentRoom(nextProps.match.params.jid, this.props.nickname);
        }
    }

    render() {
        return (
        <div className={"Room" + (this.state.showRoomSidebar ? ' sidebar' : '')}>

            <RoomHeader 
                jid={this.props.room.jid} 
                bookmarked={this.props.bookmarked}
                topic={this.props.room.topic} 
                members={this.props.members}
                toggleBookmark={this.toggleBookmark}
                toggleParticipants={this.toggleParticipants}
                leaveRoom={this.leaveRoom} />

            <div className="roomContent">

                <MessageList currentNickname={this.state.nickname} messages={this.props.messages}></MessageList>

                <MessageForm roomJid={this.props.room.jid}></MessageForm>

            </div>

            { this.state.showRoomSidebar && (
                <div className="roomSidebar">

                    <a className="closeSidebar iconButton" onClick={this.hideSidebar}>
                        <FontAwesome name='close' />
                    </a>

                    { this.state.showParticipantsList && (
                        <ParticipantList members={this.props.members}></ParticipantList>
                    )}
                </div>
                )}
            
        </div>
        );
    }

    hideSidebar = e => {
        e.preventDefault();
        this.setState({ 
            showRoomSidebar: false,
            showParticipantsList: false
        })
    };

    toggleBookmark = e => {
        e.preventDefault();
        if(this.props.bookmarked) {
            this.props.removeBookmark(this.props.room.jid);
        } else {
            this.props.addBookmark(this.props.room.jid);
        }
    };

    toggleParticipants = e => {
        e.preventDefault();
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showRoomSidebar: !prevState.showRoomSidebar,
                showParticipantsList: !prevState.showParticipantsList
            };
        });
    };

    leaveRoom = e => {
        e.preventDefault();
        this.props.leaveRoom(this.state.roomJid, this.props.nickname);
        history.push('/');
    }

}

const mapStateToProps = (state, props) => ({
  room: getRoomInfo(state, { roomJid: props.match.params.jid }),
  nickname: state.user.nickname, // TODO make this select from state what the nick should be...
  bookmarked: isRoomBookmarked(state, { roomJid: props.match.params.jid }),
  messages: getRoomMessages(state, { roomJid: props.match.params.jid }),
  members: getRoomMembers(state, { roomJid: props.match.params.jid })
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addBookmark: (jid) => dispatch(addBookmark(jid)),
    removeBookmark: (jid) => dispatch(removeBookmark(jid)),
    currentRoom: (jid, nickname) => dispatch(currentRoom(jid, nickname)),
    joinRoom: (jid, nickname) => dispatch(joinRoom(jid, nickname)),
    leaveRoom: (jid, nickname) => dispatch(leaveRoom(jid)),
    receivedMessage: (msg) => dispatch(receivedMessage(msg)),
    topicUpdated: (msg) => dispatch(topicUpdated(msg)),
    receivedPresenceAvailable: (presence) => dispatch(receivedPresenceAvailable(presence)),
    receivedPresenceUnavailable: (presence) => dispatch(receivedPresenceUnavailable(presence)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);