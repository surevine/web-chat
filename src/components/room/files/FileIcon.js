import React from 'react';
import FontAwesome from 'react-fontawesome';

class FileIcon extends React.Component {

    render() {

        let icon = "";

        switch(this.props.type) {


            case "image/png":
            case "image/gif":
            case "image/jpeg":
                icon = "file-image-o";
                break;

            case "application/pdf":
                icon = "file-pdf-o";
                break;

            case "text/xml":
                icon = "file-code-o";
                break;

            // TODO support other types

            default:
                icon = "file-text-o";

        }

        return (
            <div className="FileIcon">
                <FontAwesome name={icon} className="fileIcon" />
            </div>
        );
    }

}

export default FileIcon;