import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import PropTypes from "prop-types";
import { triggerPrintDialog, submitPrintForm, resetSuccessMessage } from '../actions/sourceWebClientActions';
import { connect } from 'react-redux';
import Loading from "../components/Loading";
import './PrintRequestFormDialog.less';

const PRINT_FORM_TYPE = 'pRequest';
class PrintRequestFormDialog extends Component {
    static get propTypes() {
        return {
            triggerPrintDialog: PropTypes.func.isRequired,
            resetSuccessMessage: PropTypes.func.isRequired,
            success: PropTypes.bool,
            loading: PropTypes.bool.isRequired,
            submitPrintForm: PropTypes.func.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            org: '',
            color: '',
            copies: 0,
            date: '',
            fileNamePlaceHolder: 'Upload File : ',
            selectedFile: null,
            isSubmitting: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    _isLoading() {
        return <Loading {...this.props} />
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onSubmit(value) {
        let form = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            org: this.state.org,
            color: this.state.color,
            copies: this.state.org,
            date: this.state.date,
            selectedFile: this.state.selectedFile,
        }
        this.props.submitPrintForm(form);
    }

    uploadFile(event) {
        this.setState({
            selectedFile: event.target.files[0],
            fileNamePlaceHolder: event.target.files[0].name,
        });
    }

    render() {
        if (this.props.success == null) {
            return (<div className="PrintRequestFormDialog">
                <form className="formDisplay" onSubmit={this.onSubmit}>
                    <h1 className="title">Print Job Request</h1>
                    <TextField label="First Name"
                        type="text"
                        name="firstName"
                        value={this.state.firstName || ''}
                        data-validators="isRequired,isAlpha"
                        onChange={this.onChange}
                        autoFocus={true} />
                    <TextField label="Last Name"
                        type="text"
                        name="lastName"
                        value={this.state.lastName || ''}
                        data-validators="isRequired,isAlpha"
                        onChange={this.onChange}
                        autoFocus={true} />
                    <TextField label="Email"
                        type="text"
                        name="email"
                        value={this.state.email || ''}
                        onChange={this.onChange}
                        data-validators="isRequired,isEmail" />
                    <TextField label="Club/Organization"
                        type="text"
                        name="org"
                        value={this.state.org || ''}
                        data-validators="isRequired,isAlpha"
                        onChange={this.onChange}
                        autoFocus={true} />
                    <FormControl required>
                        <InputLabel>Colors</InputLabel>
                        <Select
                            value={this.state.color || ''}
                            onChange={this.onChange}
                            name="color">
                            <MenuItem value="black">Black</MenuItem>
                            <MenuItem value="colors">Colors</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Number of Copies"
                        type="text"
                        name="copies"
                        value={this.state.copies || 0}
                        onChange={this.onChange}
                        data-validators="isRequired,isInt" />
                    <TextField
                        id="date"
                        label="Date"
                        name="date"
                        type="date"
                        onChange={this.onChange}
                        value={this.state.date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="upload">
                        <InputLabel>{this.state.fileNamePlaceHolder}</InputLabel>
                        <input accept="*" style={{ display: 'none' }} id="raised-button-file" type="file" onChange={this.uploadFile} />
                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" component="span">Upload</Button>
                        </label>
                    </div>
                    <div className="actionButtons">
                        <Button className="actionbutton" variant="contained" color="secondary" onClick={() => this.props.triggerPrintDialog(false)}>Cancel</Button>
                        <div className="empty"></div>
                        <Button className="actionbutton" variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button>
                    </div>
                </form>
                {this._isLoading()}
            </div>
            );
        }
        this.props.triggerPrintDialog(false);
        this.props.resetSuccessMessage();
        return null;
    }
}

const mapStateToProps = state => ({
    showPrintDialog: state.dialog.showPrintDialog,
    success: state.dialog.successRequest,
    loading: state.dialog.loading,
});
export default connect(mapStateToProps, { triggerPrintDialog, submitPrintForm, resetSuccessMessage })(PrintRequestFormDialog)