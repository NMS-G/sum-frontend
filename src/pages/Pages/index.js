import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TableCell, TableRow } from '@material-ui/core';

import Routes from 'router/Routes';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import IconButton, { EditIconButton } from 'components/Buttons/IconButtons';
import PaginatedTable from 'components/PaginatedTable';
import Progress from 'components/Main/Progress';
import API from 'apis/API';
import { VisibleIcon } from 'assets/svg';


const Pages = () => {
	const [data, setData] = useState(null);
	const breadcrumbs = [
		{ title: 'Strona', to: '' },
		{ title: 'Lista stron' },
	];

	const columns = [
		{ title: 'Nazwa strony', name: 'name', disableSort: true },
		{ title: 'AKCJE', name: 'action', disableSort: true },
	];

	useEffect(() => {
		document.title = 'SUM - Treści stron';
		API.pages.all().then(({ data }) => {
			setData(data.data);
		});
	}, []);

	const getEditUrl = (id) => {
		if (id === 6) {
			return Routes.Pages.EditHome;
		} else if (id === 7) {
			return Routes.Pages.EditLogin;
		} else {
			return Routes.Pages.Edit(id);
		}
	};

	const renderRows = () => (
		data.map((row, index) => (
			<TableRow key={index}>
				<TableCell>{row.title}</TableCell>
				<TableCell>
					<Box display="flex">
						<Link to={getEditUrl(row.id)}>
							<EditIconButton />
						</Link>
						<Link to={Routes.Pages.Preview(row.id)}>
							<IconButton>
								<VisibleIcon alt="Ikona podglądu wiersza" />
							</IconButton>
						</Link>
					</Box>
				</TableCell>
			</TableRow>
		))
	);

	return (
		<>
			<Header title="Strona" />
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			{!data
				? <Progress status={true} />
				: <PaginatedTable
					columns={columns}
					renderRows={renderRows}
				/>}
		</>
	);
};

export default Pages;
