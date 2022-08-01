import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Box, SvgIcon } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'components/Form/Select';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import Typography from './Typography';
import { PlusIcon } from 'assets/svg';

const useStyles = makeStyles(() => ({
	header: {
		display: window.isMobile ? 'block' : 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 8,
		borderBottom: '1px solid #D0D0D0'
	},
	select: {
		flexWrap: 'nowrap',
		'& .MuiGrid-grid-sm-6': {
			minWidth: 'max-content',
		},
	},
}));

const countOptions = [
	{ value: 5, label: '5' },
	{ value: 10, label: '10' },
	{ value: 20, label: '20' },
	{ value: 50, label: '50' },
	{ value: 100, label: '100' },
];

const Header = props => {
	const {
		title,
		className,
		titleVariant = 'h2',
		perPageCount,
		onChangeCount,
		createTitle = 'Dodaj',
		createPath,
		CreateIcon = PlusIcon,
		children
	} = props;
	const classes = useStyles();

	return (
		<Box className={clsx(classes.header, className)}>
			<Box display={window.isMobile ? 'block' : 'flex'} alignItems="center">
				<Typography variant={titleVariant}>{title}</Typography>
				{createPath &&
					<PrimaryButton
						component={Link}
						to={createPath}
						style={{ margin: window.isMobile ? '16px 0 0 0' : '0 0 0 30px' }} >
						<SvgIcon color="secondary" viewBox="0 0 20 20" style={{ marginRight: 10 }}><CreateIcon /></SvgIcon>
						{createTitle}
					</PrimaryButton>
				}
			</Box>

			<Box display="flex" alignItems="center">
				{children}
				{!window.isMobile && onChangeCount &&
					<Select
						title="Wyświetlaj:"
						options={countOptions}
						value={perPageCount}
						onChange={onChangeCount}
						containerClassName={classes.select}
						sm={6}
						gutterBottom={false} />
				}
			</Box>
		</Box>
	);
};

Header.propTypes = {
	title: PropTypes.string,
	perPageCount: PropTypes.number,
	onChangeCount: PropTypes.func,
	createPath: PropTypes.string,
	CreateIcon: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.object,
	]),
	children: PropTypes.node,
};

export default Header;
