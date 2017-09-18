import React from 'react';
import FontAwesome from 'react-fontawesome';

class FormsList extends React.Component {

    render() {
        return (
        <div className="FormsList">

            <h2>Room Form Submissions</h2>

            { this.props.forms ? (
                <div>
                    { this.props.forms.map(form => (
                        <div key={form.id}>
                            {form.id}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Loading...
                    {/* TODO no forms message  */}
                </div>
            )}

        </div>
        );
    }

}

export default FormsList;