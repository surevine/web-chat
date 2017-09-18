import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

class UserInfo extends React.Component {

    render() {
        return (
        <div className="UserInfo">

            { this.props.client.authenticated && 
                <div>
                    <p>{ this.props.client.jid.local }</p>
                    <Link to={`/settings`}
                        data-delay-show='100'
                        data-tip="Settings">
                        <FontAwesome name='cog' />
                    </Link>
                    <Link to={`/logout`}
                        data-delay-show='100'
                        data-tip="Sign out">
                        <FontAwesome name='sign-out' />
                    </Link>
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