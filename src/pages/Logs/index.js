import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import _ from 'lodash';

import API from 'apis/API';
import { formatDateTime } from 'utils/formatters';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import PaginatedTable from 'components/PaginatedTable';
import Progress from 'components/Main/Progress';

import FilterRow from './FilterRow';

const Logs = () => {
	const breadcrumbs = [{ title: 'Logi' }];
	const columns = [
		{ title: 'ID', name: 'id', width: 100 },
		{ title: 'UŻYTKOWNIK', name: 'user_id' },
		{ title: 'Rola', name: 'role_id' },
		{ title: 'IP/HOSTNAME', name: 'ip' },
		{ title: 'Data i czas', name: 'created_at', width: 400 },
		{ title: 'ZDARZENIE', name: 'event' },
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

	useEffect(() => document.title = 'SUM - Logi', []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => loadFilteredLogs(), [params]);

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

	const loadFilteredLogs = () => {
		API.logs.index(params).then(res => {
			setData(res.data?.data);
			setTotalPagesCount(res.data?.last_page);
		});
	};

	const renderRows = () => (
		data.map((row, index) => (
			<TableRow key={index}>
				<TableCell>{row.id}</TableCell>
				<TableCell>{row?.user?.firstname} {row?.user?.surname}</TableCell>
				<TableCell>{row?.user?.role?.name}</TableCell>
				<TableCell>{row.ip}</TableCell>
				<TableCell>{formatDateTime(row.updated_at)}</TableCell>
				<TableCell>{row.event}</TableCell>
			</TableRow>
		))
	);

	return (
		<>
			<Header
				title="Logi"
				perPageCount={params.limit}
				onChangeCount={handleChangePerPage}
			/>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			{!data
				? <Progress status={true} />
				: <PaginatedTable
					page={params?.page}
					columns={columns}
					totalPagesCount={totalPagesCount}
					onChangeFilters={handleChangeParams}
					renderRows={renderRows}
					filterRow={<FilterRow onChange={handleChangeFilters} />}
				/>}
		</>
	);
};

export default Logs;
