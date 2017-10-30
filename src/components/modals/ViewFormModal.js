import React from 'react';
import ReactModal from 'react-modal';

class ViewFormModal extends React.Component {

    render() {

        if(!this.props.form) {
            return null;
        }

        return (

            <ReactModal 
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                className="Modal"
                overlayClassName="Overlay">

                <div className="header">
                    <a className="closeModal" onClick={this.props.onClose}>
                        &#x2715;
                    </a>
                    <h3>{this.props.form.template.title }</h3>
                </div>

                <div className="content">

                    {/* this.props.form.form.fields */}

                    FORM FIELDS TO BE RENDERED HERE!
                    
                    {/* TODO re-use form template but with edit disabled */}

                </div>

            </ReactModal>

        );
    }

}

export default ViewFormModal;
