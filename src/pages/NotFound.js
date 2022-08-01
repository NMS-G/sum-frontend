import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {

	},
	content: {
		paddingTop: 150,
		textAlign: 'center'
	},
	image: {
		marginTop: 50,
		display: 'inline-block',
		maxWidth: '100%',
		width: 560
	}
}));

const NotFound = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant='h1'>
				Błąd 404. <br /> Strona nie istnieje.
			</Typography>
		</div>
	);
};

export default NotFound;
