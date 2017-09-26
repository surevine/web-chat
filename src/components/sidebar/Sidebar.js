import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import UserInfo from '../header/UserInfo';
import RoomList from './RoomList';

class Sidebar extends React.Component {

    componentDidMount() {

    }

    render() {

        // if(!this.props.client.authenticated) {
        //     return null;
        // }

        return (
        <div className="Sidebar">

            <div className="App-header">
                <UserInfo />
            </div>

            <RoomList />

            <div className="footer">

                <div className="controls">
                    <Link to={`/settings`}
                        data-delay-show='100'
                        data-tip="Settings">
                        <FontAwesome name='cog' className="icon" />
                        Settings
                    </Link>
                    <Link to={`/about`}
                        data-delay-show='100'
                        data-tip="About">
                        <FontAwesome name='info-circle' className="icon" />
                        About
                    </Link>
                    <Link to={`/logout`}
                        data-delay-show='100'
                        data-tip="Sign out">
                        <FontAwesome name='sign-out' className="icon" />
                        Sign out
                    </Link>
                </div>

            </div>

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  client: state.client
});

export default connect(mapStateToProps, {})(Sidebar);