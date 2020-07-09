import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';

const ProtectedRouteHoc = ({ component: Component, isLoggedIn, ...rest }) => {
	// console.log('isLoggedIn', isLoggedIn);
	if (isLoggedIn || rest.public) {
		// console.log('rest.public', rest.public);
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>;
				}}
			/>
		);
	}
	return <Redirect to={{ pathname: '/' }} />;
};

ProtectedRouteHoc.propTypes = {
	component: any,
	isLoggedIn: bool,
	rest: object,
	props: object,
};

export default withRouter(ProtectedRouteHoc);
