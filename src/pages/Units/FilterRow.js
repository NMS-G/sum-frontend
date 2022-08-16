import React, { useEffect, useState, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import _, { debounce } from 'lodash';

import BaseInput from 'components/Form/BaseInput';
import Select from 'components/Form/Select';
import API from 'apis/API';

const FilterRow = ({ onChange }) => {
	const [parentUnits, setParentUnits] = useState([]);

	const [filters, setFilters] = useState({
		symbol: '',
		name: '',
		parent_id: '',
	});

	useEffect(() => handleChangeSearch(_.pickBy(filters)), [filters]);

	useEffect(() => {
		API.units.parentUnits().then(res => {
			setParentUnits(res.data?.data || []);
		});
	}, []);

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
			<TableCell></TableCell>
			<TableCell>
				<Select
					fullWidth
					options={parentUnits}
					displayEmpty
					emptyLabel="Wybierz gmina"
					name="parent_id"
					valueField="id"
					labelField="name"
					value={filters?.parent_id}
					onChange={handleChange}
					gutterBottom={false}
				/>
			</TableCell>
			<TableCell></TableCell>
		</TableRow>
	);
};

export default FilterRow;
