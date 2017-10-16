import React from 'react';
import find from 'lodash/find';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';

class FormsList extends React.Component {

    render() {
        return (
        <div className="FormsList">

            { this.props.forms ? (
                <div>

                    { (this.props.forms.length == 0) && (
                        <p>No forms have been submitted to this channel.</p>
                    )}


                    { this.props.forms
                        .sort((a, b) => this.getFormUpdated(a) < this.getFormUpdated(b))
                        .map(form => (
                        <div className="formSubmission" key={form.id}>
                            <FontAwesome name='file-text-o' className="formIcon" />
                            <div className="description">
                                <h5 className="title">{form.template.title}</h5>
                                <p>{form.id}</p>
                                <p className="meta">
                                    <span className="author">{form.from}</span>
                                    <Moment className="date" format="D/M/YYYY, HH:mm">{this.getFormUpdated(form)}</Moment>
                                </p>
                            </div>
                            <div className="clearfix"></div>
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

    getFormUpdated(form) {
        let lastUpdateField = find(form.form.fields, function(field) {
            return ((field.type === "hidden") && (field.name === "jchat.last_modified"));
        });
        return parseInt(lastUpdateField.value);
    }

}

export default FormsList;