import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import forIn from 'lodash/forIn';

import { getFormField } from '../../forms';
import FormField from '../forms/FormField';


import { getCurrentRoomJid, getTemplateOptions } from '../../selectors';

import { submitForm } from '../../ducks/forms';

class SendFormControl extends React.Component {

    constructor () {
        super();
        this.state = {
            showModal: false,
            selectedTemplate: '',
            form: {}
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {

        if(!this.props.enabled) {
            return false;
        }

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showModal: true
            };
        });
    }
    
    handleCloseModal() {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showModal: false
            };
        });
    }

    handleFormSubmit() {
        let templateNode = this.state.selectedTemplate;
        let submissionNode = templateNode.replace("fdp/template", "fdp/submitted");
        this.props.submitForm(submissionNode, this.buildFormFields(), this.props.roomJid);

        this.handleCloseModal();
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                selectedTemplate: '',
                form: {}
            };
        });
    }

    buildFormFields() {

        let formFields = [];
        
        forIn(this.state.form, function(field, key) {
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

    selectForm(option) {

        let formState = {};

        if(option && option.value !== undefined) {
            let template = this.props.templates[option.value];

            template.fields.map(field => {

                if(field.type !== 'fixed') {
                    formState[field.name] = {
                        type: field.type,
                        label: field.label,
                        name: field.name,
                        value: "",
                    };
                }

            });

        } else {
            option = {
                value: undefined
            }
        }

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                selectedTemplate: option.value,
                form: formState
            };
        });

    }

    updateFormState(fieldName, value) {

        this.setState(function(prevState, props) {
            let currentFormState = prevState.form;
            let currentField = currentFormState[fieldName];
            return {
                ...prevState,
                form: {
                    ...currentFormState,
                    [fieldName]: {
                        ...currentField,
                        value: value
                    }
                }
            };
        });
    }

    render() {

        let template = this.props.templates[this.state.selectedTemplate];

        return (
        <div className="SendFormControl">

            {this.props.enabled ? (
                <span>
                    <a className="sendForm" 
                        onClick={this.handleOpenModal} 
                        data-tip 
                        data-for="sendTip">
                        <FontAwesome name='file-text' className="icon" />
                    </a>
                    <ReactTooltip id='sendTip' place="top" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>Send Form</span>
                    </ReactTooltip>
                </span>
            ) : (
                <a className="sendForm disabled" onClick={this.handleOpenModal}>
                    <FontAwesome name='file-text' className="icon" />
                </a>
            )}

            <ReactTooltip effect="solid" delayShow={300} offset={{right: 2}} />

            <ReactModal 
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                className="Modal"
                overlayClassName="Overlay">

                <div className="header">
                    <a className="closeModal" onClick={this.handleCloseModal}>
                        &#x2715;
                    </a>
                    <h3>Send Form to {this.props.roomJid}</h3>
                </div>

                <div className="content">

                    {/* Conditionally render these instructions only when not selected! */}
                    <h3>Select Form Template</h3>
                    <Select
                        name="template"
                        value={this.state.selectedTemplate}
                        options={this.props.templateOpts}
                        onChange={this.selectForm.bind(this)}
                    />

                    { template && (

                        <div>
                            <div className="formWrapper">
                                <p>{template.instructions[0]}</p>
                                <form className="formTemplate">

                                    { template.layout ? (
                                        <div className="layout">
                                            {/* TODO: refactor entire thing into Form component as well, which does the if layout etc */}
                                            {/* TODO: refactor into LayoutForm */}

                                            { template.layout.map((page, index) => {

                                                if(!page.label) {
                                                    page.label = (index + 1);
                                                }

                                                return (

                                                    <div className="formPage" key={page.label}>
                                                    <h3>PAGE: {page.label}</h3>

                                                    {/* DRY */}
                                                    { page.contents.map(formItem => {

                                                        // Skip text layout items as not used
                                                        if(formItem.text) {
                                                            return null;
                                                        }

                                                        return (
                                                            <div className="formItem" key={formItem.field || formItem.section.label}>
                                                            { formItem.field ? (

                                                                <FormField key={getFormField(template, formItem.field).name} field={getFormField(template, formItem.field)} form={this.state.form} onChange={this.updateFormState.bind(this)} />

                                                            ) : (
                                                                <div className="formSection">
                                                                    {/* TODO ensure section exists */}
                                                                    <h4>{formItem.section.label}</h4>

                                                                    <div className="sectionFields">

                                                                    {/* TODO: refactor not repeat above... */}
                                                                    { formItem.section.contents.map(sectionItem => {

                                                                        return (
                                                                            <FormField key={getFormField(template, sectionItem.field).name} field={getFormField(template, sectionItem.field)} form={this.state.form} onChange={this.updateFormState.bind(this)} />
                                                                        );

                                                                    })}

                                                                    <div className="clearfix"></div>

                                                                    </div>                                   

                                                                </div>
                                                            )}
                                                            </div>
                                                        )


                                                    })}

                                                    </div>

                                                )


                                            })}

                                        </div>  
                                    ) : (

                                        <div className="basic">

                                        { template.fields.map(field => {
                                            return (
                                                <FormField key={field.name} field={field} form={this.state.form} onChange={this.updateFormState.bind(this)} />
                                            )
                                        })}

                                        </div>

                                    ) }

                                </form>
                            </div>
                            <div className="controls">
                                <a className="cancelForm btn" onClick={this.handleCloseModal}>
                                    Cancel
                                </a>
                                <a className="primary-btn" onClick={this.handleFormSubmit.bind(this)}>
                                    Send form
                                </a>
                            </div>
                        </div>

                    )}

                </div>

            </ReactModal>

        </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SendFormControl);