import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class UserInfo extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
        <div className="UserInfo">

            { this.props.client.authenticated && 
                <div>
                    <p>{ this.props.client.jid.local }</p>
                    <Link to={`/logout`}>Log out</Link>
                </div>
            }

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  client: state.client
});

export default connect(mapStateToProps, {})(UserInfo);