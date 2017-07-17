import React from 'react';

class ParticipantList extends React.Component {

    // presence.muc.role -> moderator or participant

    renderMembersWithRoleList(role) {
        let filteredMembers = this.props.members.filter((member) => {
            return member.role === role;
        });

        return (
            <ul>
            {filteredMembers.map(member => (
                    <li key={member.resource}>{member.resource}</li>
            ))}
            </ul>
        );
    }

    render() {
        return (
        <div className="ParticipantList">
            <h4>Moderators</h4>
            { this.renderMembersWithRoleList('moderator') }
            <h4>Participants</h4>
            { this.renderMembersWithRoleList('participant') }
        </div>
        );
    }

}

export default ParticipantList;