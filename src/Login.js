import React from 'react';

import Client from './xmppClient';

class Login extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    handleSubmit = e => {
        e.preventDefault();
        let jid = this._jid.value;
        let pass = this._password.value;

        // this._jid.value = '';

        // TODO invoke login, ensure successful, then redirect?

        // this.context.router.history.push('/room/' + jid)

        Client.connect({
            jid: jid,
            password: pass
        });
    };

    componentDidMount() {

        let self = this;

        Client.on('session:started', function () {
            window.fakeAuth.isAuthenticated = true;
            self.context.router.history.push('/')
        });
    }

    render() {
        return (
        <div className="Home">
            <h3>Login</h3>
            <form className="form" onSubmit={this.handleSubmit}>
                <input ref={el => this._jid = el} name="jid" id="jid" placeholder="Enter JID" />
                <input ref={el => this._password = el} name="password" id="password" placeholder="Password" />
                <input type="submit" value="Log in" />
            </form>
        </div>
        );
    }

}

export default Login;