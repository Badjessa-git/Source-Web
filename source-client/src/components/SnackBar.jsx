import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import MySnackbarContentWrapper  from './MySnackbarContentWrapper';
import Snackbar from '@material-ui/core/Snackbar';

const SUCCESS_MESSAGE = " Your request has been submitted successfully";
const ERROR_MESSAGE = "There was an error submitting your message, please try again later or go to the SOuRCe Office for Help";
export default class SnackBar extends PureComponent {

    static get propTypes() {
        return {
            success: PropTypes.bool.isRequired,
        }
    }

    constructor(props){
        super(props);
        this.state = {
            open: true,
        }
        this._onClose = this._onClose.bind(this);
    }

    _onClose() {
        this.setState({
            open: false,
        })
    }

    render() {
        if (this.props.success != null) {
            return (<Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={4000}
            >
                <MySnackbarContentWrapper
                    variant={this.props.success ? "success" : "error"}
                    message={this.props.success ? SUCCESS_MESSAGE : ERROR_MESSAGE}
                    onClose={() => this._onClose()}
                />
            </Snackbar>
            );
        }
        return null;
    }
    
}