import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles, Link, Box } from '@material-ui/core';
import { toast } from 'react-toastify';

import API from 'apis/API';
import Routes from 'router/Routes';
import Validator, { Required, Email, validate } from 'utils/Validator';
import Typography from 'components/Main/Typography';
import FormInput from 'components/Form/FormInput';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import Layout from './Layout';

const useStyles = makeStyles(theme => ({
	primaryButton: {
		paddingInline: theme.spacing(8)
	}
}));

const ForgotPassword = () => {
	const history = useHistory();
	const classes = useStyles();
	const [text, setText] = useState('');
	const [progressStatus, setProgressStatus] = useState(false);
	const [email, setEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const Validators = {
		email: new Validator(Required, Email)
	};

	const handleKeyPress = e => {
		if (e.charCode !== 13) return;
		handleSend();
	};

	const handleSend = () => {
		let _errors = validate({ email }, Validators);
		setErrorMessage(_errors?.email);
		if (_errors?.email) return;

		setProgressStatus(true);
		API.auth.forgot(email).then(res => {
			setProgressStatus(false);

			if (res.data?.code !== 200) {
				toast.error('Nieprawidłowy adres e-mail');
				return;
			}

			toast.success('Sprawdź swój e-mail.');
			history.push(Routes.Auth.Login);
		});
	};

	useEffect(() => {
		document.title = 'System SUM - Przypomnij hasło';
		API.pages.get(7).then(({ data }) => {
			setText(data?.page?.content1);
		});
	}, []);

	return (
		<Layout title="Przypomnij hasło" subtitle={text} progressStatus={progressStatus} loginLink={false}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<FormInput
					title="Email"
					placeholder="Wpisz swój email"
					vertical
					value={email}
					onChange={e => setEmail(e.target.value)}
					onKeyPress={handleKeyPress}
					error={errorMessage}
					inputProps={{'aria-required': true}}
				/>

				<Box my={4}>
					<PrimaryButton
						onClick={handleSend}
						className={classes.primaryButton}
						disabled={progressStatus}
					>
						WYŚLIJ
					</PrimaryButton>
				</Box>
				<Link
					component={RouterLink}
					to={Routes.Auth.Login}
					color="secondary"
				>
					<Typography variant="link">Zaloguj się</Typography>
				</Link>
			</Box>
		</Layout>
	);
};

export default ForgotPassword;
