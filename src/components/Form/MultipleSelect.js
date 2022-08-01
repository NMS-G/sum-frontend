import React from 'react';
import { Box, FormControl, Grid, MenuItem, Select as MuiSelect, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Typography from 'components/Main/Typography';
import InputTooltip from 'components/Main/InputTooltip';
import { TimesWhiteButton } from 'components/Buttons/IconButtons';

const useStyles = makeStyles(theme => ({
	vertical: {
		flexDirection: 'column',
	},
	horizontal: {
		alignItems: 'center',
		'& .MuiTypography-root': {
			marginRight: 8,
		}
	},
	inputBox: {
		borderRadius: 0,
		background: theme.palette.white,
		'& .MuiOutlinedInput-input': {
			padding: 10,
			paddingRight: 30,
		},
		'&.Mui-focused': {
			'& .MuiSelect-select': {
				background: theme.palette.white,
			},
			'& .MuiOutlinedInput-notchedOutline': {
				borderWidth: 1,
			}
		},
		'& .MuiChip-root': {
			borderRadius: 0,
			background: '#B41730',
			color: theme.palette.white,
			margin: '2px',
			flexDirection: 'row-reverse',
			'& .MuiChip-label': {
				paddingLeft: 5
			},
			'& .MuiChip-deleteIcon': {
				margin: 0
			}
		},
	},
	gutterBottom: {
		marginBottom: 5,
	},
	errorLabel: {
		color: 'red',
		fontSize: '0.75em',
		marginTop: '5px',
	},
}));

const MultipleSelect = props => {
	const {
		title,
		titleVariant = 'bodyM',
		name,
		value,
		multiple,
		options,
		valueField = 'value',
		labelField = 'label',
		displayEmpty = false,
		emptyLabel = 'Wybierz',
		error,
		hideErrorText = false,
		disabled,
		containerClassName,
		formControlClassName,
		vertical,
		sm = 4,
		helperText,
		gutterBottom = true,
		handleRemoveItem,
		inputProps = {},
		...rest
	} = props;
	const classes = useStyles();
	let val = multiple && !Array.isArray(value) ? (value ? [value] : []) : value;
	// if the value is null/undefined, change the value to empty string to show empty label.
	val = !val && typeof val !== 'boolean' ? '' : val;

	const handleDelete = ({ name, value }) => e => {
		e.stopPropagation();
		handleRemoveItem({ name, value });
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
							<Typography variant={titleVariant}>
								{title}
							</Typography>
							{helperText && <InputTooltip title={helperText} />}
						</Box>
					</Grid>
				}
				<Grid item xs={12} sm={vertical || !title ? 12 : 12 - sm}>
					<FormControl
						variant="outlined"
						className={formControlClassName}
						error={!!error}
						disabled={disabled}
						fullWidth>
						<MuiSelect
							MenuProps={{
								getContentAnchorEl: () => null,
							}}
							inputProps={{ name, ...inputProps }}
							className={classes.inputBox}
							value={val}
							multiple={multiple}
							displayEmpty={displayEmpty}
							renderValue={(selected) => {
								if (multiple) {
									return (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{selected?.map((value) => (
												<Chip
													key={value}
													label={options?.find(o => o.id === value)?.[labelField]}
													clickable
													deleteIcon={
														<TimesWhiteButton
															onMouseDown={(event) => event.stopPropagation()}
														/>
													}
													className={classes.chip}
													onDelete={handleDelete({ name, value })}
												/>
											))}
										</Box>
									);
								} else {
									return val || emptyLabel;
								}
							}}
							{...rest}>
							{displayEmpty &&
								<MenuItem value="">{emptyLabel}</MenuItem>
							}
							{!!options?.length && options.map((option, index) => (
								<MenuItem
									key={index}
									value={option[valueField]}
									disabled={option?.disabled}>
									{
										typeof labelField === 'string'
											? option[labelField]
											: labelField.map(field => `${option[field]} `)
									}
								</MenuItem>
							))}
						</MuiSelect>
						<div className={classes.errorLabel} style={{ display: error && !hideErrorText ? 'block' : 'none' }}>
							{error}
						</div>
					</FormControl>
				</Grid>
			</Grid>
		</>
	);
};

export default MultipleSelect;