import React, { useEffect, useState } from 'react';
import { Box, Card, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Table from './Table';
import ExportButtons from '../Buttons/ExportButtons';

const useStyles = makeStyles(theme => ({
	card: {
		padding: window.isMobile ? 15 : 30,
		borderRadius: 0,
		boxShadow: 'none',
	},
	cardFooter: {
		padding: theme.spacing(3, window.isMobile ? 0 : 4),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'& .MuiPaginationItem-root': {
			height: window.isMobile ? 26 : 32,
			minWidth: window.isMobile ? 26 : 32
		}
	},
}));

const PaginatedTable = props => {
	const {
		columns,
		exportEndpoint,
		filename,
		totalPagesCount,
		onChangeFilters,
		defaultFilters = null,
		renderRows,
		className,
		filterRow,
		containerClassName,
	} = props;
	const classes = useStyles();
	const [filters, setFilters] = useState(defaultFilters || {
		page: 1,
		column: 'id',
		direction: 'desc',
	});

	useEffect(() => {
		onChangeFilters && onChangeFilters(filters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const handleChangePage = (e, page) => {
		setFilters(prev => ({ ...prev, page }));
	};

	const handleChangeSort = flag => {
		setFilters(prev => ({
			...prev,
			column: flag,
			direction: prev.column === flag ? (prev.direction === 'asc' ? 'desc' : 'asc') : 'asc',
		}));
	};

	return (
		<Card className={clsx(classes.card, containerClassName)}>
			<Table
				className={className}
				columns={columns}
				direction={filters.direction}
				renderRows={renderRows}
				filterRow={filterRow}
				onSort={handleChangeSort}
			/>
			{exportEndpoint &&
				<ExportButtons
					endpoint={exportEndpoint}
					filename={filename}
				/>
			}
			{totalPagesCount > 1 &&
				<Box className={classes.cardFooter}>
					<Pagination
						variant="outlined"
						shape="rounded"
						color="secondary"
						count={totalPagesCount}
						page={filters.page}
						onChange={handleChangePage}
					/>
				</Box>
			}
		</Card>
	);
};

PaginatedTable.propTypes = {
	columns: PropTypes.array,
	totalPagesCount: PropTypes.number,
	onChangeFilters: PropTypes.func,
	renderRows: PropTypes.func,
	filterRow: PropTypes.node,
	containerClassName: PropTypes.string,
};

export default PaginatedTable;
