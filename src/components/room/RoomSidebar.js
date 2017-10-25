import React from 'react';

import ParticipantList from './ParticipantList';
import FormsList from './FormsList';
import FilesList from './FilesList';

import './RoomSidebar.css';

class RoomSidebar extends React.Component {

    render() {
        return (
            <div className="RoomSidebar">

                <div className="sidebarHeader">

                    { this.props.showParticipantsList && (
                        <h2>{this.props.members.length} Members</h2>
                    )}

                    { this.props.showFormsList && (
                        <h2>{this.props.forms.length} Form Submissions</h2>
                    )}

                    { this.props.showFilesList && (
                        <h2>{this.props.files.length} File Uploads</h2>
                    )}

                    <a className="closeSidebar" title="Close sidebar" onClick={this.props.hideSidebar}>
                        &#x2715;
                    </a>

                    <div className="clearfix"></div>

                </div>

                <div className="sidebarContent">

                { this.props.showParticipantsList && (
                    <ParticipantList members={this.props.members}></ParticipantList>
                )}

                { this.props.showFormsList && (
                    <FormsList forms={this.props.forms}></FormsList>
                )}

                { this.props.showFilesList && (
                    <FilesList files={this.props.files}></FilesList>
                )}

                </div>

            </div>
        );
    }

}

export default RoomSidebar;