import React, { useEffect, useState, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import _, { debounce } from 'lodash';

import BaseInput from 'components/Form/BaseInput';

const FilterRow = ({ onChange }) => {
	const [filters, setFilters] = useState({
		id: '',
		name: '',
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
					placeholder="Wpisz opis"
					name="name"
					value={filters.name}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
		</TableRow>
	);
};

export default FilterRow;
