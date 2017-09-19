import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';

import { setPresence } from '../../ducks/user';

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
        this.props.setPresence(presence, this.props.rooms);
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
                <div>

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
                    </div>

                    <p>{ this.props.client.jid.local }</p>

                    <div className="controls">
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
                </div>
            }

        </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
  client: state.client,
  user: state.user,
  rooms: state.rooms
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        setPresence: (presence, rooms) => dispatch(setPresence(presence, rooms)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);