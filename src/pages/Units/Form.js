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
import Select from 'components/Form/Select';

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
	const [parentUnits, setParentUnits] = useState([]);
	const { groupId, id } = useParams();
	const history = useHistory();
	const classes = useStyles();
	const [breadcrumbs, setBreadcrumbs] = useState([
		{ title: 'Administracja', to: '' },
		{ title: 'Zarządzanie jednostki', to: Routes.UnitsGroups.List },
		{ title: '', to: Routes.Units.List(groupId) },
		{ title: 'Dodaj jednostki', to: '' },
	]);

	const [data, setData] = useState({
		symbol: '',
		name: '',
		parent_id: '',
	});
	const [errors, setErrors] = useState(null);
	const [saving, setSaving] = useState(false);
	const Validators = {
		symbol: new Validator(Required),
		name: new Validator(Required),
	};

	useEffect(() => document.title = `SUM - ${id ? 'Edycja' : 'Dodawanie'} jednostki`, []);

	useEffect(() => {
		if (!id) return;

		API.units.show(groupId, id).then(res => {
			const unit = res.data?.unit;

			setData(unit);
			setBreadcrumbs(prev => {
				prev[3].title = unit.name;
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
		(id ? API.units.update : API.units.store)(groupId, data, id).then(() => {
			setSaving(false);
			toast.success('Sccuess!');
			history.push(Routes.Units.List(groupId));
		});
	};

	const handleCancel = () => history.push(Routes.Units.List(groupId));

	useEffect(() => {
		if (!groupId) return;

		API.unitsGroups.show(groupId).then(res => {
			const unitGroup = res.data?.unitGroup;

			setBreadcrumbs(prev => {
				prev[2].title = unitGroup.name;
				return [...prev];
			});
		});
	}, [groupId]);

	useEffect(() => {
		API.units.parentUnits().then(res => {
			setParentUnits(res.data?.data || []);
		});
	}, []);

	return (
		<>
			<Box className={classes.content}>
				<Header title={`${id ? 'Edytować' : 'Dodaj'} jednostki`} />
				<Breadcrumbs breadcrumbs={breadcrumbs} />

				<Box className={classes.section}>
					<FormInput
						title="Symbol jednostki"
						name="symbol"
						value={data.symbol}
						onChange={handleChange}
						error={errors?.symbol}
						inputProps={{ 'aria-required': true }}
					/>

					<FormInput
						title="Nazwa jednostki"
						name="name"
						value={data.name}
						onChange={handleChange}
						error={errors?.name}
						inputProps={{ 'aria-required': true }}
					/>

					<Select
						title="Gmina"
						fullWidth
						options={parentUnits}
						displayEmpty
						emptyLabel="Wybierz gmina"
						name="parent_id"
						valueField="id"
						labelField="name"
						value={data.parent_id}
						onChange={handleChange}
						gutterBottom={false}
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
