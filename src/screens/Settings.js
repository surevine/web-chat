import React from 'react';

import SettingsForm from '../components/settings/SettingsForm';

class Settings extends React.Component {

    render() {
        return (
        <div className="Settings Page">
            <h2>Application Settings</h2>
            <SettingsForm />
        </div>
        );
    }

}

export default Settings;