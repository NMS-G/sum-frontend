import React, { useContext } from 'react';
import clsx from 'clsx';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, Box, Drawer, Button } from '@material-ui/core';
import AuthContext from 'context/AuthContext';

import {
	Accounts,
	Home,
	Logo,
	Logs,
	Options,
	NewsNormalIcon,
	LeftArrow,
	TimesBlack
} from 'assets/svg';

import Routes from 'router/Routes';
import SidebarNav from './SidebarNav';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	logo: {
		display: 'flex',
		alignItems: 'center',
		height: window.isMobile ? 'auto' : 85,
		padding: window.isMobile ? '20px 25px 10px 10px' : '30px 0 20px 32px',
		margintop: 20,
		marginBottom: 34,
		'& a': {
			width: '100%',
			'& svg': {
				width: window.isMobile ? 154 : 130,
				height: window.isMobile ? 68 : 72,
			}
		},
	},
	collapse: {
		position: 'fixed',
		top: 0,
		bottom: 0,
		zIndex: 200,
		'& .MuiButton-root': {
			minWidth: 20,
			height: '100%',
			padding: 4,
			background: '#fff',
			borderRadius: 0,
			borderTop: 0,
			borderBottom: 0,
		}
	},
	expandIcon: {
		'& .MuiButton-label svg': {
			transform: 'rotate(180deg)'
		}
	}
}));

const Sidebar = props => {
	const { open, variant, className, setOpenSidebar } = props;

	const classes = useStyles();
	const authContext = useContext(AuthContext);

	const items = [
		{
			title: 'Strona startowa',
			href: Routes.Home,
			icon: <Home />,
		},
		{
			title: 'Moduły',
			children: [
				{
					title: 'Parametry podsystemu',
					href: Routes.FinancialPlan.Statements.List,
					icon: <NewsNormalIcon />,
				},
				{
					title: 'Rodzaje świadczenia',
					href: Routes.FinancialPlan.Summaries.List,
					icon: <NewsNormalIcon />,
				},
			]
		},
		{
			title: 'SŁOWNIKI podsystemu',
			children: [
				{
					title: 'Parametry podsystemu',
					href: Routes.SubSystem.Parameters.List,
					icon: <NewsNormalIcon />,
				},
				{
					title: 'Rodzaje świadczenia',
					href: Routes.SubSystem.Types.List,
					icon: <NewsNormalIcon />,
				},
			]
		},
		{
			title: 'UŻYTKOWNICY',
			children: [
				{
					title: 'Zarządzaj użytkownikami',
					href: Routes.Users.List,
					icon: <Accounts />,
					permission: 'can_manage_users'
				},
				{
					title: 'Role',
					href: Routes.Role.List,
					icon: <Options />,
					permission: 'can_manage_roles'
				},
			]
		},
		{
			title: 'SYSTEM',
			children: [
				{
					title: 'Logi',
					href: Routes.Logs.List,
					icon: <Logs />,
					permission: 'can_view_logs'
				}
			]
		},
		// {
		// 	title: 'ZARZĄDZANIE TREŚCIĄ',
		// 	children: [
		// 		{
		// 			title: 'Treści stron',
		// 			href: Routes.Pages.List,
		// 			icon: <NewsNormalIcon />,
		// 			permission: 'can_manage_content',
		// 		}
		// 	],
		// },
	];

	return (
		<>
			<Drawer
				anchor='left'
				open={open}
				variant={variant}
				PaperProps={{
					style: {
						width: 323,
						height: authContext.gFooterClosed ? '100vh' : 'calc(100vh - 75px)'
					},
					'aria-label': 'Menu'
				}}
			>
				<div className={clsx(classes.root, className)}>
					<div className={classes.logo}>
						<RouterLink to={Routes.Home}>
							<Logo alt="Logo Wirtualnego Instytutu Badawczego" />
						</RouterLink>

						{window.isMobile &&
							<TimesBlack onClick={() => setOpenSidebar(false)} />
						}
					</div>

					<SidebarNav pages={items} />
				</div>
			</Drawer>

			{!window.isMobile &&
				<Box className={clsx(classes.collapse, { [classes.expandIcon]: !open })}>
					<Button variant="outlined" onClick={() => setOpenSidebar(!open)}>
						<LeftArrow />
					</Button>
				</Box>
			}
		</>
	);
};

Sidebar.propTypes = {
	open: PropTypes.bool,
	className: PropTypes.string,
	variant: PropTypes.string.isRequired,
};

export default withRouter(Sidebar);
