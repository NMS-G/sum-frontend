import React, { useEffect, useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';

import API from 'apis/API';
import { useLocation } from 'react-router-dom';
import Layout from 'pages/Auth/Layout';

const useStyles = makeStyles(theme => ({
	section: {
		border: '1px solid #B4B4B4',
		background: theme.palette.white,
		padding: theme.spacing(4, 4, 4, 4),
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2)
		},
	},
	content: {
		fontFamily: 'Open Sans'
	}
}));

const pages = {
	'/privacy-policy': {slug: 1, title: 'System SUM - Polityka prywatności'},
	'/regulations': {slug: 2, title: 'System SUM - Regulamin korzystania z systemu'},
	'/accessibility-declaration': {slug: 3, title: 'System SUM - Deklaracja dostępności'},
	'/information-clause': {slug: 4, title: 'System SUM - Klauzula informacyjna'},
};

const Show = () => {
	const location = useLocation();
	const classes = useStyles();

	const [data, setData] = useState({
		id: '',
		slug: '',
		title: '',
		content: '',
	});

	useEffect(() => {
		document.title = pages[location.pathname].title;
		if (pages[location.pathname]) {
			API.pages.get(pages[location.pathname].slug).then(res => {
				setData({ ...data, ...res.data.page });
			});
		}
	}, []);

	return (
		<Layout title={data.title} className={classes.root}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<div dangerouslySetInnerHTML={{ __html: data.content }} className={classes.content} />
			</Box>
		</Layout>
	);
};

export default Show;
