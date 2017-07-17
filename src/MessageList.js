import React from 'react';

import Message from './Message';

class MessageList extends React.Component {

    render() {
        return (
        <div className="MessageList">
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