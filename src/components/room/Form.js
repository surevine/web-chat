import React from 'react';

class Form extends React.Component {

    render() {
        return (
            <div className="Form">
                { this.props.fields[0].value }

                {/* TODO: render specific field components instead */}
                { this.props.fields.map(field => (

                    (field.type !== 'hidden') && (

                    <div key={field.name}>
                        <p>{field.name}: </p>
                        <p>{field.value}</p>
                    </div>

                    )

                ))}

            </div>
        );
    }

}

export default Form;