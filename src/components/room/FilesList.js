import React from 'react';
import find from 'lodash/find';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';

class FilesList extends React.Component {

    render() {
        return (
        <div className="FilesList">

            { this.props.files ? (
                <div>

                    { (this.props.files.length == 0) && (
                        <p>No files have been uploaded to this room.</p>
                    )}

                    { this.props.files
                        .map(file => (
                        <div className="fileUpload" key={file.id}>
                            {/* TODO icon based on filetype? */}
                            <FontAwesome name='file-image-o' className="formIcon" />
                            <div className="description">
                                {file.id}
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Loading...
                </div>
            )}

        </div>
        );
    }

}

export default FilesList;