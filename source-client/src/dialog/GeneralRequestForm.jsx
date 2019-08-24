import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import './GeneralRequestForm.less';
import PropTypes from "prop-types";
import { triggerRequestDialog, submitRequestForm, resetSuccessMessage } from '../actions/sourceWebClientActions';
import { connect } from 'react-redux';
import Loading from "../components/Loading";

const GRAPHIC_REQUEST = 'gRequest';
const LOAN_REQUEST = 'lRequest';
class GeneralRequestForm extends Component {
    static get propTypes() {
        return {
            triggerRequestDialog: PropTypes.func.isRequired,
            submitRequestForm: PropTypes.func.isRequired,
            resetSuccessMessage: PropTypes.func.isRequired,
            success: PropTypes.bool,
            loading: PropTypes.bool.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            request: 'gRequest',
            firstName: '',
            lastName: '',
            email: '',
            org: '',
            notes: '',
            rItem: '',
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
        return <Loading {...this.props} />;
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onSubmit(value) {
        let form = {
            request: this.state.request,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            org: this.state.org,
            notes: this.state.notes,
            rItem: this.state.rItem,
            date: this.state.date,
            selectedFile: this.state.selectedFile,
        }
        this.props.submitRequestForm(form);
    }

    uploadFile(event) {
        this.setState({
            selectedFile: event.target.files[0],
            fileNamePlaceHolder: event.target.files[0].name,
        });
    }

    _renderGeneralForm() {
        return (
            <div className="generalInfo">
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
                <TextField
                    id="date"
                    label="Due Date"
                    name="date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        );
    }

    _renderGRequestForm() {
        if (this.state.request === LOAN_REQUEST) { return null; }
        return (
            <div className="gRequest">
                {this._renderGeneralForm()}
                <TextField label="Notes"
                    type="text"
                    name="notes"
                    value={this.state.notes || ''}
                    onChange={this.onChange}
                    data-validators="isRequired,isAlpha"
                    multiline />
                <div className="upload">
                    <InputLabel>{this.state.fileNamePlaceHolder}</InputLabel>
                    <input accept="*" style={{ display: 'none' }} id="raised-button-file" type="file" onChange={this.uploadFile} />
                    <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span">Upload</Button>
                    </label>
                </div>
            </div>
        );
    }

    _renderLRequestForm() {
        if (this.state.request === GRAPHIC_REQUEST) { return null; }
        return (
            <div className="lRequest">
                {this._renderGeneralForm()}
                <FormControl required>
                    <InputLabel>Item to Rent</InputLabel>
                    <Select
                        value={this.state.rItem || ''}
                        onChange={this.onChange}
                        name="rItem">
                        <MenuItem value="Table">Table</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    render() {
        if (this.props.success == null) {
            return (<div className="GeneralRequestForm">
                <form className="formDisplay" onSubmit={this.onSubmit}>
                    <h1 className="title">Request Request</h1>
                    <FormControl required>
                        <InputLabel>Request Type</InputLabel>
                        <Select
                            value={this.state.request || ''}
                            name="request"
                            onChange={this.onChange}>
                            <MenuItem value="gRequest">Graphic Design</MenuItem>
                            <MenuItem value="lRequest">Borrow Items</MenuItem>
                        </Select>
                    </FormControl>
                    {this._renderGRequestForm()}
                    {this._renderLRequestForm()}
                    <div className="actionButtons">
                        <Button className="actionbutton" variant="contained" color="secondary" onClick={() => this.props.triggerRequestDialog(false)}>Cancel</Button>
                        <div className="empty"></div>
                        <Button className="actionbutton" variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button>
                    </div>
                </form>
                {this._isLoading()}
            </div>
            );
        }
        this.props.triggerRequestDialog(false);
        this.props.resetSuccessMessage();
        return null;
    }
}

const mapStateToProps = state => ({
    showRequestDialog: state.dialog.showPrintDialog,
    success: state.dialog.successRequest,
    loading: state.dialog.loading,
});
export default connect(mapStateToProps, { triggerRequestDialog, submitRequestForm, resetSuccessMessage })(GeneralRequestForm)