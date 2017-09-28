import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import forIn from 'lodash/forIn';

import SelectField from '../forms/SelectField';

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

        // TODO make form node lookup dynamic
        this.props.submitForm("fdp/submitted/medivacnew", this.buildFormFields(), this.props.roomJid);

    }

    buildFormFields() {

        let formFields = [];
        
        forIn(this.state.form, function(field, key) {
            formFields.push(field);
        });

        // Assign extra fields that are used by forms plugin

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

    handleFieldChange(e) {
        this.updateFormState(e.target.name, e.target.value);
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
            <a className="sendForm" onClick={this.handleOpenModal} data-tip="Send Form">
                <FontAwesome name='file-text' className="icon" />
            </a>
            <ReactTooltip effect="solid" delayShow={300} offset={{right: 2}} />

            <ReactModal 
                isOpen={this.state.showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.handleCloseModal}
                className="Modal"
                overlayClassName="Overlay"
                >

                <div className="header">
                    <a className="closeModal" onClick={this.handleCloseModal}>
                        <FontAwesome name='close' />
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

                        <div className="formWrapper">

                            <h4>{template.title}</h4>
                            <p>{template.instructions[0]}</p>

                            <form className="formTemplate">

                                {/* // TODO REFACTOR up form fields based on type - render components */}

                                { template.fields.map(field => {

                                    if(field.type === 'fixed') {

                                        return (
                                            <h3 key={field.label + "-fixed"}>(FIXED){ field.label }</h3>
                                        );


                                    } else if(field.type === 'text-single') {

                                        let fieldProps = {
                                            name: field.name,
                                            id: field.name,
                                            value: this.state.form[field.name].value,
                                            onChange: this.handleFieldChange.bind(this)
                                        }

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <input type="text" {...fieldProps} />
                                                <p className="hint">{field.desc}</p>
                                            </div>
                                        )

                                    } else if(field.type === 'text-multi') {    

                                        let fieldProps = {
                                            name: field.name,
                                            id: field.name,
                                            value: this.state.form[field.name].value,
                                            onChange: this.handleFieldChange.bind(this)
                                        }

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <textarea {...fieldProps}></textarea>
                                                <p className="hint">{field.desc}</p>
                                            </div>
                                        )

                                    } else if(field.type === 'text-private') {  

                                        let fieldProps = {
                                            name: field.name,
                                            id: field.name,
                                            value: this.state.form[field.name].value,
                                            onChange: this.handleFieldChange.bind(this)
                                        }

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <input type="password" {...fieldProps} />
                                                <p className="hint">{field.desc}</p>
                                            </div>
                                        )

                                    } else if(field.type === 'list-single') {     

                                        let fieldProps = {
                                            name: field.name,
                                            id: field.name,
                                            value: this.state.form[field.name].value,
                                            options: field.options,
                                            multi: false,
                                            onChange: this.updateFormState.bind(this)
                                        }

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <SelectField {...fieldProps} />
                                            </div>
                                        )

                                    } else if(field.type === 'list-multi') {   

                                        let fieldProps = {
                                            name: field.name,
                                            id: field.name,
                                            value: this.state.form[field.name].value,
                                            options: field.options,
                                            multi: true,
                                            onChange: this.updateFormState.bind(this)
                                        }

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <SelectField {...fieldProps} />
                                            </div>
                                        )

                                    } else if(field.type === 'jid-single') {  

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <input type="text" name={field.name} id={field.name} />
                                                <p className="hint">{field.desc}</p>
                                            </div>
                                        )

                                    } else if(field.type === 'jid-multi') {  

                                        return (
                                            <div className="fieldgroup" key={field.name}>
                                                <label htmlFor={field.name}>{field.label}</label>
                                                <textarea name={field.name} id={field.name}></textarea>
                                                <p className="hint">{field.desc}</p>
                                            </div>
                                        )

                                    } else if(field.type === 'boolean') {  

                                        console.log('boolean');

                                    } else if(field.type === 'hidden') {  

                                        console.log(field);

                                    } else {

                                        console.log(field);

                                    }

                                })}

                            </form>

                        </div>

                    )}

                    <div className="controls">
                        <a className="cancelForm" onClick={this.handleCloseModal}>
                            Cancel
                        </a>
                        <a className="submitForm" onClick={this.handleFormSubmit.bind(this)}>
                            Send form
                        </a>
                    </div>

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
  userJid: state.client.jid.bare
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    submitForm: (node, form, jid) => dispatch(submitForm(node, form, jid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFormControl);