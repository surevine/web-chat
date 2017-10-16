import React from 'react';

import SelectField from './SelectField';
import CheckboxField from './CheckboxField';

class FormField extends React.Component {

    constructor () {
        super();
    }

    buildFieldProps(field) {
        return {
            name: field.name,
            id: field.name,
            value: (this.props.form[field.name] ? this.props.form[field.name].value : ""),
            onChange: (e) => {
                this.props.onChange(e.target.name, e.target.value)
            }
        };
    }

    renderField(field) {

        let fieldProps = this.buildFieldProps(field);

        switch(field.type) {

            case "fixed":

                return (
                    <h3 key={field.label + "-fixed"}>{ field.label }</h3>
                );

            case "text-single":

                return (
                    <input type="text" autoComplete="off" {...fieldProps} />
                )

            case "text-multi":
            
                return (
                    <textarea autoComplete="off" {...fieldProps}></textarea>
                )

            case "text-private":
            
                return (
                    <input type="password" autoComplete="off" {...fieldProps} />
                )

            case "list-single":

                fieldProps.onChange = this.props.onChange;
                fieldProps.options = field.options;
                fieldProps.multi = false;

                return (
                    <SelectField {...fieldProps} />
                )

            case "list-multi":

                fieldProps.onChange = this.props.onChange;
                fieldProps.options = field.options;
                fieldProps.multi = true;

                return (
                    <SelectField {...fieldProps} />
                )

            case "jid-single":

                return (
                    <input type="email" autoComplete="off" {...fieldProps} />
                )

            case "jid-multi":
            
                // TODO multiselect
                return (
                     <textarea autoComplete="off" {...fieldProps}></textarea>
                )

            case "boolean":
            
                fieldProps.onChange = this.props.onChange;
                fieldProps.options = field.options;
                fieldProps.checked = this.props.form[field.name].value;

                return (
                    <CheckboxField {...fieldProps} />
                );

            case "hidden":
            
                return (
                    <input type="hidden" autoComplete="off" name={field.name} id={field.name} value={field.value} />
                );

            default:
                console.log('Unexpected form field type', field);

        }
            
    }

    render() {

        let field = this.props.field;

        // TODO move elsewhere
        let fixedFieldTypes = [
            "hidden", "fixed"
        ];

        // Basic render of certain inputs
        if(fixedFieldTypes.indexOf(field.type) > -1) {
            return (
                this.renderField(field)
            );
        }

        return (
            <div className="fieldgroup" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                    {this.renderField(field)}
                <p className="hint">{field.desc}</p>
            </div>
        );
    }

}

export default FormField;