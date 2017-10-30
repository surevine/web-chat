import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';

import { getCurrentRoomJid } from '../../selectors';

import { showFormModal } from '../../ducks/rooms';

class FormsList extends React.Component {

    render() {

        return (
        <div className="FormsList">

            { this.props.forms ? (
                <div>

                    { (this.props.forms.length === 0) && (
                        <p>No forms have been submitted to this room.</p>
                    )}

                    { this.props.forms
                        .sort((a, b) => this.getFormUpdated(a) < this.getFormUpdated(b))
                        .map(form => (
                        <div className="formSubmission" key={form.id} onClick={() => this.showModal(form)}>
                            <FontAwesome name='file-text-o' className="formIcon" />
                            <div className="description">
                                <h5 className="title">{form.template.title}</h5>
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
        return parseInt(lastUpdateField.value, 10);
    }

    showModal(form) {
        this.props.showFormModal(this.props.roomJid, form);
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
});
const mapDispatchToProps = (dispatch, props) => {
    return {
        showFormModal: (jid, form) => dispatch(showFormModal(jid, form)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsList);