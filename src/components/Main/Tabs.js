import React, { useState } from 'react';
import { makeStyles, Tabs as MuiTabs, Tab, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	tabs: {
		marginTop: theme.spacing(2),
		'& .MuiTabs-flexContainer': {
			justifyContent: 'flex-end'
		},
		'& .MuiTab-root': {
			maxWidth: 'unset',
			background: '#FAFAFA',
			marginLeft: 10,
			borderRadius: '3px 3px 0px 0px',
			'&.Mui-selected': {
				background: theme.palette.white,
			},
		},
		'& .MuiTabs-indicator': {
			display: 'none',
		},
	},
	section: {
		padding: 30,
		background: theme.palette.white,
		'& .MuiTabPanel-root': {
			padding: 0,
		},
	},
}));

const Tabs = props => {
	const classes = useStyles();
	const { tabs, className, variant = 'standard', defaultValue, onChange } = props;

	const [tab, setTab] = useState(defaultValue || tabs[0].value);

	const handleTabChange = (e, newVal) => {
		setTab(newVal);
		if(onChange) onChange(newVal);
	};

	return (
		<TabContext value={tab}>
			<MuiTabs
				className={clsx(classes.tabs, className)}
				textColor="secondary"
				value={tab}
				onChange={handleTabChange}
				variant={variant}
			>
				{tabs.map((tab, i) => <Tab key={i} label={tab.label} value={tab.value} />)}
			</MuiTabs>
			<Box className={classes.section}>
				{tabs.map((tab, i) => <TabPanel key={i} value={tab.value}>{tab.children}</TabPanel>)}
			</Box>
		</TabContext>
	);
};

export default Tabs;
