import React from 'react';
import { connect } from "react-redux";

import { receivedMessage } from './ducks/messages';
import { joinRoom, topicUpdated, receivedPresenceAvailable, receivedPresenceUnavailable } from './ducks/muc';

import Client from './xmppClient';

import MessageList from './MessageList';
import ParticipantList from './ParticipantList';
import MessageForm from './MessageForm';

class Room extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roomJid: props.match.params.jid,
            nickname: 'JonnyHeavey'
        };
    }

    componentDidMount() {

        Client.on("message", (message) => {

            // TODO move this to another class somewhere?!

            // TODO filter!
            // TODO topic!

            if(message.subject && message.type === 'groupchat') {
                this.props.topicUpdated(message);
                this.props.receivedMessage(message);
                return;
            }

            if(message.body && message.type === 'groupchat') {
                this.props.receivedMessage(message);
            }

        });

        // Presence handlers
        Client.on("muc:available", (presence) => {

            // TODO work out where the undefined user is coming from
            // TODO understand why 2 online presences are sent
            if(presence.from.resource !== "undefined") {

                let statusMessage = {
                    type: 'status',
                    subject: presence.from.resource + ' has joined the room'
                };

                this.props.receivedMessage(statusMessage);
                this.props.receivedPresenceAvailable(presence);
            }
        });

        Client.on("muc:unavailable", (presence) => {
            if(presence.from.resource !== "undefined") {

                let statusMessage = {
                    type: 'status',
                    subject: presence.from.resource + ' has left the room'
                };

                this.props.receivedMessage(statusMessage);
                this.props.receivedPresenceUnavailable(presence);

            }
        });

        if(this.state.roomJid) {
            this.props.joinRoom(this.state.roomJid);
            Client.joinRoom(this.state.roomJid, this.state.nickname);
        } else {
            // TODO error
        }

    }

    componentWillUnmount() {
        // Client.leaveRoom(this.props.jid);

        // TODO clear state?
    }

    componentWillUpdate() {

    }

    render() {

        return (
        <div className="Room">
            <h3>{ this.props.jid }</h3>
            {this.props.topic && 
                <h4 className="roomTopic">{ this.props.topic }</h4>}
            <MessageList currentNickname={this.state.nickname} messages={this.props.messages}></MessageList>
            <ParticipantList members={this.props.members}></ParticipantList>
            <MessageForm roomJid={this.state.roomJid}></MessageForm>
        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  jid: state.muc.jid,
  messages: state.messages,
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