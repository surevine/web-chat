import React from 'react';

import Message from './Message';

class MessageList extends React.Component {

    componentDidUpdate(prev, props) {
        // scroll message list to bottom
        var messageList = document.getElementById('messageList');
        messageList.scrollTop = messageList.scrollHeight;
    }

    render() {
        return (
        <div id="messageList" className="MessageList">
            { this.props.messages ? (
                <div>
                    { this.props.messages.map(message => (
                        <Message message={message} currentNickname={this.props.currentNickname} key={message.id}></Message>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
        );
    }

}

export default MessageList;