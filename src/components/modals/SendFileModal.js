import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import FileBase64 from 'react-file-base64';

import { getCurrentRoomJid } from '../../selectors';

class SendFileModal extends React.Component {

    constructor() {
        super();
        this.state = {
            error: false,
            file: {}
        };
      }

    render() {

        // name, type (mime), size, base64, file
        // file: name, lastModified, lastModifiedDate, size (bytes), type

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
                    <h3>Send file to {this.props.roomJid}</h3>
                </div>

                <div className="content">

                    <FileBase64
                        multiple={ false }
                        onDone={ this.getFile.bind(this) } />

                    <p className="hint">Files must be smaller than LIMIT.</p>

                    { this.state.error && (
    
                        <div>
                            <p>{ this.state.error }</p>
                        </div>

                    )}

                    { this.state.file.type && !this.state.error && (

                        <div className="fileError">
                        <p>{ this.state.file.file.size }</p>
                        <p>{ this.state.file.base64 }</p>
                        </div>

                    )}

                    <div className="controls">
                        <a className="cancelForm btn" onClick={this.props.onCancel}>
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

        // TODO set to actual limit
        const SIZE_LIMIT = 7000;
        if(file.file.size > SIZE_LIMIT) {

            this.setState(function(prevState, props) {
                return {
                    ...prevState,
                    error: "The file selected was too large. Files must not exceed LIMIT."
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

        if(!this.state.file || this.state.error) {
            return;
        }



        // spinnets/${chatroomjid}/content (datauri)
        //  ^ Publish this first, get item id, then use the id for the summary below...

        // snippets/${chatroomjid}/summary (json metadata?)


        
        // ensure file is set in state, then call actions to publish
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SendFileModal);