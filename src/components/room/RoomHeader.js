import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip'

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
                    <a className="participantsMenu iconButton" 
                        onClick={this.props.toggleParticipants}
                        data-offset="{'left': 2}"
                        data-delay-show='100'
                        data-tip="Room Members">
                        <FontAwesome name='user-o' /> { this.props.members.length }
                    </a>
                    <a className="formsMenu iconButton"
                        onClick={this.props.toggleForms}
                        data-offset="{'left': 2}"
                        data-delay-show='100'
                        data-tip="Form Submissions">
                        <FontAwesome name='file-text-o' /> { this.props.forms.length }
                    </a>
                    <a className="bookmarkMenu iconButton"
                        onClick={this.props.toggleBookmark}
                        data-offset="{'left': 2}"
                        data-delay-show='100'
                        data-tip={this.props.bookmarked ? "Unbookmark Room" : "Bookmark Room"}>
                        {this.props.bookmarked ? (
                            <FontAwesome name='bookmark' />
                        ) : (
                            <FontAwesome name='bookmark-o' />
                        )}
                    </a>
                    <a className="leaveRoom iconButton"
                        onClick={this.props.leaveRoom}
                        data-offset="{'left': 2}"
                        data-delay-show='100'
                        data-tip="Leave Room">
                        <FontAwesome name='sign-out' />
                    </a>
                </div>
            </div>
        );
    }

}

export default RoomHeader;