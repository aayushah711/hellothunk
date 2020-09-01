import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../Redux/Login/actions';
import { Link } from 'react-router-dom';

export default function Dummy(props) {
	return (
		<div>
			<Link to="/dashboard">Go Back</Link>
		</div>
	);
}
