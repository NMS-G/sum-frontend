import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import Typography from 'components/Main/Typography';

const useStyles = makeStyles(theme => ({
	gutterBottom: {
		marginBottom: 10,
	},
	dateInput: {
		background: theme.palette.white,
		'& .MuiInputBase-root': {
			borderRadius: 0,
			paddingRight: 0,
			'& .MuiOutlinedInput-input': {
				padding: 10,
			},
			'& .MuiInputAdornment-root .MuiButtonBase-root': {
				padding: 10,
			},
			'& fieldset': {
				border: '1px solid #898989',
			},
			'&:not(.Mui-disabled)': {
				'&.Mui-focused, &:hover': {
					'& .MuiOutlinedInput-notchedOutline': {
						borderWidth: 1,
						borderColor: theme.palette.info.dark,
					},
				},
			},
			'&.Mui-disabled': {
				color: '#4D4D4D',
			},
		},
	}
}));


const DateInput = props => {
	const {
		title,
		titleVariant = 'bodyM',
		format = 'DD/MM/YYYY',
		name,
		onChange,
		error,
		hideErrorText = false,
		containerClassName,
		gutterBottom = true,
		vertical = false,
		sm = 4,
		...rest
	} = props;
	const classes = useStyles();
	const change = momentObject => {
		onChange?.({
			target: {
				name,
				value: !!momentObject && momentObject.isValid() ? momentObject.format('YYYY-MM-DD') : '',
			},
		});
	};

	return (
		<>
			<Grid
				container
				alignItems="center"
				spacing={1}
				className={clsx({ [classes.gutterBottom]: gutterBottom }, containerClassName)}
			>
				{title &&
					<Grid item xs={12} sm={vertical ? 12 : sm}>
						<Box display="flex" alignItems="center">
							<Typography variant={titleVariant} component="p">
								{title}
							</Typography>
						</Box>
					</Grid>
				}
				<Grid item xs={12} sm={vertical || !title ? 12 : 12 - sm}>
					<KeyboardDatePicker
						invalidDateMessage={null}
						onChange={change}
						inputVariant="outlined"
						variant="inline"
						format={format}
						error={!!error}
						className={classes.dateInput}
						autoOk
						{...rest}
					/>
					{error && !hideErrorText &&
						<Typography variant="inputStatus" color="secondary" style={{ marginTop: 5 }}>{error}</Typography>
					}
				</Grid>
			</Grid>
		</>
	);
};

export default DateInput;
