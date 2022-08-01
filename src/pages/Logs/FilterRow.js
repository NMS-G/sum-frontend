import React, { useEffect, useState, useCallback } from 'react';
import { Grid, TableCell, TableRow } from '@material-ui/core';
import _debounce from 'lodash/debounce';
import _ from 'lodash';
import PropTypes from 'prop-types';

import API from 'apis/API';
import Messages from 'utils/Messages';
import BaseInput from 'components/Form/BaseInput';
import Select from 'components/Form/Select';
import DateInput from 'components/Form/DateInput';

const eventTypes = [
	{ label: 'Udane logowanie', value: 'Udane logowanie' },
	{ label: 'Nieudane logowanie', value: 'Nieudane logowanie' },
	{ label: 'Utworzenie użytkownika', value: 'Utworzenie użytkownika' },
	{ label: 'Edycja użytkownika', value: 'Edycja użytkownika' },
	{ label: 'Usunięcie użytkownika', value: 'Usunięcie użytkownika' },
	{ label: 'Przypomnienie hasła', value: 'Przypomnienie hasła' },
	{ label: 'Reset hasła', value: 'Reset hasła' },
];

const FilterRow = ({ onChange }) => {
	const [filters, setFilters] = useState({
		id: '',
		user_id: '',
		role_id: '',
		ip: '',
		start_date: '',
		end_date: '',
		event: '',
	});
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [dateError, setDateError] = useState(null);

	useEffect(() => {
		API.users.all().then(res => setUsers(res.data?.data || []));
		API.roles.all().then(res => setRoles(res.data?.data || []));
	}, []);

	useEffect(() => {
		let _filters = _.pickBy(filters);

		if ((!!filters.start_date && !!filters.end_date) && (filters.start_date > filters.end_date)) {
			setDateError(prev => ({ ...prev, end_date: Messages.AfterStartDate }));
			return;
		}
		setDateError(null);
		handleChangeSearch(_filters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFilters(prev => ({ ...prev, [name]: value }));
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleChangeSearch = useCallback(_debounce((filters) => onChange(filters), 500), []);

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
				<Select
					options={users}
					name="user_id"
					valueField="id"
					labelField={['firstname', 'surname']}
					value={filters?.user_id}
					onChange={handleChange}
					displayEmpty
					emptyLabel="Wybierz użytkownika"
					gutterBottom={false}
				/>
			</TableCell>
			<TableCell>
				<Select
					options={roles}
					name="role_id"
					valueField="id"
					labelField="name"
					value={filters?.role_id}
					onChange={handleChange}
					displayEmpty
					emptyLabel="Wybierz rola"
					gutterBottom={false}
				/>
			</TableCell>
			<TableCell>
				<BaseInput
					name="ip"
					value={filters.ip}
					onChange={handleChange}
				/>
			</TableCell>
			<TableCell>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6}>
						<DateInput
							name="start_date"
							value={filters.start_date}
							onChange={handleChange}
							gutterBottom={false}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DateInput
							name="end_date"
							value={filters.end_date}
							onChange={handleChange}
							error={dateError?.end_date}
							gutterBottom={false}
						/>
					</Grid>
				</Grid>
			</TableCell>
			<TableCell>
				<Select
					options={eventTypes}
					name="event"
					value={filters?.event}
					onChange={handleChange}
					gutterBottom={false}
					displayEmpty
					emptyLabel="Wybierz zdarzenie"
				/>
			</TableCell>
		</TableRow>
	);
};

FilterRow.propTypes = {
	onChange: PropTypes.func,
};

export default FilterRow;
