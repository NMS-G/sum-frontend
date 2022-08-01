import React from 'react';
import { makeStyles, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import clsx from 'clsx';

import Typography from 'components/Main/Typography';

const useStyles = makeStyles(theme => ({
	container: {
		'& .MuiRadio-root.Mui-disabled, & .MuiFormControlLabel-label.Mui-disabled': {
			color: '#4D4D4D'
		},
	},
	row: {
		'& .MuiFormControlLabel-root': {
			marginRight: theme.spacing(4),
		},
	},
	column: {
		'& .MuiFormControlLabel-root': {
			alignItems: 'flex-start',
			marginRight: 0,
			marginBottom: theme.spacing(2),
			'& .MuiFormControlLabel-label': {
				paddingTop: theme.spacing(1),
			},
		},
	},
	gutterBottom: {
		marginBottom: theme.spacing(2),
	},
}));

const RadioButton = props => {
	const {
		title,
		alignItems = 'center',
		name,
		list,
		value,
		onChange,
		row = false,
		gutterBottom = true,
		disabled
	} = props;

	const classes = useStyles();

	return (
		<Grid
			container
			alignItems={alignItems}
			className={clsx({
				[classes.container]: true,
				[classes.row]: row,
				[classes.column]: !row,
				[classes.gutterBottom]: gutterBottom
			})}
		>
			<Grid item xs={window.isMobile ? 12 : 4}><Typography>{title}</Typography></Grid>
			<Grid item xs={window.isMobile ? 12 : 8}>
				<FormControl component="fieldset" disabled={disabled}>
					<RadioGroup row={row} aria-label={name} name={name} value={value} onChange={onChange}>
						{list.map((item, i) => (
							<FormControlLabel key={i} value={item.name} control={<Radio />} label={item.label} />
						))}
					</RadioGroup>
				</FormControl>
			</Grid>
		</Grid>
	);
};

export default RadioButton;