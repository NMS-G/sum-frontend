import React from 'react';
import { makeStyles, Breadcrumbs as MuiBreadcrumbs, SvgIcon, Link as MuiLink, Box } from '@material-ui/core';
import { NavigateNext, HomeOutlined } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Typography from 'components/Main/Typography';
import Routes from 'router/Routes';

const useStyles = makeStyles(theme => ({
	link: {
		display: 'flex',
		alignItems: 'center'
	},
	icon: {
		marginRight: 5
	},
	active: {
		color: theme.palette.info.main
	},
	clickableItem: {
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline #000000'
		}
	}
}));

const Breadcrumbs = props => {
	const {
		separator = <NavigateNext fontSize="small" />,
		breadcrumbs = [],
		isHome = false,
		isShowHome = true,
		handleClick,
		...rest
	} = props;
	const classes = useStyles();

	const renderItem = (title, active = false) => (
		<Typography variant="link" color="textPrimary" className={clsx({ [classes.active]: active })}>
			{title}
		</Typography>
	);

	return (
		<Box my={1}>
			<MuiBreadcrumbs aria-label="breadcrumb" separator={separator} {...rest}>
				{isShowHome &&
					(
						isHome ?
							<Box className={classes.link}>
								<SvgIcon className={classes.icon} alt="Ikona modułu “Home“ w okruszkach">
									<HomeOutlined />
								</SvgIcon>
								{renderItem('Home')}
							</Box>
							:
							<MuiLink component={RouterLink} to={Routes.Home} className={classes.link}>
								<SvgIcon className={clsx(classes.icon, classes.active)} alt="Ikona modułu “Home“ w okruszkach">
									<HomeOutlined />
								</SvgIcon>
								{renderItem('Home', true)}
							</MuiLink>
					)};
				{breadcrumbs.map((item, i) => (
					item.to ?
						(
							<MuiLink key={i} component={RouterLink} to={item.to} className={classes.link}>
								{!isShowHome && i === 0 &&
									<SvgIcon className={clsx(classes.icon, classes.active)}  alt="Ikona modułu “Home“ w okruszkach">
										<HomeOutlined />
									</SvgIcon>
								}
								{renderItem(item.title, true)}
							</MuiLink>
						)
						: (
							<Box
								key={i}
								display='flex'
								alignItems='center'
								className={_.has(item, 'folderId') ? classes.clickableItem : ''}
								onClick={() => _.has(item, 'folderId') ? handleClick(item) : ''}
							>
								{!isShowHome && i === 0 &&
									<SvgIcon className={clsx(classes.icon, classes.active)} alt="Ikona modułu “Home“ w okruszkach">
										<HomeOutlined />
									</SvgIcon>
								}
								{renderItem(item.title, _.has(item, 'folderId') ? true : false)}
							</Box>
						)
				))}
			</MuiBreadcrumbs>
		</Box>
	);
};

Breadcrumbs.propTypes = {
	separator: PropTypes.node,
	breadcrumbs: PropTypes.array,
	isHome: PropTypes.bool,
	isShowHome: PropTypes.bool,
	handleClick: PropTypes.func,
};

export default Breadcrumbs;
