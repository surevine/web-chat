import React from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';
import find from 'lodash/find';

import { getPublishedForm } from '../../../selectors';
import { parseFormIdFromMessage } from '../../../helpers';

import ViewFormModal from '../../modals/ViewFormModal';

class FilePreview extends React.Component {

    render() {

        return (
            <div className="FilePreview">

                <div className="filePreview">

                    <FontAwesome name='file-image-o' className="icon" />

                    {<p className="reference">{ this.props.publishedFile.name } - { this.props.publishedFile.id }</p>  }
                    
                    <div className="actions">
                        <a className="btn">Download</a>
                        <a className="expand btn" >View</a>
                    </div>
                 
                </div>

            </div>
        );
    }


}

const mapStateToProps = (state, props) => ({
    publishedFile: getPublishedFile(state, { formId: parseFormIdFromMessage(props.message) })
  });
  
  const mapDispatchToProps = (dispatch, props) => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FilePreview);