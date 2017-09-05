import React from 'react';
import FontAwesome from 'react-fontawesome';

class ParticipantList extends React.Component {

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
                    <li key={member.resource} title={member.status}>
                        <FontAwesome name='circle' className={ "presenceIcon " + member.presence} />
                        {member.resource}
                    </li>
            ))}
            </ul>
        );
    }

    render() {
        return (
        <div className="ParticipantList">

            <h2>Room members</h2>

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

}

export default ParticipantList;