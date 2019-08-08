import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModalLogin from 'react-modal-login';
import { googleconfig } from '../config/config';
import { firebaseConfig } from '../constants/config';
import { authenticated } from '../actions/sourceWebClientActions';
import history from '../history';
import './LoginDialog.less';
import * as firebase from "firebase/app";


// Add the Firebase services that you want to use
import "firebase/auth";
firebase.initializeApp(firebaseConfig);
const PROD = "https://us-central1-source-d3c30.cloudfunctions.net/app";
const DEV = "http://localhost:5000/source-d3c30/us-central1/app";
class LoginDialog extends Component {
    static get defaultProps() {
        return {
            authenticated: PropTypes.func.isRequired,
            showModal: PropTypes.bool.isRequired,
            onCloseModal: PropTypes.func.isRequired,
            history: PropTypes.object.isRequired,
            error: PropTypes.object,
        };
    }

    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            error: this.props.error,
        });
        this.startLoading = this.startLoading.bind(this);
        this.finishLoading = this.finishLoading.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRecoverPassword = this.onRecoverPassword.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFail = this.onLoginFail.bind(this);
    }

    onLoginFail(method, response) {
        this.setState({
            loading: false,
            error: response
        })
        this.props.authenticated(false);
        this.props.onCloseModal();
    }

    signIntoFirebase(response) {
        let postParam = {
            id_token: response.id_token,
        }
        fetch(`${PROD}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(postParam)
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((userData) => {
                    this.props.authenticated(true, userData.displayName, userData.photoURL);
                    this.setState({
                        loading: false,
                        error: null,
                    });
                    history.push('/dashboard');
                });
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    onLoginSuccess(method, response) {
        this.props.onCloseModal();
        this.signIntoFirebase(response);
    }

    onLogin() {
        console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!email || !password) {
            this.setState({
                error: true
            })
        } else {
            this.onLoginSuccess('form');
        }
    }

    onRecoverPassword() {
        console.log('__onFotgottenPassword__');
        console.log('email: ' + document.querySelector('#email').value);

        const email = document.querySelector('#email').value;


        if (!email) {
            this.setState({
                error: true,
                recoverPasswordSuccess: false
            })
        } else {
            this.setState({
                error: null,
                recoverPasswordSuccess: true
            });
        }
    }

    startLoading() {
        this.setState({
            loading: true,
        })
    }

    finishLoading() {
        this.setState({
            loading: false,
        })
    }

    render() {
        return (
            <div className="LoginDialog">
                <ReactModalLogin
                    visible={this.props.visible}
                    onCloseModal={this.props.onCloseModal}
                    loading={this.state.loading}
                    startLoading={this.startLoading}
                    finishLoading={this.finishLoading}
                    form={{
                        onLogin: this.onLogin,
                        onRecoverPassword: this.onRecoverPassword,
                        loginInputs: [
                            {
                                containerClass: 'RML-form-group',
                                label: 'Email',
                                type: 'email',
                                inputClass: 'RML-form-control',
                                id: 'email',
                                name: 'email',
                                placeholder: 'Email',
                            },
                            {
                                containerClass: 'RML-form-group',
                                label: 'Password',
                                type: 'password',
                                inputClass: 'RML-form-control',
                                id: 'password',
                                name: 'password',
                                placeholder: 'Password',
                            }
                        ],
                        loginBtn: {
                            label: "Sign in"
                        },
                    }}
                    separator={{
                        label: "or"
                    }}
                    providers={{
                        google: {
                            config: googleconfig,
                            onLoginSuccess: this.onLoginSuccess,
                            onLoginFail: this.onLoginFail,
                            inactive: false,
                            label: "Continue with Google"
                        }
                    }}
                />
            </div>
        );
    }
}

export default connect(null, { authenticated })(LoginDialog)