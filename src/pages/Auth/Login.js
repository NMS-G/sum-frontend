import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles, Link, Box } from '@material-ui/core';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import AuthContext from 'context/AuthContext';
import Validator, { Required, Email, validate } from 'utils/Validator';
import Typography from 'components/Main/Typography';
import Checkbox from 'components/Form/Checkbox';
import FormInput from 'components/Form/FormInput';
import PasswordInput from 'components/Form/PasswordInput';
import PrimaryButton from 'components/Buttons/PrimaryButton';

import Layout from './Layout';

const useStyles = makeStyles(() => ({
	loginButton: {
		paddingInline: 54,
		paddingTop: 15,
		paddingBottom: 15,
	}
}));

const Login = () => {
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const classes = useStyles();
	const [text, setText] = useState('');
	const [data, setData] = useState({
		email: '',
		password: '',
		remember: false
	});
	const [errors, setErrors] = useState(null);
	const [progressStatus, setProgressStatus] = useState(false);
	const Validators = {
		email: new Validator(Required, Email),
		// @TODO, disabled for test feature.
		// password: new Validator(Required, Password),
	};

	useEffect(() => {
		document.title = 'System SUM';
		if (authContext.user) {
			history.push(Routes.Home);
		}
	}, []);

	const handleChange = e => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		setData(prev => ({ ...prev, [target.name]: value }));
	};

	const handleKeyPress = e => {
		if (e.charCode !== 13) return;
		handleLogin();
	};

	const handleLogin = () => {
		let _errors = validate(data, Validators);
		setErrors(_errors);
		if (_errors) return;

		setProgressStatus(true);
		API.auth.login(data).then(res => {
			setProgressStatus(false);

			if (res.data?.reset_password_url) {
				return window.location.href = res.data?.reset_password_url;
			}

			if (res.data?.code === 200) {
				return authContext.logIn(res.data);
			}

			toast.error(res.data?.message || 'Podane dane są nieprawidłowe!');
		});
	};

	useEffect(() => {
		API.pages.get(7).then(({ data }) => {
			setText(data?.page?.content);
		});
	}, []);

	return (
		<Layout title='Zaloguj się' subtitle={text} progressStatus={progressStatus} loginLink={false}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<FormInput
					title="Login"
					placeholder="Wpisz swój login"
					vertical
					name="email"
					value={data.email}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					error={errors?.email}
					inputProps={{ 'aria-required': true }}
				/>
				<PasswordInput
					title="Hasło"
					placeholder="Wpisz swój hasło"
					vertical
					value={data.password}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					error={errors?.password}
				/>
				<Checkbox
					title="Zapamiętaj mnie"
					name="remember"
					value={data.remember}
					onChange={handleChange}
					fullWidth
				/>

				<Box my={5}>
					<PrimaryButton
						onClick={handleLogin}
						className={classes.loginButton}
						disabled={progressStatus}
					>
						Zaloguj się
					</PrimaryButton>
				</Box>
				<Link
					component={RouterLink}
					to={Routes.Auth.ForgotPassword}
					color="secondary"
				>
					<Typography variant="link">Zapomniałem hasła</Typography>
				</Link>
			</Box>
		</Layout>
	);
};

export default Login;
