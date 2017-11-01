import React from 'react';
import ReactModal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import xml from 'react-syntax-highlighter/dist/languages/xml';
import { github } from 'react-syntax-highlighter/dist/styles';

import { printFileSize } from '../../files';

import './ViewFileModal.css';

registerLanguage('xml', xml);

class ViewFileModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textContent: "Loading...",
            textLoaded: false
        };

        // File reading for text files
        this.reader = new FileReader();
        this.reader.addEventListener('loadend', (e) => {
            this.setState({
                textContent: e.srcElement.result,
                textLoaded: true
            });
        });
        // TODO handle error event, progress etc
    }

    componentWillUnmount() {
        this.setState({
            textContent: "",
            textLoaded: false
        });
    }

    render() {

        if(!this.props.file) {
            return null;
        }

        return (

            <ReactModal 
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                className="Modal ViewFileModal"
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
                        <p>{this.props.file.type} - {printFileSize(this.props.file.size)}</p>
                        <p>Uploaded by {this.props.file.author} in {this.props.room.jid}</p>
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

    // TODO move this to worker thread
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

                let language = '';
                switch(this.props.file.type) {

                    case "text/xml":
                        language = 'xml';
                        break;

                    default: 
                        language = 'text';

                }

                return (
                    <div className="textWrapper">
                        {this.state.textLoaded && (
                            <SyntaxHighlighter language={language} style={github}>{this.state.textContent}</SyntaxHighlighter>
                        )}
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
                        <FontAwesome name="eye-slash" className="icon" />
                        <h3>No preview available</h3>
                    </div>
                )

        }

    }

}

export default ViewFileModal;
