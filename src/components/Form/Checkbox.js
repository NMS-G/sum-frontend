import React from 'react';
import { makeStyles, FormControlLabel, Checkbox as MUICheckbox, Box } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
	fullWidth: {
		width: '100%'
	}
}));

const Checkbox = ({ title, value, fullWidth, ...rest }) => {
	const classes = useStyles();
	return (
		<Box className={clsx({[classes.fullWidth]: fullWidth})}>
			<FormControlLabel
				control={
					<MUICheckbox
						checked={!!value}
						{...rest}
					/>
				}
				label={title}
			/>
		</Box>
	);
};

Checkbox.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
	]),
	fullWidth: PropTypes.bool,
};

export default Checkbox;
