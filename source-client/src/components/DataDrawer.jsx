import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import isUrl from 'is-url';
import Button from '@material-ui/core/Button';
import './DataDrawer.less';

class DataDrawer extends PureComponent {
    static get propTypes() {
        return {
            onClose: PropTypes.func.isRequired,
            drawerData: PropTypes.object,
            open: PropTypes.bool.isRequired,
            selectedSelection: PropTypes.number,
        };
    }

    static get defaultProps() {
        return {
            drawerData: {},
            selectedSection: 1,
        }
    }

    _buildDrawer() {
        switch (this.props.selectedSection) {
            case 1:
                return (
                    <div className="Print">
                        {this._printRowDrawer()}
                    </div>
                );
            case 2:
                return (
                    <div className="Graphic">
                        {this._graphicRowDrawer()}
                    </div>
                );
            case 3:
                return (
                    <div className="Loan">
                        {this._loanRowDrawer()}
                    </div>
                );
            default:
                return null;
        }
    }

    _grabCommonElements(data) {
        let firstName = this._displayData('First Name', data['firstName']);
        let lastName = this._displayData('Last Name', data['lastName']);
        let email = this._displayData('Email', data['email']);
        let org = this._displayData('Club/Organization', data['org']);
        let date = this._displayData('First Name', data['date']);
        return [firstName, lastName, email, org, date];
    }

    _printRowDrawer() {
        let elements = [];
        const data = this.props.drawerData.data;
        elements = this._grabCommonElements(data);
        let copies = this._displayData('N. Copies', data['copies']);
        let url = this._displayData('File Link', data['downloadUrl']);
        return elements.concat([copies, url]);
       
    }

    _graphicRowDrawer() {
        let elements = [];
        const data = this.props.drawerData.data;
        elements = this._grabCommonElements(data);
        let notes = this._displayData('Notes', data['notes']);
        let url = this._displayData('File Link', data['downloadUrl']);
        return elements.concat([notes, url]);
    }

    _loanRowDrawer() {
        let elements = [];
        const data = this.props.drawerData.data;
        elements = this._grabCommonElements(data);
        let itemBorrowed = this._displayData('Item Borrowed', data['rItem']);
        return elements.concat([itemBorrowed]);
    }

    _displayData(label, value) {
        return (<div className="display" key={label}>
            <span className="label">{label}</span>
            {isUrl(value) ? <a className="value" rel="noopener noreferrer" target="_blank" href={value}>Link</a>
                : <span className="value">{value}</span>}
        </div>
        );
    }

    render() {
        return (
            <div className="Drawer">
                <Drawer anchor="right" open={this.props.open} onClose={this.props.onClose}>
                    <span className="title">Request Information</span>
                    {this._buildDrawer()}
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedSection: state.page.selectedSection,
    drawerData: state.page.drawerData,
});

export default connect(mapStateToProps, {})(DataDrawer)