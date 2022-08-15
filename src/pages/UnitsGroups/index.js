import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TableCell, TableRow } from '@material-ui/core';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';

import API from 'apis/API';
import Routes from 'router/Routes';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import Progress from 'components/Main/Progress';
import PaginatedTable from 'components/PaginatedTable';
import { DeleteIconButton, EditIconButton } from 'components/Buttons/IconButtons';

import FilterRow from './FilterRow';

const UnitsGroups = () => {
	const breadcrumbs = [
		{ title: 'Administracja', to: '' },
		{ title: 'Zarządzanie jednostkami', to: '' },
	];
	const columns = [
		{ title: 'Symbol grupy', name: 'id', width: 100 },
		{ title: 'Nazwa grupy', name: 'name' },
		{ title: 'Data utworzenia', name: 'created_at' },
		{ title: 'Ilość elementów', name: 'units_count' },
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

	useEffect(() => document.title = 'SUM - Zarządzanie jednostkami', []);

	useEffect(() => loadFilteredUnitsGroups(), [params]);

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

			return { ...prev, filters };
		});
	};

	const loadFilteredUnitsGroups = () => {
		API.unitsGroups.index(params).then(res => {
			setData(res.data?.data);
			setTotalPagesCount(res.data?.last_page);
		});
	};

	const handleDelete = id => () => {
		API.unitsGroups.delete(id).then(res => {
			if (res.data.code === 200) {
				loadFilteredUnitsGroups();
				return toast.success('Success!');
			}

			toast.error('Error!');
		});
	};

	const renderRows = () => (
		data.map((row, index) => (
			<TableRow key={index}>
				<TableCell>{row.id}</TableCell>
				<TableCell>{row.name}</TableCell>
				<TableCell>{moment(row.created_at).format('DD.MM.YYYY H:m')}</TableCell>
				<TableCell>
					<Link to={Routes.Units.List(row.id)}>
						{row.units_count}
					</Link>
				</TableCell>
				<TableCell>
					<Box display="flex">
						<Link to={Routes.UnitsGroups.Edit(row.id)}>
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
				title="Jednostkami"
				perPageCount={params.limit}
				onChangeCount={handleChangePerPage}
				createTitle="Dodaj jednostkami"
				createPath={Routes.UnitsGroups.Create}
			/>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			{!data
				? <Progress status={true} />
				: <PaginatedTable
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

export default UnitsGroups;
