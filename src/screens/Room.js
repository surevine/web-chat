import React from 'react';
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

import { receivedMessage } from '../ducks/messages';
import { topicUpdated, receivedPresenceAvailable, receivedPresenceUnavailable } from '../ducks/muc';

import { joinRoom } from '../ducks/rooms';
import { addBookmark, removeBookmark } from '../ducks/bookmarks';

import { getRoomMessages, isRoomBookmarked } from '../selectors';

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

        console.log('component did mount');

        // TODO we need to refactor this - don't use state like this... get from currentRoom in store?
        if(this.state.roomJid) {

            console.log(this.props)

            this.props.joinRoom(this.state.roomJid, this.props.nickname);
        } else {
            // TODO error
        }

    }

    componentWillUnmount() {

        console.log('component will unmount');

        // Client.leaveRoom(this.state.roomJid);
        // TODO clear state?
    }

    componentWillUpdate(nextProps, nextState) {

        // console.log('component will update')

        if(nextProps.match.params.jid !== this.state.roomJid) {
            // console.log('room has changed, need to join... ' + nextProps.match.params.jid);

            // this.props.joinRoom(nextProps.match.params.jid);

            // this.setState(function(prevState, props) {
            //     return {
            //         ...prevState,
            //         roomJid: nextProps.match.params.jid
            //     };
            // });

        } else {
            // console.log('but room hasnt changed')
        }

    }

    componentDidUpdate(prevProps, prevState) {

        // console.log('component did update!')

        

    }

    render() {
        return (
        <div className={"Room" + (this.state.showRoomSidebar ? ' sidebar' : '')}>

            <RoomHeader 
                jid={this.props.jid} 
                bookmarked={this.props.bookmarked}
                topic={this.props.topic} 
                members={this.props.members}
                toggleBookmark={this.toggleBookmark}
                toggleParticipants={this.toggleParticipants} />

            <div className="roomContent">

                <MessageList currentNickname={this.state.nickname} messages={this.props.messages}></MessageList>

                <MessageForm roomJid={this.props.jid}></MessageForm>

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
            this.props.removeBookmark(this.props.jid);
        } else {
            this.props.addBookmark(this.props.jid);
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

}

const mapStateToProps = (state, props) => ({
  jid: state.muc.jid,
  nickname: state.user.nickname,
  bookmarked: isRoomBookmarked(state, { roomJid: state.muc.jid }),
  messages: getRoomMessages(state, { roomJid: state.muc.jid }),
  topic: state.muc.topic,
  members: state.muc.members
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addBookmark: (jid) => dispatch(addBookmark(jid)),
    removeBookmark: (jid) => dispatch(removeBookmark(jid)),
    joinRoom: (jid, nickname) => dispatch(joinRoom(jid, nickname)),
    receivedMessage: (msg) => dispatch(receivedMessage(msg)),
    topicUpdated: (msg) => dispatch(topicUpdated(msg)),
    receivedPresenceAvailable: (presence) => dispatch(receivedPresenceAvailable(presence)),
    receivedPresenceUnavailable: (presence) => dispatch(receivedPresenceUnavailable(presence)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);