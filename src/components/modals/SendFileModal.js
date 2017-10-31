import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import FileBase64 from 'react-file-base64';

import { getCurrentRoomJid } from '../../selectors';
import { UPLOAD_SIZE_LIMIT, printFileSize } from '../../files';
import { sendFile } from '../../ducks/files';

import './SendFileModal.css';

class SendFileModal extends React.Component {

    constructor() {
        super();
        this.state = {
            error: false,
            file: {}
        };
    }

    render() {

        return (

            <ReactModal 
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                className="Modal SendFileModal"
                overlayClassName="Overlay">

                <div className="header">
                    <a className="closeModal" onClick={this.props.onClose}>
                        &#x2715;
                    </a>
                    <h3>Upload file to {this.props.roomJid}</h3>
                </div>

                <div className="content">

                    <FileBase64
                        multiple={ false }
                        onDone={ this.getFile.bind(this) } />

                    <p className="hint">Files must not be larger than {printFileSize(UPLOAD_SIZE_LIMIT)}.</p>

                    { this.state.error && (
                        <div className="fileError">
                            <p>{ this.state.error }</p>
                        </div>
                    )}

                    <div className="controls">
                        <a className="cancelForm btn" onClick={this.props.onClose}>
                            Cancel
                        </a>
                        <a className={"primary-btn" + (!this.state.file.type || this.state.error ? " disabled" : "")} onClick={this.handleSubmit.bind(this)}>
                            Send file
                        </a>
                    </div> 

                </div>

            </ReactModal>

        );
    }

    getFile(file){

        if(file.file.size > UPLOAD_SIZE_LIMIT) {

            this.setState(function(prevState, props) {
                return {
                    ...prevState,
                    error: "The file selected was too large."
                };
            });

            return;
        }

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                error: false,
                file: file
            };
        });
    }

    handleSubmit() {

        if(!this.state.file.type || this.state.error) {
            return;
        }

        this.props.sendFile(this.props.roomJid, this.state.file.base64, this.state.file.file);

        // Clear state for next time
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                error: false,
                file: {}
            };
        });

        this.props.onClose();
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
        sendFile: (roomJid, content, meta) => dispatch(sendFile(roomJid, content, meta)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SendFileModal);