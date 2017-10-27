import React from 'react';
import { connect } from "react-redux";
import { Form, Text } from 'react-form';

import history from '../../history';

import { joinRoom } from '../../ducks/rooms';

class EnterRoomForm extends React.Component {

    render() {
        return (
        <div className="EnterRoomForm">
            <Form onSubmit={this.handleSubmit}>
                { formApi => (
                    <form onSubmit={formApi.submitForm}>

                        <label htmlFor="roomJid">Room JID</label>
                        <Text autoFocus autoComplete="off" field="roomJid" name="roomJid" id="roomJid" placeholder="Enter room JID" />
                        
                        <label htmlFor="nickname">Nickname <span>(optional)</span></label>
                        <Text autoComplete="off" field="nickname" name="nickname" id="nickname" placeholder="Nickname" />
                        
                        <label htmlFor="password">Password <span>(optional)</span></label>
                        <Text autoComplete="off" field="password" name="password" id="password" placeholder="Password" />
                                 
                        <div className="actions">
                            <input type="submit" value="Join Room" />
                        </div>
                    </form>
                )}
            </Form>
        </div>
        );
    }

    handleSubmit = (values) => {

        let jid = values.roomJid;
        let nickname = values.nickname;
        if(!nickname) {
            nickname = this.props.client.jid.local;
        }

        let password = values.password;
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