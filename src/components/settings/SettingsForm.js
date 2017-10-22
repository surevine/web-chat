import React from 'react';
import { Form, Checkbox, Text } from 'react-form'
import { connect } from "react-redux";

import { setUserNotification, setFormNotification, setKeywords, saveSettings } from '../../ducks/settings';

class SettingsForm extends React.Component {

    render() {
        return (
        <div className="SettingsForm">

            <Form onSubmit={this.handleSubmit}
                defaultValues={this.props.settings}>

                {({submitForm}) => {
                return (
                    <form onSubmit={submitForm}>

                        <label>
                            <Checkbox field='userNotifications' />
                            Enable notifications when you are mentioned
                        </label>

                        <label>
                            <Checkbox field='formNotifications' />
                            Enable notifications when forms are published
                        </label>

                        <label htmlFor="keywords">Keywords to highlight</label>
                        <Text id="keywords" name="keywords" field='keywords' />

                        <div className="actions">
                            <button className="primary-btn" type='submit'>Save Settings</button>
                        </div>
                    </form>
                )
                }}

            </Form>

        </div>
        );
    }

    handleSubmit = (values) => {

        // TODO render success pop-up toast?

        //  TODO remove this when we have the correct input type
        let parsedKeywords = values.keywords;
        if((typeof values.keywords) === 'string') {
            let splitValues = values.keywords.split(",");

            if(splitValues[0] === "") {
                parsedKeywords = []
            } else {
                parsedKeywords = splitValues
            }
            
        }

        // TODO change the keywrok parsing when we have correct UI control in place 
        let newSettings = {
            userNotifications: values.userNotifications,
            formNotifications: values.formNotifications,
            keywords: parsedKeywords
        }

        this.props.saveSettings(newSettings);
    };

}

const mapStateToProps = (state, props) => ({
    settings: state.settings
});
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
        setUserNotification: (enabled) => dispatch(setUserNotification(enabled)),
        setFormNotification: (enabled) => dispatch(setFormNotification(enabled)),
        setKeywords: (keywords) => dispatch(setKeywords(keywords)),
        saveSettings: (settings) => dispatch(saveSettings(settings)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);