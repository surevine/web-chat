import React from 'react';
import FontAwesome from 'react-fontawesome';

import FileIcon from './files/FileIcon';

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
                            <div className="fileUpload" key={file.id}>

                                <FileIcon type={file.type} name={file.name} />

                                <div className="description">
                                    {file.name}
                                </div>

                                <div className="meta">
                                    {this.printFileSize(file.size)}
                                </div>

                                <a href={file.content} download={file.name} className="download">
                                    <FontAwesome name="download" className="fileIcon" />
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

    printFileSize(size) {

        // MB
        if(size > 1000000) {
            return (size / 1000000).toFixed(2) + "MB";
        }

        // kB
        if(size > 1000) {
            return (size / 1000).toFixed(2) + "kB";
        }

        return "1kB"; // Minimum size to report
    }

}

export default FilesList;