import React from 'react';

import BasicForm from './BasicForm';
import LayoutForm from './LayoutForm';

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

    render() {
        return (

            <div className="FormTemplate">
                <p>{this.props.template.instructions[0]}</p>
                <form className="formTemplate">

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

                </form>

                <div className="controls">
                    <a className="cancelForm btn" onClick={this.props.onCancel}>
                        Cancel
                    </a>
                    <a className="primary-btn" onClick={this.handleSubmit.bind(this)}>
                        Send form
                    </a>
                </div>

            </div>
            
        );
    }

    buildFormState() {

        let formState = {};
        
        this.props.template.fields.map(field => {

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

    handleSubmit(e) {
        e.preventDefault();
        let form = this.state.form;
        console.log(form);
        this.props.onSubmit(form);
    }

}

export default FormTemplate;