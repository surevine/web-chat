import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

class ViewFormModal extends React.Component {

    render() {

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
                    <h3>FORM TITLE HERE</h3>
                </div>

                <div className="content">

                    FORM FIELDS TO BE RENDERED HERE!
                    
                    {/* TODO re-use form template but with edit disabled */}

                </div>

            </ReactModal>

        );
    }

}

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch, props) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewFormModal);