import React from 'react';
import { makeStyles, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import FormInput from './FormInput';

const useStyles = makeStyles(theme => ({
	input: {
		'& .MuiInputBase-root .MuiOutlinedInput-input': {
			paddingLeft: 0
		},
		'&:hover .MuiSvgIcon-root':{
			color: theme.palette.info.main
		}
	},
}));

const SearchInput = props => {
	const classes = useStyles();

	const Adornment = (
		<InputAdornment position="start">
			<Search />
		</InputAdornment>
	);

	return (
		<FormInput
			{...props}
			inputClassName={classes.input}
			InputProps={{ startAdornment: Adornment }}
			gutterBottom={false}
		/>
	);
};

export default SearchInput;
