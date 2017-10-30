import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getPublishedFile, getCurrentRoomJid } from '../../../selectors';
import { parseFileIdFromReference } from '../../../helpers';
import { printFileSize } from '../../../files';

import { showFileModal } from '../../../ducks/rooms';

import './FilePreview.css';
import './Preview.css';

class FilePreview extends React.Component {

    render() {

        return (
            <div className="FilePreview preview">

                <FontAwesome name='file-image-o' className="icon" />

                <p className="reference">{ this.props.publishedFile.name }</p>
                <p className="size">{ printFileSize(this.props.publishedFile.size) }</p>
                
                <div className="actions">
                    <a href={this.props.publishedFile.content} download={this.props.publishedFile.name} onClick={(e) => { e.stopPropagation(); }} className="download btn">
                        Download
                    </a>
                    <a className="expand btn" onClick={this.showModal.bind(this)}>View</a>
                </div>

            </div>
        );
    }

    showModal() {
        this.props.showFileModal(this.props.roomJid, this.props.publishedFile);
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
    publishedFile: getPublishedFile(state, { fileId: parseFileIdFromReference(props.message.reference) })
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
        showFileModal: (jid, file) => dispatch(showFileModal(jid, file)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FilePreview);