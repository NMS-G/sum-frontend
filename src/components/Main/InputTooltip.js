import React from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import Typography from './Typography';
import { QuestionIcon } from 'assets/svg';

const useStyles = makeStyles(() => ({
	tooltipIcon: {
		marginLeft: 10,
		minWidth: 21,
	},
	tooltip: {
		color: '#3B3E43',
		background: '#F1F5FC',
		border: '1px solid #B41730',
		borderRadius: 0,
		padding: 8,
		marginBottom: 8,
	},
	arrow: {
		color: '#fff',
		'&:before': {
			border: '1px solid #B41730',
		},
	},
}));

const InputTooltip = React.forwardRef(({ title }, ref) => {
	const classes = useStyles();
	return (
		<Tooltip
			ref={ref}
			classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
			title={<Typography variant="inputText">{title}</Typography>}
			placement="top-end"
			arrow
		>
			<QuestionIcon className={classes.tooltipIcon} />
		</Tooltip>
	);
});
InputTooltip.displayName = 'InputTooltip';

export default InputTooltip;