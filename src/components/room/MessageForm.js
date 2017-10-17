import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import TextareaAutosize from 'react-autosize-textarea';

import styles from './MessageForm.css';

import { getCurrentRoomJid } from '../../selectors';
import { sendMessage } from '../../ducks/messages';
import { saveRoomDraft } from '../../ducks/rooms';

import SendFormControl from './SendFormControl';

class MessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.roomJid !== this.props.roomJid) {
            this.saveDraft();
        }
    }

    componentDidUpdate(prevProps, prevState) { 
        if(prevProps.roomJid !== this.props.roomJid) {
            this.textarea.focus();
            if(this.props.rooms[this.props.roomJid] &&
                this.props.rooms[this.props.roomJid].draft !== '') {
                this.setState({ msg: this.props.rooms[this.props.roomJid].draft });
            }
        }
    }

    componentWillUnmount() {
        this.saveDraft();
    }

    render() {
        return (
        <div className="MessageForm">

            <SendFormControl enabled={this.props.enabled}></SendFormControl>

            <form className="form message" autoComplete="off">
                <TextareaAutosize 
                    name="message" 
                    id="sendMessage" 
                    innerRef={ref => this.textarea = ref}
                    maxRows={5}
                    value={this.state.msg}
                    disabled={this.props.enabled ? "" : "disabled"}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyPress}
                    onChange={(e) => this.setState({ msg: e.target.value })}
                    placeholder="Send a message"></TextareaAutosize>
            </form>
            
        </div>
        );
    }

    saveDraft() {
        this.props.saveRoomDraft(this.props.roomJid, this.state.msg);
        this.setState({ msg: ''});
    }

    handleSubmit() {

        let msg = this.state.msg.trim();

        if(msg && msg.length > 0) {
            this.props.sendMessage({
                to: this.props.roomJid,
                type: 'groupchat',
                body: msg
            });
        }

        this.setState({ msg: '' });
    };

    handleKeyDown = e => {
        // Prevent new line in text area when return pressed unless shift is also pressed
        if(e.nativeEvent.keyCode === 13) {
            if(!e.nativeEvent.shiftKey) {
                e.preventDefault();
            }
        }
    }

    handleKeyPress = e => {
        if(e.nativeEvent.keyCode === 13) {
            if(!e.nativeEvent.shiftKey) {
                e.preventDefault();
                this.handleSubmit();
                return false;
            }
        }
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