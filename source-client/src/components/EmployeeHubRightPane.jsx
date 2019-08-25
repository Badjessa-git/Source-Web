import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { rowClicked, displayDrawer } from '../actions/sourceWebClientActions';
import './EmployeeHubRightPane.less'
import 'react-table/react-table.css'
import DataDrawer from './DataDrawer';

class EmployeeHubRightPane extends Component {
    static get propTypes() {
        return {
            selectedSection: PropTypes.number.isRequired,
            rowClicked: PropTypes.func.isRequired,
            displayDrawer: PropTypes.func.isRequired,
            showDrawer: PropTypes.bool.isRequired,
            loading: PropTypes.bool,
            data: PropTypes.arrayOf(PropTypes.any).isRequired,
        };
    }

    static get defaultProps() {
        return {
            loading: false,
            drawerData: {},
        }
    }

    constructor(props) {
        super(props);
        this._onRowClick = this._onRowClick.bind(this);
    }

    _printJobsList() {
        let data = this.props.data;
        const columns = [{
            Header: 'First Name',
            accessor: 'data.firstName'
        }, {
            Header: 'Last Name',
            accessor: 'data.lastName',
        }, {
            Header: 'Club/Organization',
            accessor: 'data.org',
        }, {
            Header: 'Copies',
            accessor: 'data.copies',
        }]
        return <ReactTable
            className="highlight"
            columns={columns}
            data={data}
            resizable={false}
            showPageSizeOptions={false}
            defaultPageSize={20}
            loading={this.props.loading}
            getTdProps={(state, rowInfo) => this._onRowClick(state, rowInfo)}
        />;
    }

    _graphicJobList() {
        let data = this.props.data;
        const columns = [{
            Header: 'First Name',
            accessor: 'data.firstName'
        }, {
            Header: 'Last Name',
            accessor: 'data.lastName',
        }, {
            Header: 'Club/Organization',
            accessor: 'data.org',
        }, {
            Header: 'Notes',
            accessor: 'data.notes',
        }]
        return <ReactTable
            className="highlight"
            columns={columns}
            data={data}
            resizable={false}
            showPageSizeOptions={false}
            defaultPageSize={20}
            loading={this.props.loading}
            getTdProps={(state, rowInfo) => this._onRowClick(state, rowInfo)}
        />;
    }

    _loanJobRequest() {
        let data = this.props.data;
        const columns = [{
            Header: 'First Name',
            accessor: 'data.firstName'
        }, {
            Header: 'Last Name',
            accessor: 'data.lastName',
        }, {
            Header: 'Club/Organization',
            accessor: 'data.org',
        }, {
            Header: 'Item',
            accessor: 'data.rItem',
        }]
        return <ReactTable
            className="highlight"
            columns={columns}
            data={data}
            resizable={false}
            showPageSizeOptions={false}
            defaultPageSize={20}
            loading={this.props.loading}
            getTdProps={(state, rowInfo) => this._onRowClick(state, rowInfo)}
        />;
    }

    _selectedSection() {
        switch (this.props.selectedSection) {
            case 1:
                return this._printJobsList();
            case 2:
                return this._graphicJobList();
            case 3:
                return this._loanJobRequest();
            default:
                return null;
        }
    }

    _onRowClick(state, rowInfo) {
        return {
            onClick: (e, handleOriginal) => {
                const id = get(rowInfo, 'original.data.id');
                if (id) {
                    this.props.rowClicked(id);
                }
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                    handleOriginal()
                }
            }
        }
    }

    _displayDrawer() {
        if (this.props.showDrawer) {
            return <DataDrawer open={this.props.showDrawer} onClose={() => this.props.displayDrawer(false)}/>
        }
        return null;
    }

    render() {
        return (
            <div className="EmployeeHubRightPane">
                {this._selectedSection()}
                {this._displayDrawer()}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    selectedSection: state.page.selectedSection,
    data: state.page.data,
    showDrawer: state.page.showDrawer,
    loading: state.dialog.loading,
});

export default connect(mapStateToProps, { rowClicked, displayDrawer })(EmployeeHubRightPane)