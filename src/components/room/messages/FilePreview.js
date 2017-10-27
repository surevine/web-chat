import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getPublishedFile } from '../../../selectors';
import { parseFileIdFromReference } from '../../../helpers';

import ViewFormModal from '../../modals/ViewFormModal';

import './FilePreview.css';
import './Preview.css';

class FilePreview extends React.Component {

    render() {

        return (
            <div className="FilePreview preview">

                <FontAwesome name='file-image-o' className="icon" />

                {<p className="reference">{ this.props.publishedFile.name }</p>  }
                
                <div className="actions">
                    <a className="btn">Download</a>
                    <a className="expand btn" >View</a>
                </div>

            </div>
        );
    }


}

const mapStateToProps = (state, props) => ({
    publishedFile: getPublishedFile(state, { fileId: parseFileIdFromReference(props.message.reference) })
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FilePreview);