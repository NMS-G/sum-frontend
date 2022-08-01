import React, { useContext, useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';

import API from 'apis/API';
import Routes from 'router/Routes';
import Validator, { Equal, Password, Required, validate } from 'utils/Validator';
import Header from 'components/Main/Header';
import ControlButtonGroup from 'components/Buttons/ControlButtonGroup';
import AuthContext from 'context/AuthContext';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';
import Typography from 'components/Main/Typography';
import PasswordInput from 'components/Form/PasswordInput';

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(-5, -4, 0),
		padding: theme.spacing(5, 4),
		overflowY: 'auto',
		height: '100%',
	},
	section: {
		background: theme.palette.white,
		padding: theme.spacing(4),
		marginBottom: theme.spacing(4),
		border: '1px solid #B4B4B4',
		borderRadius: 3,
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2)
		},
	}
}));

const Profile = () => {
	const classes = useStyles();
	const history = useHistory();
	const { user } = useContext(AuthContext);
	const breadcrumbs = [
		{ title: 'Użytkownicy', to: '' },
		{ title: 'Zarządzaj użytkownikami', to: Routes.Users.List },
		{ title: 'Twój profil' },
	];
	const userInfoFields = [
		{ name: 'email', label: 'E-mail' },
		{ name: 'firstname', label: 'Imię' },
		{ name: 'surname', label: 'Nazwisko' },
		{ name: 'phone_number', label: 'Numer telefonu' },
		{ name: 'role.name', label: 'Rola' },
	];

	const [data, setData] = useState({
		old_password: '',
		password: '',
		confirm_password: '',
	});
	const [errors, setErrors] = useState(null);
	const [saving, setSaving] = useState(false);
	const Validators = {
		old_password: new Validator(Required),
		password: new Validator(Required, Password),
		confirm_password: new Validator(Equal('password')),
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setData(prev => ({ ...prev, [name]: value }));
	};

	const handleCancel = () => history.push(Routes.Users.List);

	const handleSave = () => {
		let _errors = validate(data, Validators);
		setErrors(_errors);
		if (_errors) {
			return toast.error('Podane hasło jest błędne! Spróbuj jeszcze raz.');
		}

		setSaving(true);
		API.auth.updatePassword(data).then(res => {
			if (res.data.code === 200) {
				return toast.success('Hasło zostało zmienione!');
			}

			toast.error('Podane hasło jest błędne! Spróbuj jeszcze raz.');
			setErrors(prev => ({ ...prev, old_password: 'Podane hasło jest błędne' }));
		});

		setSaving(false);
	};

	return (
		<>
			<Box className={classes.root}>
				<Header title="Twój profil" />
				<Breadcrumbs breadcrumbs={breadcrumbs} />

				<Box className={classes.section}>
					{userInfoFields.map(field => (
						<Grid key={field.name} container alignItems="center" spacing={2} style={{ marginBottom: 16 }}>
							<Grid item sm={4} xs={12}>
								<Typography>{field.label}</Typography>
							</Grid>
							<Grid item sm={8} xs={12}>
								<Typography variant="bodyL">{_.get(user, field.name) || 'brak'}</Typography>
							</Grid>
						</Grid>
					))}
				</Box>
				<Box className={classes.section}>
					<Typography variant="h3">Zmiana hasła</Typography>
					<Typography style={{ marginBlock: 16 }}>Hasło powinno być silne, złożone z co najmniej 8 znaków, w tym znaków specjalnych, dużych liter i cyfr</Typography>
					<Grid container>
						<Grid item lg={6} md={8} sm={10} xs={12}>
							<PasswordInput
								title="Obecne hasło"
								name="old_password"
								value={data.old_password}
								onChange={handleChange}
								error={errors?.old_password}
							/>
							<PasswordInput
								title="Nowe hasło"
								name="password"
								value={data.password}
								onChange={handleChange}
								error={errors?.password}
							/>
							<PasswordInput
								title="Powtórz nowe hasło"
								name="confirm_password"
								value={data.confirm_password}
								onChange={handleChange}
								error={errors?.confirm_password}
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

export default Profile;