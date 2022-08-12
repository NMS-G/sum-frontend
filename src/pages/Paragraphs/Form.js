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
import DateInput from 'components/Form/DateInput';
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

const refersTo = [
	{ value: 'county', label: 'Powiat' },
	{ value: 'community', label: 'Gmina' },
];

const Form = () => {
	const { id } = useParams();
	const history = useHistory();
	const classes = useStyles();
	const [breadcrumbs, setBreadcrumbs] = useState([
		{ title: 'Administracja', to: '' },
		{ title: 'Paragrafy', to: Routes.Paragraphs.List },
		{ title: 'Dodaj paragrafy', to: '' },
	]);

	const [data, setData] = useState({
		symbol: '',
		name: '',
		version: '',
		date_from: null,
		refers_to: '',
	});
	const [errors, setErrors] = useState(null);
	const [saving, setSaving] = useState(false);
	const Validators = {
		symbol: new Validator(Required),
		name: new Validator(Required),
		version: new Validator(Required),
		date_from: new Validator(Required),
	};

	useEffect(() => document.title = `SUM - ${id ? 'Edycja' : 'Dodawanie'} paragrafy`, []);

	useEffect(() => {

		if (!id) return;
		API.paragraphs.show(id).then(res => {
			const paragraph = res.data?.paragraph;

			setData(paragraph);
			setBreadcrumbs(prev => {
				prev[2].title = paragraph.name;
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
		(id ? API.paragraphs.update : API.paragraphs.store)(data, id).then(() => {
			setSaving(false);
			toast.success('Paragrafy została zapisana!');
			history.push(Routes.Paragraphs.List);
		});
	};

	const handleCancel = () => history.push(Routes.Paragraphs.List);

	return (
		<>
			<Box className={classes.content}>
				<Header title={`${id ? 'Edytować' : 'Dodaj'} paragrafy`} />
				<Breadcrumbs breadcrumbs={breadcrumbs} />

				<Box className={classes.section}>
					<FormInput
						title="Symbol paragrafy"
						name="symbol"
						value={data.symbol}
						onChange={handleChange}
						error={errors?.symbol}
						inputProps={{ 'aria-required': true }}
					/>
					<FormInput
						title="Opis paragrafy"
						name="name"
						value={data.name}
						onChange={handleChange}
						error={errors?.name}
						inputProps={{ 'aria-required': true }}
					/>
					<FormInput
						type="number"
						title="Wersja paragrafy"
						name="version"
						value={data.version}
						onChange={handleChange}
						error={errors?.version}
						inputProps={{ 'aria-required': true }}
					/>
					<DateInput
						fullWidth
						title="Obowiązuje od paragrafy"
						name="date_from"
						error={errors?.version}
						value={data.date_from || null}
						onChange={handleChange}
						inputProps={{ 'aria-required': true }}
					/>
					<Select
						fullWidth
						title="Odnosi się do paragrafy"
						options={refersTo}
						displayEmpty
						emptyLabel="Wybierz"
						name="refers_to"
						value={data.refers_to}
						onChange={handleChange}
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
