import React from 'react';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './AppToasts.css';

class AppToasts extends React.Component {

    componentDidUpdate(prevProps, prevState) {

        if(this.props.toast !== prevProps.toast) {

            switch(this.props.toast.type) {
    
                case "info":
                    toast.info(this.props.toast.message);
                break;
    
                case "warning":
                    toast.warn(this.props.toast.message);
                break;
    
                case "error":
                    toast.error(this.props.toast.message);
                break;
    
                default:
                    toast(this.props.toast.message);
            }
        }

    }

    render() {
        return (
        <div className="AppToasts">
            
            <ToastContainer 
                position="top-right"
                type="info"
                autoClose={3000000}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                />

        </div>
        )
    }

};

const mapStateToProps = (state, props) => ({
    toast: state.toast
});

export default connect(mapStateToProps, {})(AppToasts);