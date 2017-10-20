import React from 'react';
import Moment from 'react-moment';
import momentjs from 'moment';
import ReactTooltip from 'react-tooltip'
import Highlighter from 'react-highlight-words';

import FormPreview from './messages/FormPreview';

class Message extends React.Component {

    render() {
        return (
            <div className="Message">
                { this.renderMessage() }
            </div>
        );
    }

    formatMessageDateTime(time) {
        return momentjs(time).format('Do MMM YYYY [at] h:mm A');
    }

    renderMessage() {

        let msg = this.props.message;

        if(msg.form) {
            return this.renderFormPreview();
        } else if(msg.subject) {
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
                <Moment format="h:mm A"
                        data-tip
                        data-for={this.props.message.id+'Tip'}>
                        {this.props.message.time}
                </Moment>
                <ReactTooltip id={this.props.message.id+'Tip'} place="top" effect='solid' delayShow={300} offset={{right:20}}>
                    <span>{this.formatMessageDateTime(this.props.message.time)}</span>
                </ReactTooltip>

                <p>
                <Highlighter
                    highlightClassName='highlight'
                    searchWords={this.props.keywords}
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

    renderFormPreview() {

        // TODO load the form from state...

        return (
            <div className="form">
                <span className="author">{this.props.message.from.resource}</span>
                <Moment format="h:mm A"
                        data-tip
                        data-for={this.props.message.id+'Tip'}>
                        {this.props.message.time}
                </Moment>
                <ReactTooltip id={this.props.message.id+'Tip'} place="top" effect='solid' delayShow={300} offset={{right:20}}>
                    <span>{this.formatMessageDateTime(this.props.message.time)}</span>
                </ReactTooltip>
                <FormPreview message={this.props.message} formatMessageDateTime={this.formatMessageDateTime} />
            </div>
        );
    }

}

export default Message;