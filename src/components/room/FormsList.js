import React from 'react';
import find from 'lodash/find';
import Moment from 'react-moment';

class FormsList extends React.Component {

    getFormUpdated(form) {
        let lastUpdateField = find(form.form.fields, function(field) {
            return ((field.type === "hidden") && (field.name === "jchat.last_modified"));
        });
        return parseInt(lastUpdateField.value);
    }

    render() {
        return (
        <div className="FormsList">

            <h2>Form Submissions</h2>

            { this.props.forms ? (
                <div>
                    { this.props.forms.map(form => (
                        <div key={form.id}>
                            <p>{form.form.fields[0].value}</p>
                            <Moment format="Do MMMM YYYY, h:mm:ss a">{this.getFormUpdated(form)}</Moment>
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