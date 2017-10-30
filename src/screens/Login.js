import React from 'react';
import { connect } from "react-redux";

import { AUTH_ERRORS, login } from "../ducks/client";

class Login extends React.Component {

    componentDidMount() {

    }

    render() {

        if (this.props.error === AUTH_ERRORS.CERTIFICATE) {
            return (
                <div className="Page">
                    <h2>Connection error</h2>
                    <p>Please ensure the xmpp server is running and refresh this page to try again.</p>
                </div>
            );
        }

        return (
        <div className="Home Page">
            <h2>Login</h2>
            <form className="form" onSubmit={this.handleSubmit}>

                {this.props.error === AUTH_ERRORS.CREDENTIALS &&
                    <h4 className="formError">Incorrect username or password</h4>}

                <label htmlFor="jid">Username</label>
                <input ref={el => this._jid = el} type="text" name="jid" id="jid" placeholder="Username" />
                <label htmlFor="password">Password</label>
                <input ref={el => this._password = el} name="password" type="password" id="password" placeholder="Password" />
                <div className="actions">
                    <input type="submit" value="Log in" />
                </div>
            </form>
        </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this._jid.value.length && this._password.value.length) {
            this.props.login(this._jid.value, this._password.value);
        }
    };

}

const mapStateToProps = state => ({
  error: state.client.error
});

export default connect(mapStateToProps, { login })(Login);