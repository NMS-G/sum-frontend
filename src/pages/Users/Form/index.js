import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, Box, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import _ from 'lodash';

import API from 'apis/API';
import Routes from 'router/Routes';
import Validator, { Email, Required, validate } from 'utils/Validator';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import Typography from 'components/Main/Typography';
import Checkbox from 'components/Form/Checkbox';
import Select from 'components/Form/Select';
import FormInput from 'components/Form/FormInput';
import ControlButtonGroup from 'components/Buttons/ControlButtonGroup';

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(-5, -4, 0),
		padding: theme.spacing(5, 4),
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
		{ title: 'Użytkownicy', to: '' },
		{ title: 'Zarządzaj użytkownikami', to: Routes.Users.List },
		{ title: 'Dodaj użytkownika' },
	]);

	const [permissions, setPermissions] = useState([]);
	const [roles, setRoles] = useState([]);
	const [rolePermissionIds, setRolePermissionIds] = useState([]);
	const [data, setData] = useState({
		email: '',
		firstname: '',
		surname: '',
		role_id: '',
		permission_ids: [],
		is_active: true
	});
	const [errors, setErrors] = useState('');
	const [saving, setSaving] = useState(false);
	const Validators = {
		email: new Validator(Required, Email),
		firstname: new Validator(Required),
		surname: new Validator(Required),
		role_id: new Validator(Required),
	};

	useEffect(() => document.title = `SUM - ${id ? 'Edycja' : 'Dodawanie'} użytkownika`, [id]);

	useEffect(() => {
		API.permissions.all().then(res => setPermissions(res?.data?.data || []));
		API.roles.all().then(res => setRoles(res?.data?.data || []));

		if (!id) return;
		API.users.show(id).then(res => {
			let user = res.data.user;
			user['permission_ids'] = _.map(user.permissions, 'id');
			delete user.permissions;
			setRolePermissionIds(user?.role?.permissions?.map(p => p.id) || []);
			setData(user);
			setBreadcrumbs(prev => {
				prev[2].title = user.email;
				return [...prev];
			});
		});
	}, [id]);

	const handleChange = e => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		if (target.name === 'role_id') {
			let role = roles.find(role => +role.id === +value);
			setRolePermissionIds(role?.permissions?.map(p => p.id) || []);
		}
		setData(prev => ({ ...prev, [target.name]: value }));
	};

	const handleChangePermissionIds = (e, id) => {
		let ids = data.permission_ids;
		let index = ids.indexOf(id);

		e.target.checked
			? ids.push(id)
			: ids.splice(index, 1);
		setData(prev => ({ ...prev, permission_ids: ids }));
	};

	const handleSave = () => {
		let _errors = validate(data, Validators);
		setErrors(_errors);
		if (_errors) {
			return toast.error('Nie wszystkie pola spełniają wymagania. Popraw błędy i spróbuj ponownie.');
		}

		setSaving(true);
		(id ? API.users.update : API.users.store)(data, id).then(res => {
			setSaving(false);
			if (res.data.message === 'exist') return toast.error('Użytkownik już istnieje.');

			toast.success('Użytkownik został zapisany!');
			handleCancel();
		});
	};

	const handleCancel = () => history.push(Routes.Users.List);

	return (
		<>
			<Box className={classes.root}>
				<Header title="Dodaj użytkownika" />
				<Breadcrumbs breadcrumbs={breadcrumbs} />

				<Box className={classes.section}>
					<FormInput
						title="E-mail"
						name="email"
						value={data.email}
						onChange={handleChange}
						error={errors?.email}
						inputProps={{'aria-required': true}}
					/>
					<FormInput
						title="Imię"
						name="firstname"
						value={data.firstname}
						onChange={handleChange}
						error={errors?.firstname}
						inputProps={{'aria-required': true}}
					/>
					<FormInput
						title="Nazwisko"
						name="surname"
						value={data.surname}
						onChange={handleChange}
						error={errors?.surname}
						inputProps={{'aria-required': true}}
					/>
					<FormInput
						title="Numer telefonu"
						name="phone_number"
						value={data.phone_number}
						onChange={handleChange}
						error={errors?.phone_number}
						inputProps={{'aria-required': true}}
					/>
					<Select
						title="Rola"
						options={roles}
						displayEmpty
						emptyLabel="Wybierz rolę"
						name="role_id"
						valueField="id"
						labelField="name"
						value={data?.role_id}
						onChange={handleChange}
						error={errors?.role_id}
						inputProps={{'aria-required': true}}
					/>
					<Grid container>
						<Grid item sm={4} xs={12}>
							<Typography>Dodatkowe uprawnienia</Typography>
						</Grid>
						<Grid item sm={8} xs={12}>
							{permissions?.map((item, index) => (
								<Checkbox
									key={index}
									title={item.name}
									name="permission_ids"
									value={data.permission_ids.includes(item.id) || rolePermissionIds.includes(item.id)}
									disabled={rolePermissionIds.includes(item.id)}
									onChange={e => handleChangePermissionIds(e, item.id)}
									fullWidth
								/>
							))}
						</Grid>
					</Grid>
					<Grid container alignItems="center">
						<Grid item sm={4} xs={12}>
							<Typography>Aktywny</Typography>
						</Grid>
						<Grid item sm={8} xs={12}>
							<Checkbox
								name="is_active"
								value={data.is_active}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
					</Grid>
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
