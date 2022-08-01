import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Typography from 'components/Main/Typography';
import AuthContext from 'context/AuthContext';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'fixed',
		left: 0,
		bottom: 0,
		right: 0,
		height: 75,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '20px 60px',
		backgroundColor: theme.palette.background.gray,
		zIndex: 1200,
	},
}));

const Footer = () => {
	const classes = useStyles();
	const authContext = useContext(AuthContext);

	if (authContext.gFooterClosed) return null;
	return (
		<Box className={classes.root} aria-label='Stopka'>
			<Typography variant="link" style={{ color: '#E0E1E3' }}>
				Aby korzystać z serwisu, należy zapoznać się z{' '}
				<Link to="/privacy-policy" style={{ color: '#E0E1E3', textDecoration: 'underline' }}>Polityką prywatności</Link>
			</Typography>
			<Button variant="text" style={{ color: '#A6C7F2' }} onClick={() => authContext.setGFooterClosed(true)}>Rozumiem</Button>
		</Box>
	);
};

export default Footer;
