import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userRegister } from '../Redux/Registration/actions';

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseUrl: 'http://localhost:8080',
			name: '',
			email: '',
			password: '',
			username: '',
			mobile: '',
			description: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleRegistration = (e) => {
		e.preventDefault();
		const { name, email, password, username, mobile, description } = this.state;
		const { userRegister } = this.props;
		if (this.verifyData()) {
			userRegister({ name, email, password, username, mobile, description });
		}
	};

	verifyData = () => {
		let form = document.forms['registrationForm'];
		for (let i = 0; i < form.length - 1; i++) {
			if (form[i].value === '') {
				alert('Form is incomplete');
				return false;
			}
		}
		return true;
	};

	render() {
		const { name, email, password, username, mobile, description } = this.state;
		const { error, isLoading, message } = this.props;
		console.log('this.props', this.props, error, isLoading);

		const { handleChange, handleRegistration } = this;
		return (
			<div>
				<form name="registrationForm">
					<h1>Registration Form</h1>
					<div>
						<label>
							Name:
							<input type="text" name="name" value={name} onChange={handleChange} />
						</label>
					</div>
					<div>
						<label>
							Email:
							<input type="email" name="email" value={email} onChange={handleChange} />
						</label>
					</div>
					<div>
						<label>
							Password:
							<input type="password" name="password" value={password} onChange={handleChange} />
						</label>
					</div>
					<div>
						<label>
							Username:
							<input type="text" name="username" value={username} onChange={handleChange} />
						</label>
					</div>
					<div>
						<label>
							Mobile:
							<input type="tel" name="mobile" value={mobile} onChange={handleChange} />
						</label>
					</div>
					<div>
						<label>
							Description:
							<textarea
								type="text"
								name="description"
								value={description}
								onChange={handleChange}
								rows="3"
							/>
						</label>
					</div>

					<input type="submit" value="Register" onClick={handleRegistration} />
				</form>
				<h2>{message}</h2>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.registration.isLoading,
	error: state.registration.error,
	message: state.registration.message
});

const mapDispatchToProps = (dispatch) => ({
	userRegister: (payload) => dispatch(userRegister(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
