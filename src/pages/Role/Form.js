import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, Box, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import Validator, { Required, validate } from 'utils/Validator';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import Typography from 'components/Main/Typography';
import Checkbox from 'components/Form/Checkbox';
import FormInput from 'components/Form/FormInput';

const useStyles = makeStyles(theme => ({
	section: {
		background: theme.palette.white,
		padding: theme.spacing(4, 40, 4, 4),
		marginBottom: theme.spacing(4),
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
		{ title: 'Role', to: Routes.Role.List },
		{ title: 'Dodaj rolę' },
	]);

	const [permissions, setPermissions] = useState([]);
	const [data, setData] = useState({
		name: '',
		permission_ids: [],
	});
	const [errors, setErrors] = useState(null);
	const [saving, setSaving] = useState(false);
	const Validators = {
		name: new Validator(Required)
	};

	useEffect(() => document.title = `SUM - ${id ? 'Edycja' : 'Dodawanie'} roli`, []);

	useEffect(() => {
		API.permissions.all().then(res => setPermissions(res?.data?.data || []));

		if (!id) return;
		API.roles.show(id).then(res => {
			let role = res.data.role;
			role['permission_ids'] = role.permissions.map(item => item.id);
			delete role.permissions;

			setData(role);
			setBreadcrumbs(prev => {
				prev[2].title = role.name;
				return [...prev];
			});
		});
	}, [id]);

	const handleChange = e => {
		const { name, value } = e.target;
		setData(prev => ({ ...prev, [name]: value }));
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
		(id ? API.roles.update : API.roles.store)(data, id).then(() => {
			setSaving(false);
			toast.success('Rola została zapisana!');
			history.push(Routes.Role.List);
		});
	};

	return (
		<div className={classes.root}>
			<Header title={`${id ? 'Edytować' : 'Dodaj'} rolę`} />
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<Box className={classes.section}>
				<FormInput
					title="Nazwa roli"
					name="name"
					value={data.name}
					onChange={handleChange}
					error={errors?.name}
					gutterBottom={false}
					inputProps={{'aria-required': true}}
				/>
			</Box>
			<Grid container className={classes.section}>
				<Grid item sm={4} xs={12}>
					<Typography>Uprawnienia</Typography>
				</Grid>
				<Grid item sm={8} xs={12}>
					{permissions?.map((item, index) => (
						<Checkbox
							key={index}
							title={item.name}
							name="permission_ids"
							value={data.permission_ids.includes(item.id)}
							onChange={e => handleChangePermissionIds(e, item.id)}
							fullWidth
						/>
					))}
				</Grid>
			</Grid>

			<Box my={4}>
				<PrimaryButton onClick={handleSave} disabled={saving} >
					Zapisać
				</PrimaryButton>
			</Box>
		</div>
	);
};

export default Form;
