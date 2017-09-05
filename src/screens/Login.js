import React from 'react';
import { connect } from "react-redux";

import { AUTH_ERRORS, login } from "../ducks/client";

class Login extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        // TODO verify valid jid?
        if(this._jid.value.length && this._password.value.length) {
            this.props.login(this._jid.value, this._password.value);
        }
    };

    componentDidMount() {

    }

    render() {

        if (this.props.error === AUTH_ERRORS.CERTIFICATE) {
        return (
            <div>
                <h1>Connection error!</h1>
                <p>Please check the xmpp server is running and refresh.</p>
            </div>
        );
        }

        return (
        <div className="Home">
            <h3>Login</h3>
            <form className="form" onSubmit={this.handleSubmit}>

                {this.props.error === AUTH_ERRORS.CREDENTIALS &&
                    <h3 style={{ color: "red" }}>OOPS: Looks like your login is incorrect</h3>}

                <input ref={el => this._jid = el} name="jid" id="jid" placeholder="Enter JID" />
                <input ref={el => this._password = el} name="password" type="password" id="password" placeholder="Password" />
                <input type="submit" value="Log in" />
            </form>
        </div>
        );
    }

}

const mapStateToProps = state => ({
  error: state.client.error
});

export default connect(mapStateToProps, { login })(Login);