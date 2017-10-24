import React from 'react';
import { Form } from 'react-form';

import BasicForm from './BasicForm';
import LayoutForm from './LayoutForm';

import './FormTemplate.css';

class FormTemplate extends React.Component {

    constructor () {
        super();
        this.state = {
            form: {}
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

        if(required) {
            if(field === '') {
                return "This field is required";
            }
        }

        if(validation.dataType) {

            if(validation.dataType === "xs:dateTime") {
                // what is the format?!
            }

            // xs:integer
            // 123
            // 

            // geo:mgrs
            // 38SMB4484
            // <regex>\\d{1,2}[A-Za-z]\\s*[A-Za-z]{2}\\s*\\d{1,5}\\s*\\d{1,5}</regex>
        }

        if(validation.regex) {
            let re = new RegExp(validation.regex);
            let found = field.match(re);
            if(!found) {
                // TODO improve error message
                return "Invalid format";
            }
        }

        if(validation.select) {

            if(validation.select.min) {
                if(field.length < validation.select.min)  {
                    return "Field requires minimum of "+validation.select.min+" value(s)";
                }
            }

            if(validation.select.max) {
                if(field.length > validation.select.max)  {
                    return "Field requires maximum of "+validation.select.max+" value(s)";
                }
            }

        }

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
                    validate={this.buildValidationRules.bind(this)}>

                    { formApi => (
                        <form className="formTemplate" onSubmit={formApi.submitForm}>

                            { this.props.template.layout ? (

                                <LayoutForm 
                                    template={this.props.template}
                                    form={this.state.form} />

                            ) : (

                                <BasicForm 
                                    template={this.props.template}
                                    form={this.state.form} />

                            ) }

                            <div className="controls">
                                <a className="cancelForm btn" onClick={this.props.onCancel}>
                                    Cancel
                                </a>
                                <button className="primary-btn" type='submit'>Publish Form</button>
                            </div>

                        </form>
                    )}

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

    handleSubmit = (values) => {

        let form = this.state.form;

        // Merge values with other form properties
        Object.keys(values).forEach((fieldname) => {

            let fieldValue = values[fieldname];
            if((typeof fieldValue) === 'object') {

                if(fieldValue.length) {
                    form[fieldname].value = fieldValue.map(val => val.value); // multi value select
                } else {
                    form[fieldname].value = fieldValue.value // single value select
                }

            } else {
                form[fieldname].value = values[fieldname];
            }
            
        });

        this.props.onSubmit(form);
    };

}

export default FormTemplate;