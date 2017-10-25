import React from 'react';
import { connect } from "react-redux";

import Message from './Message';

import { getKeywords } from '../../selectors';

import './MessageList.css';

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
                        <Message message={message} keywords={this.props.keywords} currentNickname={this.props.currentNickname} key={message.id}></Message>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    keywords: getKeywords(state)
});
  
  const mapDispatchToProps = (dispatch, props) => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessageList);