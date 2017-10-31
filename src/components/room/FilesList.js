import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import FileIcon from './files/FileIcon';
import FileMeta from './files/FileMeta';

import { getCurrentRoomJid } from '../../selectors';

import { showFileModal } from '../../ducks/rooms';

import './FilesList.css';

class FilesList extends React.Component {

    render() {
        return (
        <div className="FilesList">

            { this.props.files ? (
                <div>

                    { (this.props.files.length === 0) && (
                        <p>No files have been uploaded to this room.</p>
                    )}

                    { Object.keys(this.props.files)
                        .map(fileId => {
                            
                            let file = this.props.files[fileId];
                            
                            return (
                            <div className="fileUpload" key={file.id} onClick={() => this.showModal(file)}>

                                <FileIcon type={file.type} name={file.name} />

                                <h5 className="title">
                                    {file.name}
                                </h5>

                                <FileMeta file={ file } />

                                <a href={file.content} download={file.name} onClick={(e) => { e.stopPropagation(); }} className="download" title="Download">
                                    <FontAwesome name="download" />
                                </a>

                                <div className="clearfix"></div>
                            </div>
                        )}
                    )}
                </div>
            ) : (
                <div>
                    Loading...
                </div>
            )}

        </div>
        );
    }

    showModal(file) {
        this.props.showFileModal(this.props.roomJid, file);
    }

}

const mapStateToProps = (state, props) => ({
    roomJid: getCurrentRoomJid(state),
});
const mapDispatchToProps = (dispatch, props) => {
    return {
        showFileModal: (jid, file) => dispatch(showFileModal(jid, file)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesList);