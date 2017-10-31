import React from 'react';

import FormField from '../forms/FormField';

class BasicForm extends React.Component {

    render() {
        return (

            <div className="basic">
            
            { this.props.template.fields.map(field => {
                return (
                    <FormField key={field.name} field={field} disabled={this.props.readOnly} />
                )
            })}

            </div>

        );
    }

}

export default BasicForm;