import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import Validator, { Required, Password, validate } from 'utils/Validator';
import Progress from 'components/Main/Progress';
import PasswordInput from 'components/Form/PasswordInput';
import PrimaryButton from 'components/Buttons/PrimaryButton';

import Layout from './Layout';

const useStyles = makeStyles(theme => ({
	primaryButton: {
		paddingInline: theme.spacing(8)
	}
}));

const ResetPassword = props => {
	const history = useHistory();
	const classes = useStyles();
	const [text, setText] = useState('');
	const [progressStatus, setProgressStatus] = useState(false);
	const [data, setData] = useState({
		password: '',
		confirm_password: '',
	});
	const [errors, setErrors] = useState(null);
	const Validators = {
		password: new Validator(Required, Password),
	};

	const handleChange = e => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		setData(prev => ({ ...prev, [target.name]: value }));
	};

	const handleKeyPress = e => {
		if (e.charCode !== 13) return;
		handleSend();
	};

	const handleSend = () => {
		let token = props.location.search.split('?token=')[1];
		setErrors(null);
		let _errors = validate(data, Validators);

		if (data.password !== data.confirm_password) {
			_errors = { ..._errors, confirm_password: 'Hasło się nie zgadza' };
		}

		setErrors(_errors);
		if (_errors) return;

		setProgressStatus(true);
		API.auth.resetPassword({ password: data.password, token }).then(res => {
			setProgressStatus(false);

			if (res.data?.code === 200) {
				toast.success('Hasło zostało zmienione!');
				history.push(Routes.Auth.Login);
				return;
			}

			toast.error('Invalid user');
		}).catch(() => toast.error('Invalid user or password'));
	};

	useEffect(() => {
		API.pages.get(7).then(({ data }) => {
			setText(data?.page?.content2);
		});
	}, []);

	return (
		<Layout title="Resetuj hasło" subtitle={text} loginLink={false}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<PasswordInput
					title="Nowe hasło"
					placeholder="Wpisz swój hasło"
					vertical
					value={data.password}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					error={errors?.password}
				/>
				<PasswordInput
					title="Powtórz nowe hasło"
					placeholder="Wpisz swój hasło"
					name="confirm_password"
					vertical
					value={data.confirm_password}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					error={errors?.confirm_password}
				/>

				<Box mt={4}>
					<PrimaryButton
						onClick={handleSend}
						className={classes.primaryButton}
						disabled={progressStatus}
					>
						WYŚLIJ
					</PrimaryButton>
				</Box>
			</Box>
			<Progress status={progressStatus} />
		</Layout>
	);
};

ResetPassword.propTypes = {
	location: PropTypes.shape({
		search: PropTypes.string,
	}),
};

export default ResetPassword;
