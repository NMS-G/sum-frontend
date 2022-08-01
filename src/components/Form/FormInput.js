import React from 'react';
import { makeStyles, Box, Grid } from '@material-ui/core';
import clsx from 'clsx';
import Typography from 'components/Main/Typography';
import InputTooltip from 'components/Main/InputTooltip';
import BaseInput from './BaseInput';

const useStyles = makeStyles(() => ({
	gutterBottom: {
		marginBottom: 10,
	},
}));

const FormInput = props => {
	const {
		title,
		titleVariant = 'bodyM',
		alignItems = 'center',
		containerClassName,
		inputClassName,
		gutterBottom = true,
		helperText,
		vertical = false,
		sm = 4,
		titleClassName,
		...rest
	} = props;
	const classes = useStyles();

	return (
		<Grid
			container
			alignItems={alignItems}
			spacing={1}
			className={clsx({ [classes.gutterBottom]: gutterBottom }, containerClassName)}
		>
			{title &&
				<Grid item xs={12} sm={vertical ? 12 : sm}>
					<Box display="flex" alignItems="center">
						<Typography variant={titleVariant} component="p" className={titleClassName}>
							{title}
						</Typography>
						{helperText && <InputTooltip title={helperText} />}
					</Box>
				</Grid>
			}
			<Grid item xs={12} sm={vertical || !title ? 12 : 12 - sm}>
				<BaseInput className={inputClassName} fullWidth {...rest} />
			</Grid>
		</Grid>
	);
};

export default FormInput;
