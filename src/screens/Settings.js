import React from 'react';
import { connect } from "react-redux";

class Settings extends React.Component {

    render() {

        return (
        <div className="Settings">
            <h3>Settings</h3>
            {/* TODO */}
        </div>
        );
    }

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(Settings);