import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, Box, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import Header from 'components/Main/Header';
import Typography from 'components/Main/Typography';
import FormInput from 'components/Form/FormInput';
import Editor from 'components/Form/Editor';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
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
		fontFamily: 'Open Sans'
	}
}));

const PageEdit = () => {
	const history = useHistory();
	const { id } = useParams();
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
	});

	useEffect(() => document.title = 'SUM - Edycja tresci strony', []);

	const handleChange = e => {
		const { name, value } = e.target;
		setData(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		setSaving(true);
		API.pages.update(data, data.id).then(res => {
			setSaving(false);
			if (res.data?.code === 200) {
				toast.success('Treść strony została zaktualizowana');
				return;
			}
		});
	};
	const handleCancel = () => {
		history.push(Routes.Pages.List);
	};

	useEffect(() => {
		if (!id) return;
		API.pages.get(id).then(res => {
			setData({ ...data, ...res.data.page });
			setBreadcrumbs(prev => {
				prev[2].title = res.data.page.title;
				return [...prev];
			});
		});
	}, [id]);

	return (
		<>
			<Header title="Treści stron" />
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<Box className={classes.section}>
				<FormInput
					sm={2}
					title="Tytuł strony"
					name="title"
					value={data.title}
					onChange={handleChange}
					gutterBottom={false}
					inputProps={{'aria-required': true}}
				/>

				<Grid container style={{ marginTop: 20 }}>
					<Grid item xs={2}>
						<Typography variant="bodyM">Treść</Typography>
					</Grid>
					<Grid item xs={10} className={classes.editor}>
						<Editor
							value={data.content}
							onChange={value => handleChange({ target: { name: 'content', value } })}
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

export default PageEdit;
