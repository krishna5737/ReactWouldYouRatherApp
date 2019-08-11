import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleGetUsers } from '../actions/users';
import { handleLoginUser } from '../actions/auth';
import logo from '../images/main-logo.png'

class Login extends Component {
	state = {
		userSelected: ''
	};

	componentDidMount() {
		this.props.dispatch(handleGetUsers());
	}

	handleChange = (e) => {
		const userSelected = e.target.value;
		this.setState(() => ({
			userSelected
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(handleLoginUser(this.state.userSelected));
	};

	render() {
		if (this.props.loading === true || !this.props.users) {
			return <div />;
		}

		const { from } = this.props.location.state || { from: { pathname: '/' } };

		if (this.props.isAuthed) {
			return <Redirect to={from} />;
		}

		return (
				<div>   
                    <img className="logo-image" alt="logo" src={logo}/>
                    <h1 className="form-heading">Login Form</h1>
                    <div className="login-form container">
                            <div className="main-div">
                                <div className="panel">
                                    <h1 className="display-4">Login</h1>
                                    <h2>Select user to Login</h2>
                                </div>
                                <form id="Login" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            id="userId"
                                            onChange={(e) => this.handleChange(e)}
                                        >
                                            <option />
                                            {Object.keys(this.props.users).map((user) => {
                                                return (
                                                    <option
                                                        key={this.props.users[user].id}
                                                        value={this.props.users[user].id}
                                                    >
                                                        {this.props.users[user].name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={this.state.userSelected === ''}
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                </div>
		);
	}
}

function mapStateToProps({ users, login }) {
	return {
		loading: users === null,
		users,
		isAuthed: login.authenticated
	};
}

export default connect(mapStateToProps)(Login);
