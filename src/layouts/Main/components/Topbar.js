import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, AppBar, IconButton, Menu, MenuItem, Box } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import clsx from 'clsx';

import Routes from 'router/Routes';
import AuthContext from 'context/AuthContext';
import Typography from 'components/Main/Typography';

import HelpMenuPng from 'assets/svg/help_menu.svg';
import { Link } from 'react-router-dom';

import { BarIcon } from 'assets/svg';

const useStyles = makeStyles(theme => ({
	root: {
		height: '85px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: window.isMobile ? 'space-between' : 'flex-end',
		boxShadow: 'none',
		borderBottom: '1px solid #D0D0D0',
		padding: window.isMobile ? '20px 8px 15px 13px' : '20px 60px 15px 40px',
		backgroundColor: theme.palette.white,
		zIndex: '101',
	},
	iconButton: {
		padding: 0,
		marginLeft: 15,
		'&:hover': {
			background: 'none'
		},
		'& .MuiSvgIcon-root': {
			fontSize: 49
		}
	},
	helpMenu: {
		marginRight: 20,
	},
	fontWeight600: {
		fontWeight: 600
	}
}));

const Topbar = props => {
	const { className, setOpenSidebar, ...rest } = props;
	const history = useHistory();
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	const avatarRef = useRef();
	const [avatarOpen, setAvatarOpen] = useState(false);

	const handleClose = () => setAvatarOpen(false);

	const handleEditProfile = () => {
		history.push(Routes.Users.Profile);
		handleClose();
	};

	const handleLogout = () => {
		handleClose();
		authContext.logOut();
	};

	return (
		<AppBar className={clsx(classes.root, className)} {...rest} aria-label="Nagłówek">
			{window.isMobile &&
				<Box>
					<BarIcon
						onClick={() => setOpenSidebar(true)}
						width={19}
						height={14}
					/>
				</Box>
			}

			<Box display={'flex'} alignItems={'center'}>
				<Link to={Routes.Pages.Help}>
					<img className={classes.helpMenu} src={HelpMenuPng} alt="Ikona modułu “Pomoc“" />
				</Link>

				<IconButton
					aria-label='Profil użytkownika'
					aria-controls='menu-appbar'
					aria-haspopup='true'
					className={classes.iconButton}
					disableRipple
					ref={avatarRef}
					onClick={() => setAvatarOpen(true)}
				>
					{!window.isMobile &&
						<Typography color="primary" style={{ marginRight: 28 }}>{authContext?.user?.firstname} {authContext?.user?.surname}</Typography>
					}
					<AccountCircle alt="Ikona profilu użytkownika" />
				</IconButton>

				<Menu
					id='menu-appbar'
					anchorEl={avatarRef?.current}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={avatarOpen}
					onClose={handleClose}
				>
					{window.isMobile &&
						<MenuItem onClick={handleEditProfile} className={classes.fontWeight600}>
							{authContext?.user?.firstname} {authContext?.user?.surname}
						</MenuItem>
					}
					<MenuItem onClick={handleEditProfile}>Twój profil</MenuItem>
					<MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
				</Menu>
			</Box>
		</AppBar>
	);
};

export default Topbar;
