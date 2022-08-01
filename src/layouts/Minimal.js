import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Footer from './Main/components/Footer';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh'
	},
}));

const Minimal = props => {
	const { children } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{children}

			<Footer />
		</div>
	);
};

Minimal.propTypes = {
	children: PropTypes.node,
};

export default Minimal;
