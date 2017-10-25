import React from 'react';
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';

import { setPresence } from '../../ducks/user';

import './UserInfo.css';

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPresence: 'available'
        };
    }

    presenceOpts = [
        { value: 'available', label: 'Available' },
        { value: 'dnd', label: 'Busy' }, 
        { value: 'away', label: 'Away' }, 
    ];

    setPresence(presence) {
        this.props.setPresence(presence);
    }

    renderPresenceOption(option) {
        return (
            <div className="presenceOption">
                <FontAwesome name='circle' className={ "presenceIcon " + option.value} />
                {option.label}
            </div>
        )
    }

    renderPresenceValue(presence) {
        return (
            <div className="currentPresence">
                <FontAwesome name='circle' className={ "presenceIcon " + presence.value} />
            </div>
        )
    }

    render() {
        return (
        <div className="UserInfo">

            { this.props.client.authenticated && 
                <div className="authenticated">

                    <div className="user">

                        <div className="presenceControl">
                            <Select
                                name="presence"
                                value={this.props.user.presence.value}
                                options={this.presenceOpts}
                                onChange={this.setPresence.bind(this)}
                                clearable={false}
                                optionRenderer={this.renderPresenceOption}
                                valueRenderer={this.renderPresenceValue}
                            />

                            {/* TODO have recent section which sets both presence and status */}

                        </div>

                        <div className="username">
                            <p>{ this.props.client.jid.local }</p>
                        </div>

                        <div className="status">
                            Set your status here...
                            {/* https://kaivi.github.io/riek/ */}
                        </div>

                    </div>

                </div>
            }

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  client: state.client,
  user: state.user
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        setPresence: (presence) => dispatch(setPresence(presence)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);