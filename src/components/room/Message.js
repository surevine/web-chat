import React from 'react';
import Moment from 'react-moment';
import momentjs from 'moment';
import ReactTooltip from 'react-tooltip'
import Highlighter from 'react-highlight-words';
import FontAwesome from 'react-fontawesome';
import find from 'lodash/find';

import Form from './Form';

class Message extends React.Component {

    formatMessageDateTime(time) {
        return momentjs(time).format('Do MMM YYYY [at] h:mm A');
    }

    getFormUpdated(form) {
        let lastUpdateField = find(form.form.fields, function(field) {
            return ((field.type === "hidden") && (field.name === "jchat.last_modified"));
        });
        return parseInt(lastUpdateField.value);
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

    renderFormPreview() {
        return (
            <div className="form">

                <span className="author">{this.props.message.from.resource}</span>
                <Moment format="h:mm A" data-tip={this.formatMessageDateTime(this.props.message.time)}>{this.props.message.time}</Moment>
                <ReactTooltip effect="solid" delayShow={300} offset={{right: 20}} />

                <div className="formPreview">
                    <FontAwesome name='file-text' className="icon" />
                    <p className="reference">{ this.props.message.form.fields[0].value }</p>  
                    <Moment format="Do MMMM YYYY, h:mm:ss a">{this.getFormUpdated(this.props.message)}</Moment>
                    
                    {/* MAKE THIS TOGGLE RAW MESSAGE?! */}
                    <a className="showRaw">Show Raw</a>

                    <div className="raw">
                        {/* {this.props.message.body} */}

                        {this.props.message.body.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}

                    </div>

                    {/* MAKE THIS TOGGLE BELOW?! */}
                    <a className="expand">Show form fields</a>

                    {/* MAKE THIS SHOW IN DIALOG */}
                    {/* MOVE THIS TO A COMPONENT ON ITS OWN */}
                    <Form fields={ this.props.message.form.fields } />

                </div>


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