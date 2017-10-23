import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

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

                    <a className="leaveRoom iconButton"
                        onClick={this.props.leaveRoom}
                        data-tip
                        data-for="leaveRoomTip">
                        <FontAwesome name='sign-out' />
                    </a>
                    <ReactTooltip id='leaveRoomTip' place="bottom" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>Leave Room</span>
                    </ReactTooltip>

                    <a className="filesMenu iconButton"
                        onClick={this.props.toggleFiles}
                        data-tip
                        data-for="filesTip">
                        <FontAwesome name='file-image-o' /> { Object.keys(this.props.files).length }
                    </a>
                    <ReactTooltip id='filesTip' place="bottom" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>File Uploads</span>
                    </ReactTooltip>

                    <a className="formsMenu iconButton"
                        onClick={this.props.toggleForms}
                        data-tip
                        data-for="formsTip">
                        <FontAwesome name='file-text-o' /> { this.props.forms.length }
                    </a>
                    <ReactTooltip id='formsTip' place="bottom" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>Form Submissions</span>
                    </ReactTooltip>

                    <a className="participantsMenu iconButton" 
                        onClick={this.props.toggleParticipants}
                        data-tip
                        data-for="membersTip">
                        <FontAwesome name='user-o' /> { this.props.members.length }
                    </a>
                    <ReactTooltip id='membersTip' place="bottom" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>Room Members</span>
                    </ReactTooltip>

                    <a className="bookmarkMenu iconButton"
                        onClick={this.props.toggleBookmark}
                        data-tip
                        data-for="bookmarkTip">
                        {this.props.bookmarked ? (
                            <FontAwesome name='bookmark' />
                        ) : (
                            <FontAwesome name='bookmark-o' />
                        )}
                    </a>
                    <ReactTooltip id='bookmarkTip' place="bottom" effect='solid' delayShow={100} offset={{left:2}}>
                        <span>{this.props.bookmarked ? "Unbookmark Room" : "Bookmark Room"}</span>
                    </ReactTooltip>

                </div>
            </div>
        );
    }

}

export default RoomHeader;