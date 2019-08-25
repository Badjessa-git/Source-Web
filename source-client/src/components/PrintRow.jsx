import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames  from 'classnames';

import './PrintRow.less';
export default class PrintRow extends PureComponent {
    static get propTypes() {
        return {
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            org: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            copies: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            downloadUrl: PropTypes.string.isRequired,
            completed: PropTypes.bool,
            isHeader: PropTypes.bool,
        };
    }

    static get defaultProps() {
        return {
            completed: false,
            isHeader: false,
        };
    }

    render() {
        let rowClassName = classnames({
            completed: this.props.completed,
            header: this.props.isHeader,
        });

        return (
            <div className={`PrintRow ${this.props.id} ${rowClassName}`}>
                <span>{this.props.isHeader ? 'First Name' : this.props.firstName}</span>
                <span>{this.props.isHeader ? 'Last Name' : this.props.lastName}</span>
                <span>{this.props.isHeader ? 'Email' : this.props.email}</span>
                <span>{this.props.isHeader ? 'Club/Organization' : this.props.org}</span>
                <span>{this.props.isHeader ? 'Color' : this.props.color}</span>
                <span>{this.props.isHeader ? 'Copies' : this.props.copies}</span>
                <span>{this.props.isHeader ? 'Date' : this.props.date}</span>
                <span>{this.props.isHeader ? 'File Link' : this.props.downloadUrl}</span>
            </div>
        );
    }
}