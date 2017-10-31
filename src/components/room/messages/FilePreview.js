import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getPublishedFile, getCurrentRoomJid } from '../../../selectors';
import { parseFileIdFromReference } from '../../../helpers';

import { showFileModal } from '../../../ducks/rooms';

import FileIcon from '../files/FileIcon';
import FileMeta from '../files/FileMeta';

import './FilePreview.css';
import './Preview.css';

class FilePreview extends React.Component {

    render() {

        return (
            <div className="FilePreview preview">

                <FileIcon type={this.props.publishedFile.type} name={this.props.publishedFile.name} className="icon" />

                <p className="reference">{ this.props.publishedFile.name }</p>

                <FileMeta file={ this.props.publishedFile } />
                
                <div className="actions">
                    <a href={this.props.publishedFile.content} download={this.props.publishedFile.name} onClick={(e) => { e.stopPropagation(); }} className="download btn">
                        Download
                    </a>
                    <a className="expand btn" onClick={this.showModal.bind(this)}>View</a>
                </div>

                { this.renderContentPreview() }

            </div>
        );
    }

    renderContentPreview() {

        switch(this.props.publishedFile.type) {

            case "image/png":
            case "image/gif":
            case "image/jpg":

                return (
                    <div className="contentPreview" onClick={this.showModal.bind(this)}>
                        <img src={this.props.publishedFile.content} alt={this.props.publishedFile.id} />
                    </div>
                );

            default:
                return null;
        }

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