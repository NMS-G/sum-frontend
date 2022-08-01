import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import PrimaryButton from './PrimaryButton';

const useStyles = makeStyles(theme => ({
	controlBar: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(2, 6, 2, 4),
		margin: '10px -32px -40px',
		background: theme.palette.white,
	}
}));

const ControlButtonGroup = props => {
	const {
		onSave,
		onCancel,
		onClickPrimary,
		saving = false,
		cancelTitle = 'anuluj',
		saveTitle = 'Zapisz roboczo',
		primaryTitle = 'ZAPISZ',
		disabledPrimaryButton = false,
		disabledSaveButton = false,
		hidePrimaryButton = false,
		hideSaveButton = false,
	} = props;

	const classes = useStyles();
	return (
		<Box className={classes.controlBar}>
			<PrimaryButton onClick={onCancel} variant="outlined" style={{marginRight: 15}}>
				{cancelTitle}
			</PrimaryButton>
			<Box display="flex">
				{!hideSaveButton &&
					<PrimaryButton
						onClick={onSave}
						disabled={saving || disabledSaveButton}
					>
						{saveTitle}
					</PrimaryButton>
				}
				{!hidePrimaryButton &&
					<PrimaryButton
						style={{ marginLeft: 16 }}
						color="secondary"
						onClick={onClickPrimary}
						disabled={saving || disabledPrimaryButton}
					>
						{primaryTitle}
					</PrimaryButton>
				}
			</Box>
		</Box>
	);
};

export default ControlButtonGroup;