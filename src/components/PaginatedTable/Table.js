import React from 'react';
import {
	makeStyles,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import TableLabel from 'components/Main/TableLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		border: '1px solid #D0D0D0',
		'& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root': {
			borderBottom: 0,
		},
		'& .MuiTableCell-root': {
			verticalAlign: 'top',
		},
	},
	thead: {
		background: theme.palette.gray,
		borderBottom: '1px solid #D0D0D0',
		'& .MuiTableCell-root': {
			borderBottom: 0,
		},
		'& .MuiTableRow-root:last-child': {
			borderTop: '2px solid #fff',
		},
	},
	tbody: {
		'& .MuiTableRow-root:nth-of-type(even)': {
			backgroundColor: theme.palette.background.default,
		},
	}
}));

const Table = props => {
	const { columns, onSort, direction, renderRows, filterRow, className } = props;
	const classes = useStyles();

	return (
		<TableContainer className={clsx(classes.root, className)}>
			<MuiTable>
				<TableHead className={classes.thead}>
					<TableRow>
						{columns.map((column, index) => (
							!column?.hidden &&
							<TableCell key={index} width={column?.width}>
								{column.disableSort
									? <TableLabel component="div" htmlFor={column.name}>
										{column.title}
									</TableLabel>
									: <TableSortLabel
										active={column === index}
										direction={direction}
										onClick={() => onSort(column.name)}
									>
										<TableLabel htmlFor={column.name}>
											{column.title}
										</TableLabel>
									</TableSortLabel>
								}
							</TableCell>
						))}
					</TableRow>
					{filterRow}
				</TableHead>
				<TableBody className={classes.tbody}>
					{renderRows()}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
};

Table.propTypes = {
	columns: PropTypes.array,
	onSort: PropTypes.func,
	direction: PropTypes.string,
	renderRows: PropTypes.func,
	filterRow: PropTypes.object,
};

export default Table;
