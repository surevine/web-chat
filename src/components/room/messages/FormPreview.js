import React from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip'
import FontAwesome from 'react-fontawesome';
import find from 'lodash/find';

import { getPublishedForm } from '../../../selectors';
import { parseFormIdFromMessage } from '../../../helpers';

import ViewFormModal from '../../modals/ViewFormModal';

class FormPreview extends React.Component {

    constructor () {
        super();
        this.state = {
            showRaw: false,
            showModal: false
        };
    }

    render() {

        return (
            <div className="FormPreview">

                <div className="formPreview">
                    <FontAwesome name='file-text' className="icon" />
                    {<p className="reference">{ this.props.publishedForm.template.title } - { this.props.publishedForm.id }</p>  }
                    <Moment format="Do MMMM YYYY, HH:mm">{this.getFormUpdated(this.props.message)}</Moment>
                    
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

                {/* TODO maybe make this a single modal for the room, which users can page through forms/files etc  */}
                <ViewFormModal form={this.props.publishedForm} isOpen={this.state.showModal} onClose={this.hideModal.bind(this)} />

            </div>
        );
    }

    showModal() {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showModal: true
            };
        });
    }

    hideModal() {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showModal: false
            };
        });
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
        return parseInt(lastUpdateField.value);
    }

}

// export default FormPreview;

const mapStateToProps = (state, props) => ({
    publishedForm: getPublishedForm(state, {
        formId: parseFormIdFromMessage(props.message)
    })
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormPreview);