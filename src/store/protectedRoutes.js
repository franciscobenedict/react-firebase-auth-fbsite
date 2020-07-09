import React from 'react';
import ReportsView from '../components/ReportsView';
import HomeView from '../components/HomeView';

const protectedRoutes = [
	{
		name: 'home',
		exact: true,
		path: '/home',
		main: props => <HomeView {...props} />,
		public: false,
	},
	{
		name: 'reports',
		exact: true,
		path: '/reports',
		main: props => <ReportsView {...props} />,
		public: false,
	},
];

export default protectedRoutes;
