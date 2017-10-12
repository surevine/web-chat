import React from 'react';

class CheckboxField extends React.Component {

    constructor () {
        super();
        this.state = {
            isChecked: false
        };
    }

    toggleChecked(options)  {

        let checked = !this.state.isChecked;

        this.setState(function(prevState, props) {
            return {
                ...prevState,
                isChecked: checked
            };
        });

        this.props.onChange(this.props.name, checked);
    }

    render() {
        return (
            <input type="checkbox" name={this.props.name} id={this.props.name} value={this.props.options[0].value} checked={this.state.isChecked} onChange={this.toggleChecked.bind(this)} />
        );
    }

}

export default CheckboxField;