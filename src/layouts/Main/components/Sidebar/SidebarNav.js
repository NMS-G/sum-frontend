import React, { forwardRef, Fragment, useContext } from 'react';
import { NavLink as RouterLink, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, List, ListItem } from '@material-ui/core';

import AuthContext from 'context/AuthContext';
import Typography from 'components/Main/Typography';

const useStyles = makeStyles(theme => ({
	label: {
		padding: theme.spacing(1, 4),
	},
	listItem: {
		paddingTop: 0,
		paddingBottom: 0
	},
	button: {
		padding: theme.spacing('20px', 4),
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		borderRadius: 0,
		'& .MuiButton-startIcon': {
			width: 32,
			height: 32,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}
	},
	active: {
		color: theme.palette.secondary.main,
		position: 'relative',
		'& .MuiButton-startIcon': {
			borderRadius: 3,
			backgroundColor: `${theme.palette.secondary.main}20`,
			'& svg path': {
				fill: theme.palette.secondary.main
			}
		},
		'&::before': {
			content: '""',
			position: 'absolute',
			left: 0,
			top: '50%',
			width: 3,
			height: 25,
			transform: 'translate(0, -50%)',
			background: theme.palette.secondary.main,
			borderRadius: '0px 3px 3px 0px'
		}
	},
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div ref={ref} style={{ flexGrow: 1 }}>
		<RouterLink {...props} />
	</div>
));

CustomRouterLink.displayName = 'CustomRouterLink';

const SidebarNav = props => {
	const { pages, className, ...rest } = props;
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	const userPermissions = authContext.user?.permissions || [];

	const handleClick = page => {
		const event = new CustomEvent('selectSidebarNavItem', { detail: page.href });
		window.dispatchEvent(event);

		history.push(page.href);
	};

	const checkIsMatch = item => {
		const pathname = location.pathname;
		const baseHref = item?.baseHref || item?.href?.split('/')?.[1];
		const isCreatePage = _.isArray(baseHref)
			? _.find(baseHref, href => pathname === `/${href}/create`)
			: pathname === `/${baseHref}/create`;
		const isEditPage = _.isArray(baseHref)
			? _.find(baseHref, href => pathname.search(new RegExp(`/${href}/[0-9]+/edit`)) > -1)
			: pathname.search(new RegExp(`/${baseHref}/[0-9]+/edit`)) > -1;
		let isMatch = pathname.indexOf(item.href) > -1;

		if (item?.withoutForm) isMatch = isMatch && !isCreatePage && !isEditPage;
		if (item?.isForm) isMatch = isCreatePage || isEditPage;

		if (item?.exactMatch) isMatch = pathname === item.href;
		return isMatch;
	};

	const checkPermission = item => {
		if (!item?.permission) return true;
		let permissions = _.isString(item.permission) ? [item.permission] : item.permission;

		if (_.indexOf(userPermissions, 'can_fully_manage_entities') > 0) {
			return true;
		}
		return _.intersection(permissions, userPermissions).length > 0;
	};

	const renderList = list => list.map((item, index) => {
		const isMatch = checkIsMatch(item);
		if (item?.children) {
			if (item.children.filter(checkPermission).length < 1) {
				return <Fragment key={index}></Fragment>;
			}
		}

		return (
			item.children ?
				<Fragment key={index}>
					<Typography key={index} variant="menuLabel" className={classes.label}>
						&gt;&gt;{' '}{item.title}
					</Typography>
					{renderList(item.children)}
				</Fragment>
				:
				(
					!checkPermission(item)
						? <Fragment key={index}></Fragment>
						: (
							<ListItem
								key={index}
								className={classes.listItem}
								disableGutters
								onClick={() => handleClick(item)}
							>
								<Button
									className={clsx({ [classes.button]: true, [classes.active]: isMatch })}
									component={CustomRouterLink}
									to={item.href}
									startIcon={item?.icon}
								>
									<Typography variant="h4">{item.title}</Typography>
								</Button>
							</ListItem>
						)
				)
		);
	});

	return (
		<List
			{...rest}
			className={clsx(classes.root, className)}
			style={{
				height: `calc(100vh - 85px${authContext.gFooterClosed ? '' : ' - 75px'})`,
				overflowY: 'auto'
			}}
		>
			{renderList(pages)}
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired,
};

export default SidebarNav;
