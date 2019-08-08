import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import source_logo from '../raw/pic_source.png';


import './Loading.less';

export default class Loading extends PureComponent {
    static get propTypes() {
        return {
            loading: PropTypes.bool.isRequired,
        }
    }
    _getLoading() {
        debugger;
        if (this.props.loading) {
            return (
                <img src={source_logo} alt="loading" />
            );
        }
        return null;
    }

    _getLoadingText() {
        if (this.props.loading) {
            return (
                <span className="loadingText">Submitting Request...</span>
            );
        }
        return null;
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="Loading">
                    <div className="loading-logo">
                        {this._getLoading()}
                    </div>
                    {/* {this._getLoadingText()} */}
                </div>
            );
        }
        return null;
    }
}