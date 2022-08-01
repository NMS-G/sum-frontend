import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	progressContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	progress: {
		color: theme.palette.pink
	},
}));

const Progress = ({ status }) => {
	const classes = useStyles();

	return (
		status ?
			<div className={classes.progressContainer}>
				<CircularProgress className={classes.progress} />
			</div>
			:
			<></>
	);
};

Progress.propTypes = {
	status: PropTypes.bool,
};

export default withRouter(Progress);
