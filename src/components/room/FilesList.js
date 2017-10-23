import React from 'react';
import FontAwesome from 'react-fontawesome';

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


                                {/* TODO MAKE COMONENTN AND icon based on filetype? */}
                                <FontAwesome name='file-image-o' className="formIcon" />

                                <div className="description">
                                    {file.name}
                                </div>

                                <div className="meta">
                                    {/* TODO make this kbs etc */}
                                    {file.size}
                                </div>

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

}

export default FilesList;