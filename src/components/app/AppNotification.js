import React from 'react';
import { connect } from "react-redux";

import styles from './AppNotification.css';
import Notification  from 'react-web-notification';

class AppNotification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ignore: true
        };
    }

    render() {
        return (
        <div className="AppNotification">
            <Notification
            ignore={this.state.ignore && this.props.notification.title !== ''}
            notSupported={this.handleNotSupported.bind(this)}
            onPermissionGranted={this.handlePermissionGranted.bind(this)}
            onPermissionDenied={this.handlePermissionDenied.bind(this)}
            onShow={this.handleNotificationOnShow.bind(this)}
            onClick={this.handleNotificationOnClick.bind(this)}
            onError={this.handleNotificationOnError.bind(this)}
            timeout={5000}
            title={this.props.notification.title}
            options={this.buildNotificationOptions()}
            />
            <audio id='notificationSound' preload='auto'>
            <source src='/assets/sounds/pop.mp3' type='audio/mpeg' />
            </audio>
        </div>
        )
    }

    handlePermissionGranted() {
        this.setState({
            ignore: false
        });
    }

    handlePermissionDenied() {
        this.setState({
            ignore: true
        });
    }

    handleNotSupported() {
        this.setState({
            ignore: true
        });
    }

    handleNotificationOnClick(e, tag) {
        // TODO consider showing the relevant room
        console.log('clicked', tag);
    }

    handleNotificationOnError(e, tag) {
        // console.log(e, 'Notification error tag:' + tag);
    }

    handleNotificationOnClose(e, tag) {
        // console.log(e, 'Notification closed tag:' + tag);
    }

    handleNotificationOnShow(e, tag) {
        this.playSound();
    }

    // Workaround for lack of Notification.sound support
    playSound(filename) {
        document.getElementById('notificationSound').play();
    }

    buildNotificationOptions() {
        return {
            body: this.props.notification.body,
            icon: 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png',
            lang: 'en',
            dir: 'ltr',
            sound: '/assets/sounds/pop.mp3'
        }
    }

};

const mapStateToProps = (state, props) => ({
    notification: state.notification
});

export default connect(mapStateToProps, {})(AppNotification);