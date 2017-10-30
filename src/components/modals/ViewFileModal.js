import React from 'react';
import ReactModal from 'react-modal';

class ViewFileModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textContent: ""
        };

        // File reading for text files
        this.reader = new FileReader();
        this.reader.addEventListener('loadend', (e) => {
            this.setState({
                textContent: e.srcElement.result
            });
        });
        // TODO handle error event, progress etc
    }

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

                    <div className="fileContentWrapper">
                        {this.renderFileContent()}
                    </div>

                    <div className="fileMeta">
                        <p>{this.props.file.size}</p>
                        <p>{this.props.file.type}</p>
                    </div>

                    <div className="actions">
                        <a href={this.props.file.content} download={this.props.file.name} className="download btn">
                            Download
                        </a>
                    </div>

                </div>

            </ReactModal>

        );
    }

    // TODO move to worker?
    dataURItoBlob(dataURI, dataType) {
        var binary = atob(dataURI.split(',')[1]), array = [];
        for(var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
        return new Blob([new Uint8Array(array)], {type: dataType});
    }

    renderFileContent() {

        switch(this.props.file.type) {

            case "text/plain":
            case "text/xml":

                let decodedBlob = this.dataURItoBlob(this.props.file.content, this.props.file.type);
                this.reader.readAsText(decodedBlob);

                return (
                    <div className="textWrapper">
                        {<p>{this.state.textContent}</p>}
                    </div>
                )

            case "image/png":
            case "image/gif":
            case "image/jpeg":

                return (
                    <div className="imageWrapper">
                        <img src={this.props.file.content} alt={this.props.file.id} />
                    </div>
                )

            default:
            
                return (
                    <div className="unknownFileType">
                        <h3>No preview available</h3>
                        {/* DOWNLOAD LINK ONLY */}
                    </div>
                )

        }

    }

}

export default ViewFileModal;
