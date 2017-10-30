import React from 'react';
import ReactModal from 'react-modal';

class ViewFileModal extends React.Component {

    render() {

        if(!this.props.file) {
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
                    <h3>{this.props.file.name }</h3>
                </div>

                <div className="content">

                    FILE VIEW HERE

                </div>

            </ReactModal>

        );
    }

}

export default ViewFileModal;
