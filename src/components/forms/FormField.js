import React from 'react';
import { Checkbox, Text, Textarea } from 'react-form';

import SelectField from './SelectField';
import TagField from './TagField';
import DateTimeField from './DateTimeField';

class FormField extends React.Component {

    render() {
        
        let field = this.props.field;
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
                { !this.props.disabled && (
                    <p className="hint">{field.desc}</p>
                )}
            </div>
        );
    }

    buildFieldProps(field) {
        return {
            field: field.name,
            name: field.name,
            id: field.name,
            disabled: this.props.disabled
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

                if(field.validation && field.validation.dataType === "xs:dateTime") {
                    return (
                        <DateTimeField {...fieldProps} />
                    );
                }

                return (
                    <Text autoComplete="off" {...fieldProps} />
                )

            case "text-private":
            
                return (
                    <Text type="password" autoComplete="off" {...fieldProps} />
                )

            case "text-multi":
            
                return (
                    <Textarea autoComplete="off" {...fieldProps} />
                )

            case "list-single":

                fieldProps.options = field.options;
                fieldProps.multi = false;

                return (
                    <SelectField {...fieldProps} />
                )

            case "list-multi":

                fieldProps.options = field.options;
                fieldProps.multi = true;

                return (
                    <SelectField {...fieldProps} />
                )

            case "jid-single":

                return (
                    <Text type="email" autoComplete="off" {...fieldProps} />
                )

            case "jid-multi":

                fieldProps.multi = true; 
                fieldProps.options = [];
                fieldProps.placeholder="Add Jid..."
        
                return (
                    <TagField {...fieldProps} />
                )

            case "boolean":

                return (
                    <Checkbox field={field.name} {...fieldProps} />
                );

            case "hidden":
            
                return (
                    <input type="hidden" autoComplete="off" name={field.name} id={field.name} value={field.value} />
                );

            default:
                console.log('Unexpected form field type', field);

        }
            
    }

}

export default FormField;