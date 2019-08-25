import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LoginDialog from '../dialog/LoginDialog';
import source_noback from '../raw/pic_source.png';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { authenticated } from '../actions/sourceWebClientActions';
import Avatar from '@material-ui/core/Avatar';

import './SourceHeader.less';
const PROD = "https://us-central1-source-d3c30.cloudfunctions.net/app";
const DEV = "http://localhost:5000/source-d3c30/us-central1/app";
class SourceHeader extends Component {
    static get propTypes() {
        return {
            inDevelopment: PropTypes.bool.isRequired,
            isAuthenticated: PropTypes.bool,
            authenticated: PropTypes.func.isRequired,
            userName: PropTypes.string,
            userPicture: PropTypes.string,
        };
    }

    static get defaultProps() {
        return {
            isAuthenticated: false,
            userName: null,
            userPicture: null,
        };
    }

    constructor(props) {
        super(props);
        this._logUserIn = this._logUserIn.bind(this);
        this._logUserOut = this._logUserOut.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.state = {
            showModal: false,
            showAbout: false,
            loading: false,
            error: null,
        }
        this.showModal = false;
    }

    _logUserIn() {
        this.setState({
            showModal: true,
        })
    }

    _logUserOut() {
        fetch(`${DEV}/logout`, {
            method: 'POST'
        }).then(res => this.props.authenticated(false, null, null))
        .catch(err => console.log(err));
    }

    handleOnClose() {
        this.setState({
            showModal: false,
            loading: false,
            error: null,
        })
    }

    getDevelopmentWarning() {
        if (this.props.inDevelopment) {
            return (
                <div className="warning">
                    <strong id="strong">This website is still under development, so keep in mind that
                everything may not be running smoothly.</strong>
                    <span>This warning will not be here after the product goes
                into production</span>
                </div>
            );
        }
    }

    _renderNotLoggedInHeader() {
        return (
            <div className="options-item">
                <Button
                    onClick={() => this._logUserIn()}>Employee Login
            </Button>
            </div>
        );
    }

    _renderLoggedInUser() {
        return (
            <Tooltip title="Log out" onClick={() => this._logUserOut()} role="button">
                <div className="options-item">
                    <div className="userInfo">
                        <span className="username">{this.props.userName}</span>
                        <Avatar src={this.props.userPicture} />
                    </div>
                </div>
            </Tooltip>
        );
    }
    render() {
        return (
            <div className="SourceHeader">
                <div className="Header">
                    <div className="headerTitle">
                        <Link className="titleLink" to="/">
                            <div className="source-logo">
                                <img src={source_noback} alt={"logo"} />
                            </div>
                        </Link>
                    </div>
                    <div className="options">
                        <div className="options-item">
                            <Link to="/about">
                                <Button>About us</Button>
                            </Link>
                        </div>
                        {this.props.isAuthenticated
                            ? this._renderLoggedInUser()
                            : this._renderNotLoggedInHeader()}
                    </div>
                </div>
                <LoginDialog
                    visible={this.state.showModal}
                    onCloseModal={this.handleOnClose}
                    loading={this.state.loading}
                    error={this.state.error} />
                <div className="Development">
                    {this.getDevelopmentWarning()}
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.page.isAuthenticated,
    userName: state.page.userName,
    userPicture: state.page.userPicture,
});

export default connect(mapStateToProps, { authenticated })(SourceHeader)
