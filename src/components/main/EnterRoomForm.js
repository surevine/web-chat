import React from 'react';

import history from '../../history';

class EnterRoomForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();

        let jid = this._roomJid.value;
        this._roomJid.value = '';

        // TODO set nickname to be used when joining!

        // Navigate to room
        // TODO set in state / fire action to join the room?
        history.push('/room/' + jid);
    };

    render() {
        return (
        <div className="EnterRoomForm">
            <form className="form" onSubmit={this.handleSubmit}>
            <input ref={el => this._roomJid = el} name="roomJid" id="roomJid" placeholder="Enter room JID" />
                <input ref={el => this._nickname = el} name="nickname" id="nickname" placeholder="Nickname (optional)" />
                <input type="submit" value="Join" />
            </form>
        </div>
        );
    }

}

export default EnterRoomForm;