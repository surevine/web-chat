import React from 'react';
import { connect } from 'react-redux';

import { getCurrentRoomJid } from '../../selectors';

import { sendMessage } from '../../ducks/messages';

class MessageForm extends React.Component {

    componentDidMount() {
        this._message.focus();
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
        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  roomJid: getCurrentRoomJid(state),
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    sendMessage: (msg) => dispatch(sendMessage(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);