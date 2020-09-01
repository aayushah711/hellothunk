import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUserData, togglePage } from '../Redux/App/actions';
import { logoutUser } from '../Redux/Login/actions';
import { Redirect, Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { Box, Drawer, AppBar, Toolbar, Button } from '@material-ui/core';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
			// data: []
		};
	}

	handleChange = (pageNo) => {
		const { togglePage, fetchUserData } = this.props;
		const { value } = this.state;
		togglePage(pageNo);
		fetchUserData({ user: value, page: pageNo });
	};

	render() {
		const { value } = this.state;
		const { userData, fetchUserData, isLoading, logoutUser, isAuth, page } = this.props;
		if (!isAuth) {
			return <Redirect to="/login" />;
		}
		return (
			<div className="App">
				<AppBar position="static">
					<Toolbar>
						<Button color="inherit" onClick={logoutUser}>
							Logout
						</Button>
						<Link to="/dummy" style={{ textDecoration: 'none', color: 'white' }}>
							<Button color="inherit">Dummy</Button>
						</Link>
					</Toolbar>
				</AppBar>

				<h1>Github async</h1>
				<input
					name="value"
					value={value}
					onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
				/>
				<button onClick={() => fetchUserData({ user: value, page: page })}>Search</button>

				{userData.length ? (
					<Box display="flex" justifyContent="center" alignItems="center" m={5}>
						<Pagination
							count={10}
							color="primary"
							page={page}
							onChange={(e, pageNo) => this.handleChange(pageNo)}
						/>
					</Box>
				) : null}

				<div>{isLoading && 'Loading...'}</div>
				{!isLoading &&
					userData &&
					userData.map((item) => (
						<div key={item.id}>
							<img src={item.avatar_url} alt={item.login} height="100" width="100" />
							{item.login}
						</div>
					))}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.app.userData,
	isLoading: state.app.isLoading,
	isError: state.app.isError,
	page: state.app.page,
	isAuth: state.login.isAuth
});

const mapDispatchToProps = (dispatch) => ({
	fetchUserData: (payload) => dispatch(fetchUserData(payload)),
	logoutUser: () => dispatch(logoutUser()),
	togglePage: (page) => dispatch(togglePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
