import React from 'react';
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

import { receivedMessage } from '../ducks/messages';
import { topicUpdated, receivedPresenceAvailable, receivedPresenceUnavailable } from '../ducks/muc';

import { joinRoom } from '../ducks/rooms';

import { getRoomMessages } from '../selectors';

import RoomHeader from '../components/room/RoomHeader';
import MessageList from '../components/room/MessageList';
import ParticipantList from '../components/room/ParticipantList';
import MessageForm from '../components/room/MessageForm';

class Room extends React.Component {

    constructor(props) {
        super(props);

        // TODO have currentRoom action that sets current in state...
        this.state = {
            roomJid: props.match.params.jid,
            showRoomSidebar: false,
            showParticipantsList: false
        };
    }

    componentDidMount() {

        // TODO we need to refactor this - don't use state like this... get from currentRoom in store?
        if(this.state.roomJid) {
            this.props.joinRoom(this.state.roomJid);
        } else {
            // TODO error
        }

    }

    componentWillUnmount() {
        // Client.leaveRoom(this.state.roomJid);
        // TODO clear state?
    }

    componentWillUpdate() {

    }

    render() {
        return (
        <div className={"Room" + (this.state.showRoomSidebar ? ' sidebar' : '')}>

            <RoomHeader 
                jid={this.props.jid} 
                topic={this.props.topic} 
                members={this.props.members}
                toggleParticipants={this.toggleParticipants} />

            <div className="roomContent">

                <MessageList currentNickname={this.state.nickname} messages={this.props.messages}></MessageList>

                <MessageForm roomJid={this.state.roomJid}></MessageForm>

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

}

// TODO remove hardcoding of roomjid!
const mapStateToProps = (state, props) => ({
  jid: state.muc.jid,
  messages: getRoomMessages(state, { roomJid: state.muc.jid }),
  topic: state.muc.topic,
  members: state.muc.members
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    joinRoom: (jid) => dispatch(joinRoom(jid)),
    receivedMessage: (msg) => dispatch(receivedMessage(msg)),
    topicUpdated: (msg) => dispatch(topicUpdated(msg)),
    receivedPresenceAvailable: (presence) => dispatch(receivedPresenceAvailable(presence)),
    receivedPresenceUnavailable: (presence) => dispatch(receivedPresenceUnavailable(presence)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);