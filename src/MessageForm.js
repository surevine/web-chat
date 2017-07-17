import React from 'react';

import Client from './xmppClient';

class MessageForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        let msg = this._message.value;
        this._message.value = '';

        Client.sendMessage({
            to: this.props.roomJid,
            type: 'groupchat',
            body: msg
        })
    };

    render() {
        return (
        <div className="MessageForm">
            <form className="form" onSubmit={this.handleSubmit}>
                <input ref={el => this._message = el} name="message" id="message" placeholder="Enter your message" />
                <input type="submit" value="Send" />
            </form>
        </div>
        );
    }

}

export default MessageForm;