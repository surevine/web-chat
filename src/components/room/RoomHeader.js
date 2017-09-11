import React from 'react';
import { connect } from 'react-redux';

import FontAwesome from 'react-fontawesome';

class RoomHeader extends React.Component {

    render() {
        return (
            <div id="roomHeader">
                {/* <RoomInfo /> */}
                <div className="info">
                    <h3>{ this.props.jid }</h3>
                    {this.props.topic && 
                    <p className="topic">{this.props.topic}</p>}
                </div>
                <div className="actions">
                    <a className="participantsMenu iconButton" onClick={this.props.toggleParticipants}>
                        { this.props.members.length } <FontAwesome name='user-o' />
                    </a>
                    <a className="bookmarkMenu iconButton" onClick={this.props.toggleBookmark}>
                        {this.props.bookmarked ? (
                            <FontAwesome name='bookmark' />
                        ) : (
                            <FontAwesome name='bookmark-o' />
                        )}
                    </a>
                    {/* TODO leave room */}
                </div>
            </div>
        );
    }

}

export default RoomHeader;