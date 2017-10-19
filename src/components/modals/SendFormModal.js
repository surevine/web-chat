import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import Select from 'react-select';
import forIn from 'lodash/forIn';

import FormTemplate from '../forms/FormTemplate';
import { getCurrentRoomJid, getTemplateOptions } from '../../selectors';
import { submitForm } from '../../ducks/forms';

class SendFormModal extends React.Component {

    constructor () {
        super();
        this.state = {
            selectedTemplate: ''
        };
    }

    render() {

        let template = this.props.templates[this.state.selectedTemplate];

        return (

            <ReactModal 
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                className="Modal"
                overlayClassName="Overlay">

                <div className="header">
                    <a className="closeModal" onClick={this.props.onClose}>
                        &#x2715;
                    </a>
                    <h3>Publish form to {this.props.roomJid}</h3>
                </div>

                <div className="content">

                    {/* Conditionally render these instructions only when not selected! */}
                    <h3>Select Form Template</h3>
                    <Select
                        name="template"
                        value={this.state.selectedTemplate}
                        options={this.props.templateOpts}
                        onChange={this.selectFormTemplate.bind(this)}
                    />

                    { template && (

                        <FormTemplate
                            template={template}
                            onCancel={this.props.onClose}
                            onSubmit={this.handleFormSubmit.bind(this)} />

                    )}

                </div>

            </ReactModal>

        );
    }

    handleFormSubmit(form) {

        let templateNode = this.state.selectedTemplate;
        let submissionNode = templateNode.replace("fdp/template", "fdp/submitted");
        this.props.submitForm(submissionNode, this.buildFormData(form), this.props.roomJid);

        this.props.onClose();
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                selectedTemplate: ''
            };
        });
    }

    buildFormData(form) {

        let formFields = [];
        
        forIn(form, function(field, key) {
            formFields.push(field);
        });

        // Assign extra fields that are used by forms plugin
        let modified = (new Date()).getTime();
        formFields.push({
            type: 'hidden',
            name: 'jchat.last_modified',
            value: [modified]
        });

        formFields.push({
            type: 'hidden',
            name: 'room',
            value: [this.props.roomJid]
        });

        formFields.push({
            type: 'hidden',
            name: 'userid',
            value: [this.props.userJid]
        });

        return formFields;
    }

    selectFormTemplate(option) {
        if(!option || option.value === undefined) {
            option = {
                value: undefined
            }
        }
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                selectedTemplate: option.value
            };
        });
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
    templateOpts: getTemplateOptions(state),
    templates: state.forms.templates,
    submissionNodes: state.forms.nodes.submissionNodes,
    userJid: state.client.jid.bare
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      submitForm: (node, form, jid) => dispatch(submitForm(node, form, jid)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SendFormModal);