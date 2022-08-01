import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
	button: {
		borderRadius: 3,
		padding: '11px 18px',

		'& .MuiButton-label': {
			fontFamily: 'Open Sans',
			fontWeight: 'bold',
			fontSize: 13,
			lineHeight: 1.1,
		}
	},
}));

const PrimaryButton = React.forwardRef((props, ref) => {
	const { children, className, ...rest } = props;
	const classes = useStyles();

	return (
		<Button
			ref={ref}
			variant="contained"
			color="primary"
			disableElevation
			className={clsx(classes.button, className)}
			{...rest}
		>
			{children}
		</Button>
	);

});

PrimaryButton.displayName = 'PrimaryButton';
PrimaryButton.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default PrimaryButton;
