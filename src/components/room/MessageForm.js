import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getCurrentRoomJid } from '../../selectors';

import { sendMessage } from '../../ducks/messages';
import { saveRoomDraft } from '../../ducks/rooms';

import SendFormControl from './SendFormControl';

class MessageForm extends React.Component {

    componentWillUpdate() {
        this.saveDraft();
    }

    componentDidUpdate() { 
        this._message.focus();

        if(this.props.rooms[this.props.roomJid] &&
            this.props.rooms[this.props.roomJid].draft !== '') {
    
            this._message.value = this.props.rooms[this.props.roomJid].draft;
        }
    }

    componentWillUnmount() {
        this.saveDraft();
    }

    saveDraft() {
        this.props.saveRoomDraft(this.props.roomJid, this._message.value);
        this._message.value = '';
    }

    handleSubmit = e => {
        e.preventDefault();

        let msg = this._message.value;

        if(msg && msg.length > 0) {
            this._message.value = '';

            this.props.sendMessage({
                to: this.props.roomJid,
                type: 'groupchat',
                body: msg
            });
        }

    };

    render() {
        return (
        <div className="MessageForm">
            <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
                <input ref={el => this._message = el} name="message" id="sendMessage" placeholder="Send a message" />
            </form>

            <SendFormControl></SendFormControl>
            
        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  roomJid: getCurrentRoomJid(state),
  rooms: state.rooms
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    sendMessage: (msg) => dispatch(sendMessage(msg)),
    saveRoomDraft: (jid, msg) => dispatch(saveRoomDraft(jid, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);