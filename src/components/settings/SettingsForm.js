import React from 'react';
import { connect } from "react-redux";
import { Form, Checkbox } from 'react-form';

import TagField from '../forms/TagField';

import { loadSettings, saveSettings } from '../../ducks/settings';
import { showToast } from '../../ducks/toast';

import './SettingsForm.css';

class SettingsForm extends React.Component {

    componentDidMount() {
        this.props.loadSettings();
    }

    render() {
        return (
        <div className="SettingsForm">

            <Form onSubmit={this.handleSubmit}
                defaultValues={this.props.settings}>

                { formApi => (
                    <form onSubmit={formApi.submitForm}>

                        <label htmlFor="userNotifications">
                            <Checkbox id="userNotifications" name="userNotifications" field='userNotifications' />
                            Enable notifications when you are mentioned
                        </label>

                        <label>
                            <Checkbox field='formNotifications' />
                            Enable notifications when forms are published
                        </label>

                        <label htmlFor="keywords">Keywords to highlight</label>
                        <TagField 
                            placeholder="Add keyword..."
                            id="keywords" 
                            name="keywords" 
                            field='keywords' 
                            multi={true} 
                            options={[]} />

                        <div className="actions">
                            <button className="primary-btn" type='submit'>Save Settings</button>
                        </div>
                    </form>
                )
                }

            </Form>

        </div>
        );
    }

    handleSubmit = (values) => {

        let parsedKeywords = [];
        values.keywords.forEach((keyword) => {
            parsedKeywords.push(keyword.value);
        });

        let newSettings = {
            userNotifications: values.userNotifications,
            formNotifications: values.formNotifications,
            keywords: values.keywords
        }

        this.props.saveSettings(newSettings);
        this.props.showToast('Settings saved', 'info');
    };

}

const mapStateToProps = (state, props) => ({
    settings: state.settings
});
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
        loadSettings: () => dispatch(loadSettings()),
        saveSettings: (settings) => dispatch(saveSettings(settings)),
        showToast: (message, type) => dispatch(showToast(message, type)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);