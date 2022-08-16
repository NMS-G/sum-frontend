import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TableCell, TableRow } from '@material-ui/core';
import { toast } from 'react-toastify';
import _ from 'lodash';

import API from 'apis/API';
import Routes from 'router/Routes';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import Progress from 'components/Main/Progress';
import PaginatedTable from 'components/PaginatedTable';
import { DeleteIconButton, EditIconButton } from 'components/Buttons/IconButtons';

import FilterRow from './FilterRow';

const Role = () => {
	const breadcrumbs = [
		{ title: 'Użytkownicy', to: '' },
		{ title: 'Role' },
	];
	const columns = [
		{ title: 'ID', name: 'id', width: 100 },
		{ title: 'NAZWA ROLI', name: 'name' },
		{ title: 'AKCJE', name: 'action', width: 100, disableSort: true },
	];

	const [data, setData] = useState(null);
	const [totalPagesCount, setTotalPagesCount] = useState(0);
	const [params, setParams] = useState({
		limit: 20,
		page: 1,
		column: 'id',
		direction: 'asc',
		filters: {}
	});

	useEffect(() => document.title = 'SUM - Role', []);

	useEffect(() => loadFilteredRoles(), [params]);

	const handleChangeParams = _params => {
		const picked = _.pick(params, ['column', 'direction', 'page']);
		if (_.isEqual(picked, _params)) return;

		setParams({ ...params, ..._params });
	};

	const handleChangePerPage = e => {
		setParams(prev => ({ ...prev, limit: e.target.value }));
	};

	const handleChangeFilters = filters => {
		setParams(prev => {
			if (_.isEqual(prev.filters, filters)) return prev;

			return { ...prev, filters, page: 1 };
		});
	};

	const loadFilteredRoles = () => {
		API.roles.index(params).then(res => {
			setData(res.data.data);
			setTotalPagesCount(res.data.last_page);
		});
	};

	const handleDelete = id => () => {
		API.roles.delete(id).then(res => {
			if (res.data.code === 200) {
				loadFilteredRoles();
				return toast.success('Rola została usunięta!');
			}

			toast.error('Nie znaleziono rola');
		});
	};

	const renderRows = () => (
		data.map((row, index) => (
			<TableRow key={index}>
				<TableCell>{row.id}</TableCell>
				<TableCell>{row.name}</TableCell>
				<TableCell>
					<Box display="flex">
						<Link to={Routes.Role.Edit(row.id)}>
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
				title="Rolę"
				perPageCount={params.limit}
				onChangeCount={handleChangePerPage}
				createTitle="Dodaj rolę"
				createPath={Routes.Role.Create}
			/>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			{!data
				? <Progress status={true} />
				: <PaginatedTable
					page={params?.page}
					columns={columns}
					totalPagesCount={totalPagesCount}
					onChangeFilters={handleChangeParams}
					defaultFilters={_.pick(params, ['column', 'direction', 'page'])}
					renderRows={renderRows}
					filterRow={<FilterRow onChange={handleChangeFilters} />}
				/>}
		</>
	);
};

export default Role;
