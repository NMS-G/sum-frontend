import React, { useEffect, useState } from 'react';
import { makeStyles, Box, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import Typography from 'components/Main/Typography';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import API from 'apis/API';

const useStyles = makeStyles(theme => ({
	section: {
		background: theme.palette.white,
		padding: theme.spacing(window.isMobile ? 2 : 4),
	},
	item: {
		alignItems: 'center',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	img: {
		width: 'fit-content',
		marginBottom: 35,
	},
	text: {
		textAlign: 'center',
		marginBottom: theme.spacing(2),
	}
}));

const Home = () => {
	const classes = useStyles();
	const [items, setItems] = useState([]);
	const [welcome, setWelcome] = useState({});

	useEffect(() => {
		document.title = 'SUM - Home';
		API.pages.get(6).then(({ data }) => {
			setWelcome({
				title: data?.page?.title,
				content: data?.page?.content
			});
			// setItems([
			// 	{
			// 		title: 'ZADANIA BADAWCZE',
			// 		image: '/images/research_tasks.png',
			// 		alt: 'Ikona symbolizująca moduł “Zadania Badawcze”',
			// 		link_label: 'ZOBACZ ZADANIA',
			// 		href: Routes.ResearchTasks.List,
			// 		description: data?.page?.content1,
			// 		hidden: !canAccessResearchTask,
			// 	},
			// 	{
			// 		title: 'ZARZĄDZANIE SUM',
			// 		image: '/images/wib_management.png',
			// 		alt: 'Ikona symbolizująca moduł “Zarządzanie SUM”',
			// 		link_label: 'PRZEGLĄDAJ KOSZTY',
			// 		href: Routes.Management.List(),
			// 		description: data?.page?.content2,
			// 		hidden: !canManageFinances,
			// 	},
			// 	{
			// 		title: 'REJESTR WŁASNOŚCI INTELEKTUALNEJ',
			// 		image: '/images/intellectual_property_register.png',
			// 		alt: 'Ikona symbolizująca moduł “Rejestr Własności Intelektualnej“',
			// 		link_label: 'ZOBACZ KARTY',
			// 		href: Routes.IpCards.List,
			// 		description: data?.page?.content3,
			// 		hidden: !canAccessIpCards,
			// 	},
			// ]);
			setItems([]);
		});
	}, []);

	return (
		<>
			<Header title="Home" />
			<Breadcrumbs isHome />
			<Box className={classes.section} mb={2.5}>
				<Typography variant="h3" paragraph>
					<span dangerouslySetInnerHTML={{ __html: welcome.title }} />
				</Typography>
				<Typography>
					<span dangerouslySetInnerHTML={{ __html: welcome.content }} />
				</Typography>
			</Box>
			<Grid container spacing={2} alignItems="stretch">
				{items.map((item, i) => (
					<React.Fragment key={i}>
						{item?.hidden
							? <></>
							: <Grid item sm={4} xs={12}>
								<Box className={clsx(classes.section, classes.item)}>
									<Box display="flex" flexDirection="column" alignItems="center">
										<img src={item.image} alt={item.alt} className={classes.img} />
										<Typography variant="h4" color="primary" className={classes.text}>{item.title}</Typography>
										<Typography className={classes.text}>
											<span dangerouslySetInnerHTML={{ __html: item.description }} />
										</Typography>
									</Box>
									<PrimaryButton to={item.href} component={RouterLink}>{item.link_label}</PrimaryButton>
								</Box>
							</Grid>
						}
					</React.Fragment>
				))}
			</Grid>
		</>
	);
};

export default Home;
