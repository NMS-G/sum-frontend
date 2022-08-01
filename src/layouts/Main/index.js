import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import ErrorBoundary from 'utils/ErrorBoundary';
import AuthContext from 'context/AuthContext';

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: 85
	},
	topbarMax: {
		width: '100%'
	},
	topbarMin: {
		width: window.isMobile ? '100%' : 'calc(100% - 323px)'
	},
	shiftContent: {
		paddingLeft: 323
	},
	content: {
		position: 'relative',
		overflowX: 'hidden',
		overflowY: 'auto',
		padding: window.isMobile ? '20px 13px 40px' : theme.spacing(5, 4, 5, 6)
	},
}));

const Main = props => {
	const { children } = props;
	const classes = useStyles();
	const location = useLocation();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
		defaultMatches: true
	});
	const [openSidebar, setOpenSidebar] = useState(true);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		setOpenSidebar(isDesktop);
	}, [isDesktop]);

	useEffect(() => {
		if (window.isMobile) {
			setOpenSidebar(false);
		}
	}, [location.pathname]);

	return (
		<div>
			<div
				className={clsx({
					[classes.root]: true,
					[classes.shiftContent]: (openSidebar && !window.isMobile)
				})}
			>
				<Topbar
					className={!openSidebar ? classes.topbarMax : classes.topbarMin}
					setOpenSidebar={setOpenSidebar}
				/>
				<Sidebar
					open={openSidebar}
					variant={window.isMobile ? 'temporary' : (openSidebar ? 'persistent' : 'temporary')}
					setOpenSidebar={setOpenSidebar}
				/>
				<ErrorBoundary>
					<main aria-label='Treść' className={classes.content} style={{
						height: `calc(100vh - 85px${authContext.gFooterClosed ? '' : ' - 75px'})`,
					}}>
						{children}
					</main>
				</ErrorBoundary>
			</div>
			<Footer />
		</div>
	);
};

Main.propTypes = {
	children: PropTypes.node,
};

export default Main;
