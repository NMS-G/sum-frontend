import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

const Units = () => {
	const { groupId } = useParams();

	const columns = [
		{ title: 'Symbol', name: 'symbol' },
		{ title: 'Nazwa', name: 'name' },
		{ title: 'Data utworzenia', name: 'created_at' },
		{ title: 'Gmina', name: 'parent' },
		{ title: 'AKCJE', name: 'action', width: 100, disableSort: true },
	];

	const [breadcrumbs, setBreadcrumbs] = useState([
		{ title: 'Administracja', to: '' },
		{ title: 'Zarządzanie jednostkami', to: Routes.UnitsGroups.List },
		{ title: '', to: '' },
	]);

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

	useEffect(() => loadFilteredUnits(), [params]);

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

	const loadFilteredUnits = () => {
		API.units.index(groupId, params).then(res => {
			setData(res.data?.data);
			setTotalPagesCount(res.data?.last_page);
		});
	};

	const handleDelete = id => () => {
		API.units.delete(groupId, id).then(res => {
			if (res.data.code === 200) {
				loadFilteredUnits();
				return toast.success('Success!');
			}

			toast.error('Error!');
		});
	};

	useEffect(() => {
		if (!groupId) return;

		API.unitsGroups.show(groupId).then(res => {
			const unitGroup = res.data?.unitGroup;

			setBreadcrumbs(prev => {
				prev[2].title = unitGroup?.name;
				return [...prev];
			});
		});
	}, [groupId]);

	const renderRows = () => (
		data.map((row, index) => (
			<TableRow key={index}>
				<TableCell>{row.symbol}</TableCell>
				<TableCell>{row.name}</TableCell>
				<TableCell>{moment(row.created_at).format('DD.MM.YYYY H:m')}</TableCell>
				<TableCell>{row.parent?.name}</TableCell>
				<TableCell>
					<Box display="flex">
						<Link to={Routes.Units.Edit(groupId, row.id)}>
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
				title="Jednostki"
				perPageCount={params.limit}
				onChangeCount={handleChangePerPage}
				createTitle="Dodaj jednostkę"
				createPath={Routes.Units.Create(groupId)}
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

export default Units;
