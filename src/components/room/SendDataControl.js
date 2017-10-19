import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import DropdownMenu from 'react-dd-menu';

// import menuStyles from './react-dd-menu.css';
import styles from './SendDataControl.css';

import SendFormModal from '../modals/SendFormModal';
import SendFileModal from '../modals/SendFileModal';

class SendDataControl extends React.Component {

    constructor () {
        super();
        this.state = {
            isMenuOpen: false,
            showFormModal: false,
            showFileModal: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        
        this.showFormModal = this.showFormModal.bind(this);
        this.showFileModal = this.showFileModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    renderMenu() {
        return (
            <div>
            {this.props.enabled ? (
                <span>
                    <a className={"sendForm" + ((this.state.isMenuOpen) ? " active" : "") }
                        onClick={this.toggleMenu} 
                        data-tip 
                        data-for="sendTip">
                        <FontAwesome name='share' className="icon" />
                    </a>
                    <ReactTooltip id='sendTip' place="top" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>Send Data</span>
                    </ReactTooltip>
                </span>
            ) : (
                <a className="sendForm disabled">
                    <FontAwesome name='share' className="icon" />
                </a>
            )}
            </div>
        );
    }

    render() {

        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.closeMenu,
            toggle: this.renderMenu(),
            align: 'left',
            upwards: true,
            size: 'lg',
            animate: false
        };

        return (
        <div className="SendDataControl">

            <DropdownMenu {...menuOptions}>
                <li>
                    <a onClick={this.showFormModal}>
                        <FontAwesome name='file-text-o' className="icon" />
                        Publish Form
                    </a>
                </li>
                <li>
                    <a onClick={this.showFileModal}>
                        <FontAwesome name='file-image-o' className="icon" />
                        Send File
                    </a>
                </li>
            </DropdownMenu>

            <ReactTooltip effect="solid" delayShow={300} offset={{right: 2}} />

            <SendFormModal isOpen={this.state.showFormModal} onClose={this.handleCloseModal.bind(this)} />
            <SendFileModal isOpen={this.state.showFileModal} onClose={this.handleCloseModal.bind(this)} />


        </div>
        );
    }

    toggleMenu() {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                isMenuOpen: !prevState.isMenuOpen
            };
        });
    }
    
    closeMenu() {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                isMenuOpen: false
            };
        });
    }

    showFormModal() {

        if(!this.props.enabled) {
            return false;
        }

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showFormModal: true
            };
        });
    }

    showFileModal() {

        if(!this.props.enabled) {
            return false;
        }

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showFileModal: true
            };
        });
    }    
    
    handleCloseModal() {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                showFormModal: false,
                showFileModal: false
            };
        });
    }

}

export default SendDataControl;