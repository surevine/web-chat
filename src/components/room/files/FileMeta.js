import React from 'react';
import FontAwesome from 'react-fontawesome';

import { printFileSize } from '../../../files';

class FileMeta extends React.Component {

    render() {
        return (
            <p className="FileMeta">
                <span className="type">{ this.props.file.type }</span>
                &nbsp;-&nbsp;
                <span className="size">{ printFileSize(this.props.file.size) }</span>
            </p>
        );
    }

}

export default FileMeta;