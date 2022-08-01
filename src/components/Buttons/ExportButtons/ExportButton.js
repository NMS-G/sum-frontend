import React from 'react';
import { makeStyles } from '@material-ui/core';

import { DownloadIcon } from 'assets/svg';
import PrimaryButton from 'components/Buttons/PrimaryButton';

const useStyles = makeStyles(theme => ({
	button: {
		paddingBlock: theme.spacing(0.5),
		marginRight: theme.spacing(1),
		background: theme.palette.white
	},
}));

const ExportButton = React.forwardRef((props, ref) => {
	const classes = useStyles();

	return (
		<PrimaryButton
			ref={ref}
			variant="outlined"
			startIcon={<DownloadIcon />}
			className={classes.button}
			{...props}
		>
			{props.children}
		</PrimaryButton>
	);
});

ExportButton.displayName = 'ExportButton';

export default ExportButton;
