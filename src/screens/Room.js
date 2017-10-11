import React from 'react';
import { connect } from "react-redux";
import Spinner from 'react-spinkit';

import history from '../history';

import { receivedMessage } from '../ducks/messages';
import { receivedPresenceAvailable, receivedPresenceUnavailable } from '../ducks/presence';
import { joinRoom, topicUpdated, showRoom, hideRoom, leaveRoom } from '../ducks/rooms';
import { addBookmark, removeBookmark } from '../ducks/bookmarks';

import { 
    getRoomInfo, 
    getRoomMessages, 
    getRoomMembers,
    getRoomForms, 
    isRoomBookmarked } from '../selectors';

import RoomHeader from '../components/room/RoomHeader';
import RoomSidebar from '../components/room/RoomSidebar';
import MessageList from '../components/room/MessageList';

import MessageForm from '../components/room/MessageForm';

class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomJid: props.match.params.jid,
            showRoomSidebar: false,
            showParticipantsList: false,
            showFormsList: false,
        };
    }

    componentDidMount() {

        if(this.state.roomJid) {
            this.props.showRoom(this.state.roomJid, this.props.nickname);
        }

    }

    componentWillUnmount() {
        this.props.hideRoom(this.state.roomJid);
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

            this.props.showRoom(nextProps.match.params.jid, this.props.nickname);
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
                forms={this.props.forms}
                toggleBookmark={this.toggleBookmark}
                toggleParticipants={this.toggleParticipants}
                toggleForms={this.toggleForms}
                leaveRoom={this.leaveRoom} />

            <div className="roomContent">

            { (this.props.messages && !this.props.messages.length) ? (

                <Spinner className="loading" name="folding-cube" color="#8190B0"/>

            ) : (

                <MessageList currentNickname={this.state.nickname} messages={this.props.messages}></MessageList>

            )}

            <MessageForm roomJid={this.props.room.jid}></MessageForm>

            </div>


            { this.state.showRoomSidebar && (

                <RoomSidebar 
                    hideSidebar={this.hideSidebar}
                    showParticipantsList={this.state.showParticipantsList}
                    showFormsList={this.state.showFormsList}
                    members={this.props.members}
                    forms={this.props.forms} />

                )}
            
        </div>
        );
    }

    hideSidebar = e => {
        e.preventDefault();
        this.setState({ 
            showRoomSidebar: false,
            showParticipantsList: false,
            showFormsList: false
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

            // TODO refactor this...
            let showSidebar = false;
            if(!prevState.showParticipantsList) {
                showSidebar = true;
            }

            return {
                ...prevState,
                showRoomSidebar: showSidebar,
                showParticipantsList: !prevState.showParticipantsList,
                showFormsList: false
            };
        });
    };

    toggleForms = e => {
        e.preventDefault();
        this.setState(function(prevState, props) {

            // TODO refactor this...
            let showSidebar = false;
            if(!prevState.showFormsList) {
                showSidebar = true;
            }

            return {
                ...prevState,
                showRoomSidebar: showSidebar,
                showParticipantsList: false,
                showFormsList: !prevState.showFormsList
            };
        });
    };

    leaveRoom = e => {
        e.preventDefault();
        this.props.leaveRoom(this.state.roomJid);
        history.push('/');
    }

}

const mapStateToProps = (state, props) => ({
  room: getRoomInfo(state, { roomJid: props.match.params.jid }),
  rooms: state.rooms,
  nickname: state.user.nickname, // TODO make this select from state what the nick should be...
  bookmarked: isRoomBookmarked(state, { roomJid: props.match.params.jid }),
  messages: getRoomMessages(state, { roomJid: props.match.params.jid }),
  members: getRoomMembers(state, { roomJid: props.match.params.jid }),
  forms: getRoomForms(state, { roomJid: props.match.params.jid }),
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addBookmark: (jid) => dispatch(addBookmark(jid)),
    removeBookmark: (jid) => dispatch(removeBookmark(jid)),
    showRoom: (jid, nickname) => dispatch(showRoom(jid, nickname)),
    hideRoom: (jid) => dispatch(hideRoom(jid)),
    joinRoom: (jid, nickname, password) => dispatch(joinRoom(jid, nickname, password)),
    leaveRoom: (jid) => dispatch(leaveRoom(jid)),
    receivedMessage: (msg) => dispatch(receivedMessage(msg)),
    topicUpdated: (msg) => dispatch(topicUpdated(msg)),
    receivedPresenceAvailable: (presence) => dispatch(receivedPresenceAvailable(presence)),
    receivedPresenceUnavailable: (presence) => dispatch(receivedPresenceUnavailable(presence)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);