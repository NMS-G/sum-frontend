import React, { useEffect, useState, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import _, { debounce } from 'lodash';

import BaseInput from 'components/Form/BaseInput';
import DateInput from 'components/Form/DateInput';

const FilterRow = ({ onChange }) => {
	const [filters, setFilters] = useState({
		id: '',
		symbol: '',
		name: '',
		version: '',
		date_from: '',
	});

	useEffect(() => handleChangeSearch(_.pickBy(filters)), [filters]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFilters(prev => ({ ...prev, [name]: value }));
	};

	const handleChangeSearch = useCallback(debounce(onChange, 500), []);

	return (
		<TableRow>
			<TableCell>
				<BaseInput
					fullWidth
					placeholder="Wpisz"
					name="id"
					value={filters.id}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<BaseInput
					fullWidth
					placeholder="Wpisz symbol"
					name="symbol"
					value={filters.symbol}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<BaseInput
					fullWidth
					placeholder="Wpisz opis"
					name="name"
					value={filters.name}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<BaseInput
					type="number"
					fullWidth
					name="version"
					value={filters.version}
					onChange={handleChange}
					placeholder={'Wpisz wersja'}
				/>
			</TableCell>
			<TableCell>
				<DateInput
					fullWidth
					name="date_from"
					value={filters.date_from || null}
					onChange={handleChange}
					gutterBottom={false}
				/>
			</TableCell>
			<TableCell></TableCell>
		</TableRow>
	);
};

export default FilterRow;
