import React from 'react';
import { makeStyles, Tooltip as MuiTooltip } from '@material-ui/core';
import Typography from './Typography';

const useStyles = makeStyles(() => ({
	tooltip: {
		marginBottom: 0,
		background: '#17253FE5',
		borderRadius: 0
	}
}));

const Tooltip = props => {
	const {
		classes,
		title = '',
		titleVariant = 'inputText',
		placement = 'top',
		children,
		...rest
	} = props;
	const classNames = useStyles();

	return (
		<MuiTooltip
			classes={{ tooltip: classNames.tooltip, ...classes }}
			placement={placement}
			title={typeof title === 'string'
				? <Typography variant={titleVariant}>{title}</Typography>
				: title
			}
			{...rest}
		>
			{children}
		</MuiTooltip>
	);
};

export default Tooltip;