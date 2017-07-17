import React from 'react';

class EnterRoomForm extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    handleSubmit = e => {
        e.preventDefault();
        let jid = this._roomJid.value;
        this._roomJid.value = '';

        this.context.router.history.push('/room/' + jid)
    };

    render() {
        return (
        <div className="EnterRoomForm">
            <form className="form" onSubmit={this.handleSubmit}>
                <input ref={el => this._roomJid = el} name="roomJid" id="roomJid" placeholder="Enter room JID" />
                <input type="submit" value="Join" />
            </form>
        </div>
        );
    }

}

export default EnterRoomForm;