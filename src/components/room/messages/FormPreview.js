import React from 'react';
import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip'
import FontAwesome from 'react-fontawesome';
import find from 'lodash/find';

class FormPreview extends React.Component {

    constructor () {
        super();
        this.state = {
            showRaw: false,
        };
    }

    render() {

        return (
            <div className="FormPreview">

                <div className="formPreview">
                    <FontAwesome name='file-text' className="icon" />
                    <p className="reference">{ this.props.message.form.fields[0].value }</p>  
                    <Moment format="Do MMMM YYYY, HH:mm">{this.getFormUpdated(this.props.message)}</Moment>
                    
                    <div className="actions">
                        {this.props.message.body && (
                            <a className="showRaw btn" onClick={this.toggleRaw.bind(this)}>Toggle Raw</a>
                        )}
                        <a className="expand btn">View</a>
                    </div>

                    {this.state.showRaw && (

                        <div className="raw">
                            {/* {this.props.message.body} */}

                            {this.props.message.body.split('\n').map((item, key) => {
                                return <span key={key}>{item}<br/></span>
                            })}

                        </div>   

                    )}
                 
                </div>

                {/* TODO: render specific field components instead */}
                {/* { this.props.fields.map(field => (

                    (field.type !== 'hidden') && (

                    <div key={field.name}>
                        <p>{field.name}: </p>
                        <p>{field.value}</p>
                    </div>

                    )

                ))} */}

            </div>
        );
    }

    toggleRaw() {
        this.setState(function(prevState, props) {
            if(props.message.body) {
                return {
                    ...prevState,
                    showRaw: !prevState.showRaw
                };
            }
            return prevState;
        });
    }

    getFormUpdated(form) {
        let lastUpdateField = find(form.form.fields, function(field) {
            return ((field.type === "hidden") && (field.name === "jchat.last_modified"));
        });
        return parseInt(lastUpdateField.value);
    }

}

export default FormPreview;