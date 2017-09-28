import React from 'react';
import Select from 'react-select';

class SelectField extends React.Component {

    constructor () {
        super();
        this.state = {
            selected: ''
        };
    }

    selected(options)  {

        let value = "";

        if(this.props.multi) {
            value = options.map(option => option.value);
        } else {
            value = options.value
        }

        this.props.onChange(this.props.name, value);

    }

    render() {
        return (
            <div className="fieldgroup">
                <Select
                        name={this.props.name}
                        value={this.props.value}
                        multi={this.props.multi}
                        options={this.props.options}
                        onChange={this.selected.bind(this)}
                    />
            </div>
        );
    }

}

export default SelectField;