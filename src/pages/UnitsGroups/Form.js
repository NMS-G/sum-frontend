import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, Box } from '@material-ui/core';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import Validator, { Required, validate } from 'utils/Validator';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import FormInput from 'components/Form/FormInput';

import ControlButtonGroup from 'components/Buttons/ControlButtonGroup';

const useStyles = makeStyles(theme => ({
	content: {
		margin: theme.spacing(-5, -4, 0),
		padding: theme.spacing(2, 4, 5),
		overflowY: 'scroll',
		height: '100%',
	},
	section: {
		background: theme.palette.white,
		padding: theme.spacing(4, 40, 4, 4),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2)
		},
	}
}));

const Form = () => {
	const { id } = useParams();
	const history = useHistory();
	const classes = useStyles();
	const [breadcrumbs, setBreadcrumbs] = useState([
		{ title: 'Administracja', to: '' },
		{ title: 'Zarządzanie jednostki', to: Routes.UnitsGroups.List },
		{ title: 'Dodaj jednostki', to: '' },
	]);

	const [data, setData] = useState({
		name: '',
	});
	const [errors, setErrors] = useState(null);
	const [saving, setSaving] = useState(false);
	const Validators = {
		name: new Validator(Required),
	};

	useEffect(() => document.title = `SUM - ${id ? 'Edycja' : 'Dodawanie'} jednostki`, []);

	useEffect(() => {
		if (!id) return;

		API.unitsGroups.show(id).then(res => {
			const unitGroup = res.data?.unitGroup;

			setData(unitGroup);
			setBreadcrumbs(prev => {
				prev[2].title = unitGroup.name;
				return [...prev];
			});
		});
	}, [id]);

	const handleChange = e => {
		const { name, value } = e.target;
		setData(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		let _errors = validate(data, Validators);
		setErrors(_errors);
		if (_errors) {
			return toast.error('Nie wszystkie pola spełniają wymagania. Popraw błędy i spróbuj ponownie.');
		}

		setSaving(true);
		(id ? API.unitsGroups.update : API.unitsGroups.store)(data, id).then(() => {
			setSaving(false);
			toast.success('Sccuess!');
			history.push(Routes.UnitsGroups.List);
		});
	};

	const handleCancel = () => history.push(Routes.UnitsGroups.List);

	return (
		<>
			<Box className={classes.content}>
				<Header title={`${id ? 'Edytować' : 'Dodaj'} jednostki`} />
				<Breadcrumbs breadcrumbs={breadcrumbs} />

				<Box className={classes.section}>
					<FormInput
						title="Nazwa grupy"
						name="name"
						value={data.name}
						onChange={handleChange}
						error={errors?.name}
						inputProps={{ 'aria-required': true }}
					/>
				</Box>
			</Box>

			<ControlButtonGroup
				onSave={handleSave}
				onCancel={handleCancel}
				saving={saving}
				saveTitle="ZAPISZ"
				hidePrimaryButton
			/>
		</>
	);
};

export default Form;
