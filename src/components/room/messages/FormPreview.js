import React from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';
import find from 'lodash/find';

import { getPublishedForm, getCurrentRoomJid } from '../../../selectors';
import { parseFormIdFromMessage } from '../../../helpers';

import { showFormModal } from '../../../ducks/rooms';

import './FormPreview.css';
import './Preview.css';

class FormPreview extends React.Component {

    constructor () {
        super();
        this.state = {
            showRaw: false
        };
    }

    render() {

        if(!this.props.publishedForm) {
            return null;
        }

        return (
            <div className="FormPreview preview">

                <FontAwesome name='file-text' className="fileIcon" />
                
                {<p className="reference">{ this.props.publishedForm.template.title }</p>  }
                <div className="metadata">
                    <Moment format="Do MMMM YYYY, HH:mm">{this.getFormUpdated(this.props.message)}</Moment>
                </div>
                
                <div className="actions">
                    {this.props.message.body && (
                        <a className="showRaw btn" onClick={this.toggleRaw.bind(this)}>Toggle Raw</a>
                    )}
                    <a className="expand btn" onClick={this.showModal.bind(this)}>View</a>
                </div>

                {this.state.showRaw && (

                    <div className="raw">
                        {this.props.message.body.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}
                    </div>   

                )}

            </div>
        );
    }

    showModal() {
        this.props.showFormModal(this.props.roomJid, this.props.publishedForm);
    }

    toggleRaw() {
        this.setState(function(prevState, props) {
            if(props.message.body) {
                return {
                    ...prevState,
                    showRaw: !prevState.showRaw
                };
            }
            return prevState;
        });
    }

    getFormUpdated(form) {
        let lastUpdateField = find(form.form.fields, function(field) {
            return (field.name === "jchat.last_modified");
        });
        return parseInt(lastUpdateField.value, 10);
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
    publishedForm: getPublishedForm(state, {
        formId: parseFormIdFromMessage(props.message)
    })
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
        showFormModal: (jid, form) => dispatch(showFormModal(jid, form)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormPreview);