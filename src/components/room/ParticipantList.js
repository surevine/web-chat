import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

class ParticipantList extends React.Component {

    render() {
        return (
        <div className="ParticipantList">

            { this.membersContainRole('moderator') && (
                <div className="roleGroup">
                    <h4>Moderators</h4>
                    {this.renderMembersWithRoleList('moderator') }
                </div>
            )}

            { this.membersContainRole('participant') && (
                <div className="roleGroup">
                    <h4>Participants</h4>
                    {this.renderMembersWithRoleList('participant') }
                </div>
            )}

            { this.membersContainRole('visitor') && (
                <div className="roleGroup">
                    <h4>Visitors</h4>
                    {this.renderMembersWithRoleList('visitor') }
                </div>
            )}
        </div>
        );
    }

    membersContainRole(role) {
        let filteredMembers = this.props.members.filter((member) => {
            return member.role === role;
        });
        if(filteredMembers.length) {
            return true;
        }
        return false;
    }

    renderMembersWithRoleList(role) {
        let filteredMembers = this.props.members.filter((member) => {
            return member.role === role;
        });

        return (
            <ul>
            {filteredMembers.map(member => (
                    <li key={member.resource}>   
                        <span data-delay-show='50' data-tip={this.buildMemberPresence(member)}>
                            <FontAwesome name='circle' className={ "presenceIcon " + member.presence} />
                            <ReactTooltip />
                        </span>
                        {member.resource}
                    </li>
            ))}
            </ul>
        );
    }

    buildMemberPresence(member) {
        let msg = '';

        switch(member.presence) {
            case "available":
                msg = 'Available';
                break;
            case "dnd":
                msg = "Busy";
                break;
            case "away":
                msg = "Away";
                break;
        }
        
        if(member.status && member.status.length) {
            msg += (' - ' + member.status);
        }

        return msg;
    }

}

export default ParticipantList;