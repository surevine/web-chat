import React from 'react';
import { connect } from "react-redux";

class Settings extends React.Component {

    render() {

        return (
        <div className="Settings Page">
            <h2>Application Settings</h2>
            {/* TODO */}
        </div>
        );
    }

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(Settings);