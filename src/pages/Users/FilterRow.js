import React, { useEffect, useState, useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import _, { debounce } from 'lodash';

import API from 'apis/API';
import BaseInput from 'components/Form/BaseInput';
import Select from 'components/Form/Select';

const FilterRow = ({ onChange }) => {
	const [filters, setFilters] = useState({
		id: '',
		email: '',
		name: '',
		role_id: ''
	});
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		API.roles.all().then(res => setRoles(res.data.data));
	}, []);

	useEffect(() => {
		handleChangeSearch(_.pickBy(filters));
	}, [filters]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFilters(prev => ({ ...prev, [name]: value }));
	};

	const handleChangeSearch = useCallback(debounce(onChange, 500), []);

	return (
		<TableRow>
			<TableCell>
				<BaseInput
					placeholder="Wpisz"
					name="id"
					value={filters.id}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<BaseInput
					name="email"
					value={filters.email}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<BaseInput
					name="name"
					value={filters.name}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<Select
					fullWidth
					options={roles}
					displayEmpty
					emptyLabel="Wybierz rolę"
					name="role_id"
					valueField="id"
					labelField="name"
					value={filters?.role_id}
					onChange={handleChange}
					gutterBottom={false}
				/>
			</TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
		</TableRow>
	);
};

export default FilterRow;
