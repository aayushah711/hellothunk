import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../Redux/Login/actions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleLogin = (e) => {
		e.preventDefault();
		const { password, username } = this.state;
		const { userLogin } = this.props;
		userLogin({ password, username });
	};

	render() {
		const { username, password } = this.state;
		const { handleChange, handleLogin } = this;
		const { isLoading, message, token, history } = this.props;
		if (token) {
			return <Redirect to="/dashboard" />;
		}
		console.log('login', this.props);
		return (
			<div>
				<form name="loginForm">
					<h1>Login Form</h1>
					<div>
						<label>
							Username:
							<input type="text" name="username" value={username} onChange={handleChange} />
						</label>
					</div>
					<div>
						<label>
							Password:
							<input type="password" name="password" value={password} onChange={handleChange} />
						</label>
					</div>

					<input type="submit" value="Login" onClick={handleLogin} />
				</form>
				<h2>{isLoading ? 'Loading...' : message}</h2>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.login.isLoading,
	error: state.login.error,
	message: state.login.message,
	token: state.login.token
});

const mapDispatchToProps = (dispatch) => ({
	userLogin: (payload) => dispatch(userLogin(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
