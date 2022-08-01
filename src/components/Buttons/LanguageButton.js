import React, { useState } from 'react';
import { makeStyles, Box, Tab, Tabs } from '@material-ui/core';

import Typography from 'components/Main/Typography';
import { EnFlagIcon, PlFlagIcon } from 'assets/svg';

const useStyles = makeStyles(() => ({
	tabs: {
		'& .MuiTab-labelIcon': {
			minHeight: 48,
			minWidth: 'unset',
			paddingInline: 0,
			'&:first-child': {
				marginRight: 20,
			},
		},
		'& .MuiTab-wrapper': {
			flexDirection: 'row',
			'& svg': {
				marginRight: 8
			},
		},
	}
}));

const LanguageButton = ({ title = 'Wybierz język raportu:', onChange, defaultValue = 'pl' }) => {
	const classes = useStyles();
	const [selectedLanguage, setSelectedLanguage] = useState(defaultValue);

	const handleChange = (event, newValue) => {
		setSelectedLanguage(newValue);
		onChange(newValue);
	};

	return (
		<Box display="flex" alignItems="center">
			{!window.isMobile &&
				<Typography variant="bodyS" style={{ marginRight: 16 }}>{title}</Typography>
			}
			<Tabs
				textColor="secondary"
				value={selectedLanguage}
				onChange={handleChange}
				className={classes.tabs}
			>
				<Tab label="Polski" icon={<PlFlagIcon />} value="pl" />
				<Tab label="English" icon={<EnFlagIcon />} value="en" />
			</Tabs>
		</Box>
	);
};

export default LanguageButton;