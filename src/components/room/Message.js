import React from 'react';
import Moment from 'react-moment';
import momentjs from 'moment';
import ReactTooltip from 'react-tooltip'
import Highlighter from 'react-highlight-words';

class Message extends React.Component {

    formatMessageDateTime(time) {
        return momentjs(time).format('Do MMM YYYY [at] h:mm A');
    }

    renderMessage() {

        let msg = this.props.message;

        if(msg.subject) {
            return this.renderTopic();
        } else if(msg.type === 'available' || msg.type === 'unavailable') {
            return this.renderPresence();
        } else {
            return this.renderChatMessage();
        }
        
    }

    renderChatMessage() {
        return (
            <div className="chat">
                <span className="author">{this.props.message.from.resource}</span>
                <Moment format="h:mm A" data-tip={this.formatMessageDateTime(this.props.message.time)}>{this.props.message.time}</Moment>
                <ReactTooltip effect="solid" delayShow={300} offset={{right: 20}} />
                <p>
                    <Highlighter
                    highlightClassName='highlight'
                    searchWords={['surevine']}
                    textToHighlight={this.props.message.body}
                    />
                </p>
            </div>
        );
    }

    renderTopic() {
        return (
            <div className="topic">
                <p><span>The room topic has been set to: </span> {this.props.message.subject}</p>
            </div>
        );
    }

    renderPresence() {

        if(this.props.message.type === 'available') {

            return (
                <div className="presence">
                    <p>{this.props.message.from.resource} joined the room.</p>
                </div>
            );

        }

        return (
            <div className="presence">
                <p>{this.props.message.from.resource} left the room.</p>
            </div>
        );
    }

    render() {
        return (
            <div className="Message">
                { this.renderMessage() }
            </div>
        );
    }

}

export default Message;