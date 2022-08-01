import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Box, Link } from '@material-ui/core';
import Typography from 'components/Main/Typography';
import { Logo } from 'assets/svg';
import Progress from 'components/Main/Progress';

const Layout = props => {
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'center',
			minHeight: '100vh'
		},
		logoWrapper: {
			display: 'flex',
			alignItems: 'center',
			'& svg': {
				marginLeft: 10,
				marginRight: 10,
			}
		},
		paper: {
			padding: window.isMobile ? '60px 23px' : 64,
			position: 'relative',
			backgroundColor: theme.palette.white,
			width: window.isMobile ? 'auto' : 937,
			minHeight: 773,
			borderRadius: 3,
			boxShadow: '0px 0px 10px 10px #00000010',
			marginBottom: 20
		},
		infoTxt: {
			textAlign: 'center',
			marginTop: 40,
			marginBottom: 40
		},
		pageLinks: {
			display: 'flex',
			position: 'absolute',
			left: '50%',
			transform: 'translate(-50%)',
			'& a': {
				margin: 10,
				marginTop: 30,
				whiteSpace: 'nowrap'
			}
		},
		textCenter: {
			textAlign: 'center',
			'& a': {
				margin: 10,
				marginTop: 30,
				whiteSpace: 'nowrap'
			}
		}
	}));

	const { children, title, subtitle, progressStatus, loginLink = true } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.paper}>
				<Box display="flex" flexDirection="column" alignItems="center">
					<div className={classes.logoWrapper}>
						<Link component={RouterLink} to="/">
							<Logo
								alt="Logo"
								width={window.isMobile ? 111 : 189}
								height={window.isMobile ? 37 : 106}
							/>
						</Link>
					</div>

					<Box mt={4} mb={2} style={{ width: '100%' }}>
						<Typography variant="h1" style={{ textAlign: 'center' }}>{title}</Typography>
						<Typography style={{ marginTop: 15 }}>
							<span dangerouslySetInnerHTML={{ __html: subtitle }} />
						</Typography>
					</Box>

					{children}

					<Progress status={progressStatus} />
				</Box>

				<Box className={window.isMobile ? classes.textCenter : classes.pageLinks}>
					<Link to="/privacy-policy" component={RouterLink} color="primary"><Typography variant="link">Polityka Prywatności</Typography></Link>
					<Link to="/regulations" component={RouterLink} color="primary"><Typography variant="link">Regulamin korzystania z serwisu</Typography></Link>
					<Link to="/accessibility-declaration" component={RouterLink} color="primary"><Typography variant="link">Deklaracja Dostępności</Typography></Link>
					<Link to="/information-clause" component={RouterLink} color="primary"><Typography variant="link">Klauzula Informacyjna</Typography></Link>
				</Box>
			</div>
			{loginLink &&
				<Link to="/login" component={RouterLink} color="primary"><Typography variant="link">Powrót na stronę logowania</Typography></Link>
			}
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node,
};

export default Layout;
