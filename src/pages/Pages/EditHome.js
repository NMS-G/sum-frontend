import React, { useEffect, useState } from 'react';
import { makeStyles, Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import Typography from 'components/Main/Typography';
import Editor from 'components/Form/Editor';
import FormInput from 'components/Form/FormInput';
import ControlButtonGroup from 'components/Buttons/ControlButtonGroup';

const useStyles = makeStyles(theme => ({
	section: {
		border: '1px solid #B4B4B4',
		background: theme.palette.white,
		padding: theme.spacing(4, 4, 4, 4),
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2)
		},
	},
	editor: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		marginBottom: 20
	}
}));

const EditHome = () => {
	const history = useHistory();
	const classes = useStyles();

	const [saving, setSaving] = useState(false);
	const [breadcrumbs, setBreadcrumbs] = useState([
		{ title: 'Zarządzanie treścią', to: '' },
		{ title: 'Treści stron', to: '/pages' },
		{ title: '', to: '' },
	]);

	const [data, setData] = useState({
		id: '',
		slug: '',
		title: '',
		content: '',
		content1: '',
		content2: '',
		content3: '',
	});

	useEffect(() => document.title = 'SUM - Edycja tresci strony', []);
	
	const handleChange = (name, value) => {
		setData(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		setSaving(true);
		API.pages.update(data, 6).then(res => {
			setSaving(false);
			if (res.data.code === 200) {
				toast.success('Treść strony została zaktualizowana');
				return;
			}
		});
	};

	const handleCancel = () => {
		history.push(Routes.Pages.List);
	};

	useEffect(() => {
		API.pages.get(6).then(res => {
			setData({ ...data, ...res.data.page });
			setBreadcrumbs(prev => {
				prev[2].title = res.data.page.title;
				return [...prev];
			});
		});
	}, []);

	return (
		<>
			<Header title="Treści stron" />
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<Box className={classes.section}>
				<FormInput
					sm={2}
					title="Tytuł"
					value={data.title}
					onChange={e => handleChange('title', e.target.value)}
					gutterBottom={false}
					inputProps={{'aria-required': true}}
				/>

				<Grid container style={{ marginTop: 20 }}>
					<Grid item xs={2}>
						<Typography variant="bodyM">Powitanie</Typography>
					</Grid>
					<Grid item xs={10} className={classes.editor}>
						<Editor
							value={data.content}
							onChange={value => handleChange('content', value)}
						/>
					</Grid>

					<Grid item xs={2}>
						<Typography variant="bodyM">Zadania badawcze</Typography>
					</Grid>
					<Grid item xs={10} className={classes.editor}>
						<Editor
							value={data.content1}
							onChange={value => handleChange('content1', value)}
						/>
					</Grid>

					<Grid item xs={2}>
						<Typography variant="bodyM">Zarządzanie SUM</Typography>
					</Grid>
					<Grid item xs={10} className={classes.editor}>
						<Editor
							value={data.content2}
							onChange={value => handleChange('content2', value)}
						/>
					</Grid>

					<Grid item xs={2}>
						<Typography variant="bodyM">Rejestr WI</Typography>
					</Grid>
					<Grid item xs={10} className={classes.editor}>
						<Editor
							value={data.content3}
							onChange={value => handleChange('content3', value)}
						/>
					</Grid>
				</Grid>

			</Box>

			<ControlButtonGroup
				onClickPrimary={handleSave}
				onCancel={handleCancel}
				saving={saving}
				hideSaveButton={true}
				primaryTitle="ZATWIERDŹ ZMIANY"
			/>
		</>
	);
};

export default EditHome;
