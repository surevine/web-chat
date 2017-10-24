import React from 'react';
import { Form } from 'react-form';

import BasicForm from './BasicForm';
import LayoutForm from './LayoutForm';

import './FormTemplate.css';

class FormTemplate extends React.Component {

    constructor () {
        super();
        this.state = {
            form: {},
            valid: false
        };
    }

    componentDidMount() {
        this.buildFormState();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.template !== this.props.template) {
            this.buildFormState();
        }
    }

    buildDefaultValues() {

        let defaults = {};
        this.props.template.fields.forEach(field => {
            if(field.type !== 'fixed') {
                defaults[field.name] = "";
            }
        });
        return defaults;
    }

    validateField(field, validation, required) {

        // field.validation.basic ???
        // field.validation.select.min
        // field.validation.select.max

        return false;

        if(required) {
            if(field === '') {
                return "This field is required";
            }
        }

        if(validation.dataType) {
            if(validation.dataType === "xs:string") {
                // TODO ensure field typeof is string!
                if((typeof field) !== 'string') {
                    return "This field should be a string";
                }
            }

            if(validation.dataType === "xs:dateTime") {
                // what is the format?!
            }

            // TODO other data types?
        }

        if(validation.regex) {

            console.log(validation.regex)

            let re = new RegExp(validation.regex);
            let found = field.match(re);
            if(!found) {
                // TODO improve error message
                return "Invalid format";
            }

        }

        // TODO have type field here too, to detect jid-single etc

        // TODO other validation based on validation property

        return false;
    }

    buildValidationRules(values, state, props) {
        const rules = {};
        this.props.template.fields.forEach(field => {
            if(field.validation) {
                rules[field.name] = this.validateField(values[field.name], field.validation, field.required);
            }
        });
        return rules;
    }

    render() {
        return (

            <div className="FormTemplate">

                {this.props.template.instructions && (
                    <p>{this.props.template.instructions[0]}</p>
                )}

                <Form 
                    onSubmit={this.handleSubmit}
                    defaultValues={this.buildDefaultValues()}
                    validate={this.buildValidationRules.bind(this)}
                    onValidationFail={this.onValidationFail}>

                    {({submitForm}) => {
                    return (
                        <form className="formTemplate" onSubmit={submitForm}>

                            { this.props.template.layout ? (

                                <LayoutForm 
                                    template={this.props.template}
                                    form={this.state.form}
                                    onFieldChange={this.updateFormField.bind(this)} />

                            ) : (

                                <BasicForm 
                                    template={this.props.template}
                                    form={this.state.form}
                                    onFieldChange={this.updateFormField.bind(this)} />

                            ) }

                            <div className="controls">
                                <a className="cancelForm btn" onClick={this.props.onCancel}>
                                    Cancel
                                </a>
                                <button className="primary-btn" type='submit'>Publish Form</button>
                            </div>

                        </form>
                    )}}

                </Form>

            </div>
            
        );
    }

    buildFormState() {

        let formState = {};
        
        this.props.template.fields.forEach(field => {
            if(field.type !== 'fixed') {
                formState[field.name] = {
                    type: field.type,
                    label: field.label,
                    name: field.name,
                    value: "",
                };
            }
        });

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                form: formState
            };
        });
    }

    updateFormField(fieldName, value) { 
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

    onValidationFail = () => {
        console.log('validation failed...');
    }

    handleSubmit = (values) => {

        console.log(values)
        
        let form = this.state.form;

        // Merge values with other form properties
        Object.keys(values).forEach((fieldname) => {
            form[fieldname].value = values[fieldname];
        });

        if(this.state.valid) {
            this.props.onSubmit(form);
        }
    };

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.props.onSubmit(this.state.form);
    // }

}

export default FormTemplate;