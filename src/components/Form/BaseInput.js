import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	input: {
		background: theme.palette.white,
		'& .MuiInputBase-root': {
			borderRadius: 0,
			'& .MuiOutlinedInput-input': {
				padding: 10,
			},
			'& fieldset': {
				border: '1px solid #898989',
			},
			'&.Mui-disabled': {
				color: '#4D4D4D',
			},
			'&:not(.Mui-disabled)': {
				'&.Mui-focused, &:hover': {
					'& .MuiOutlinedInput-notchedOutline': {
						borderWidth: 1,
						borderColor: theme.palette.info.dark,
					},
				},
			},
			'&.MuiOutlinedInput-multiline': {
				padding: 0
			}
		},
		'& .MuiFormHelperText-root': {
			marginInline: 0
		}
	},
}));

const BaseInput = props => {
	const {
		error,
		errorState = !!error,
		className,
		hideErrorText = false,
		...rest
	} = props;
	const classes = useStyles();

	return (
		<TextField
			variant="outlined"
			className={clsx(classes.input, className)}
			error={errorState}
			helperText={hideErrorText ? '' : error}
			{...rest}
		/>
	);
};

export default BaseInput;
