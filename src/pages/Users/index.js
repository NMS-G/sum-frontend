import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TableCell, TableRow, makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';
import _ from 'lodash';

import API from 'apis/API';
import Routes from 'router/Routes';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import { DeleteIconButton, EditIconButton } from 'components/Buttons/IconButtons';
import PaginatedTable from 'components/PaginatedTable';
import Progress from 'components/Main/Progress';
import Active from 'components/Main/Active';
import Select from 'components/Form/Select';

import FilterRow from './FilterRow';

const countOptions = [
	{ value: 5, label: '5' },
	{ value: 10, label: '10' },
	{ value: 20, label: '20' },
	{ value: 50, label: '50' },
	{ value: 100, label: '100' },
];

const Users = () => {
	const classes = useStyles();

	const breadcrumbs = [
		{ title: 'Użytkownicy', to: '' },
		{ title: 'Zarządzaj użytkownikami' },
	];
	const columns = [
		{ title: 'ID', name: 'id', width: 100 },
		{ title: 'E-MAIL', name: 'email' },
		{ title: 'IMIĘ I NAZWISKO', name: 'name' },
		{ title: 'ROLA', name: 'role_id' },
		{ title: 'AKTYWNY', name: 'is_active' },
		{ title: 'AKCJE', name: 'action', width: 100, disableSort: true },
	];

	const [data, setData] = useState(null);
	const [totalPagesCount, setTotalPagesCount] = useState(0);
	const [params, setParams] = useState({
		limit: 20,
		page: 1,
		column: 'id',
		direction: 'desc',
		filters: {}
	});

	useEffect(() => document.title = 'SUM - Zarządzanie użytkownikami', []);

	useEffect(() => loadFilteredUsers(), [params]);

	const handleChangeParams = _params => {
		const picked = _.pick(params, ['column', 'direction', 'page']);
		if (_.isEqual(picked, _params)) return;

		setParams({ ...params, ..._params });
	};

	const handleChangePerPage = e => {
		setParams(prev => ({ ...prev, limit: e.target.value, page: 1 }));
	};

	const handleChangeFilters = filters => {
		setParams(prev => {
			if (_.isEqual(prev.filters, filters)) return prev;

			return { ...prev, filters };
		});
	};

	const loadFilteredUsers = () => {
		API.users.index(params).then(res => {
			setData(res.data.data);
			setTotalPagesCount(res.data.last_page);
		});
	};

	const handleDelete = id => () => {
		API.users.delete(id).then(res => {
			if (res.data.code === 200) {
				loadFilteredUsers();

				return toast.success('Użytkownik został usunięty!');
			}

			toast.error('Nie możesz usunąć tego użytkownika!');
		});
	};

	const renderRows = () => (
		data.map((row, index) => (
			<TableRow key={index}>
				<TableCell>{row.id}</TableCell>
				<TableCell>{row.email}</TableCell>
				<TableCell>{row.firstname} {row.surname}</TableCell>
				<TableCell>{row.role?.name}</TableCell>
				<TableCell style={{ textAlign: 'center' }}>
					<Active
						active={row.is_active}
						activeAlt="Ikona aktywnego użytkownika"
						deActiveAlt="Ikona nieaktywnego użytkownika"
					/>
				</TableCell>
				<TableCell>
					<Box display="flex">
						<Link to={Routes.Users.Edit(row.id)}>
							<EditIconButton tooltip="Edytuj" />
						</Link>
						<DeleteIconButton onClick={handleDelete(row.id)} tooltip="Usuń" />
					</Box>
				</TableCell>
			</TableRow>
		))
	);

	return (
		<>
			<Header
				title="Zarządzaj użytkownikami"
				perPageCount={params.limit}
				onChangeCount={handleChangePerPage}
				createTitle="Dodaj UŻYTKOWNIKA"
				createPath={Routes.Users.Create}
			/>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			{window.isMobile &&
				<Box display="flex" alignItems="center" mb={1} mt={2}>
					<Select
						title="Wyświetlaj:"
						options={countOptions}
						value={params.limit}
						onChange={handleChangePerPage}
						containerClassName={classes.select}
						smMobile={3}
						gutterBottom={false} />
				</Box>
			}

			{!data
				? <Progress status={true} />
				: <PaginatedTable
					columns={columns}
					totalPagesCount={totalPagesCount}
					onChangeFilters={handleChangeParams}
					renderRows={renderRows}
					filterRow={<FilterRow onChange={handleChangeFilters} />}
				/>}
		</>
	);
};

const useStyles = makeStyles(() => ({
	select: {
		justifyContent: 'flex-end'
	}
}));

export default Users;
