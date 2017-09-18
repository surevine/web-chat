import React from 'react';
import { connect } from "react-redux";

import history from '../../history';

import { joinRoom } from '../../ducks/rooms';

class EnterRoomForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();

        let jid = this._roomJid.value;
        this._roomJid.value = '';

        let nickname = this._nickname.value;
        if(!nickname) {
            nickname = this.props.client.jid.local;
        }

        this.props.joinRoom(jid, nickname);

        // Navigate to room
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

const mapStateToProps = (state, props) => ({
    client: state.client
});
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      joinRoom: (jid, nickname) => dispatch(joinRoom(jid, nickname)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EnterRoomForm);