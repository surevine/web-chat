import React from 'react';
import { connect } from "react-redux";

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
        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  client: state.client
});

export default connect(mapStateToProps, {})(Sidebar);