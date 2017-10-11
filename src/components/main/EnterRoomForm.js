import React from 'react';
import { connect } from "react-redux";

import history from '../../history';

import { joinRoom } from '../../ducks/rooms';

class EnterRoomForm extends React.Component {

    componentDidMount() {
        this._roomJid.focus();
    }

    handleSubmit = e => {
        e.preventDefault();

        let jid = this._roomJid.value;
        this._roomJid.value = '';

        let nickname = this._nickname.value;
        if(!nickname) {
            nickname = this.props.client.jid.local;
        }

        let password = this._password.value;
        if(!password) {
            password = '';
        }

        // TODO improve validation on jid
        if(jid) {
            this.props.joinRoom(jid, nickname, password);

            // Navigate to room
            history.push('/room/' + jid);
        }

    };

    render() {
        return (
        <div className="EnterRoomForm">
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="roomJid">Room JID</label>
                <input ref={el => this._roomJid = el} type="text" name="roomJid" id="roomJid" placeholder="Enter room JID" />
                <label htmlFor="nickname">Nickname <span>(optional)</span></label>
                <input ref={el => this._nickname = el} type="text" name="nickname" id="nickname" placeholder="Nickname" />
                <label htmlFor="password">Password <span>(optional)</span></label>
                <input ref={el => this._password = el} type="password" name="password" id="password" placeholder="Password" />
                <input type="submit" value="Join Room" />
            </form>
        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    client: state.client
});
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      joinRoom: (jid, nickname, password) => dispatch(joinRoom(jid, nickname, password)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EnterRoomForm);