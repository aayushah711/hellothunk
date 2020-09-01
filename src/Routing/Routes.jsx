import React from 'react';
import { Route } from 'react-router-dom';
import Registration from '../Components/Registration';
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Dummy from '../Components/Dummy';

export default function Routes(props) {
	return (
		<div>
			<Route path="/" exact component={Dashboard} />
			<Route path="/registration" exact component={Registration} />
			<Route path="/login" exact component={Login} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/dummy" exact component={Dummy} />
		</div>
	);
}
