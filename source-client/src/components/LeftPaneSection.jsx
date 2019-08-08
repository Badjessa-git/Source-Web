import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './LeftPaneSection.less';

export default class LeftPaneSection extends PureComponent {
    static get propTypes() {
        return {
            id: PropTypes.number.isRequired,
            selectedLeftPaneSection: PropTypes.bool,
            name: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        }
    }

    static get defaultProps() {
        return {
            selectedLeftPaneSection: false,
        }
    }

    render() {
        const classname = classnames({
            selected: this.props.selectedLeftPaneSection,
        });
        return (
            <div className={`LeftPaneSection ${classname}`}
                 onClick={this.props.onClick}>
                <span>{this.props.name}</span>
            </div>
        );
    }
}