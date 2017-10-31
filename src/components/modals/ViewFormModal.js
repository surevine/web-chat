import React from 'react';
import ReactModal from 'react-modal';
import { Form } from 'react-form';

import BasicForm from '../forms/BasicForm';
import LayoutForm from '../forms/LayoutForm';

import { getFormField } from '../../forms';

import './ViewFormModal.css';

class ViewFormModal extends React.Component {

    render() {

        if(!this.props.form) {
            return null;
        }

        return (

            <ReactModal 
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                className="Modal ViewFormModal"
                overlayClassName="Overlay">

                <div className="header">
                    <a className="closeModal" onClick={this.props.onClose}>
                        &#x2715;
                    </a>
                    <h3>{this.props.form.template.title }</h3>
                </div>

                <div className="content">

                    <p className="metadata">Published by {this.props.form.from}</p>

                    <Form defaultValues={this.buildFormValues()}>

                    { formApi => (

                        <form className="formTemplate viewForm" onSubmit={formApi.submitForm}>

                            { this.props.form.template.layout ? (

                                <LayoutForm template={this.props.form.template} readOnly={true} />

                            ) : (

                                <BasicForm template={this.props.form.template} readOnly={true} />

                            ) }

                        </form>

                    )}

                    </Form>

                </div>

            </ReactModal>

        );
    }

    buildFormValues() {

        let defaults = {};
        this.props.form.form.fields.forEach(field => {
            if(field.type !== 'fixed') {
                defaults[field.name] = field.value;
            }
        });

        return defaults;
    }

}

export default ViewFormModal;
