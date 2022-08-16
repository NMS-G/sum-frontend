import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import API from 'apis/API';
import Routes from 'router/Routes';
import RoutesRouter from 'router/RoutesRouter';
import Storage from 'utils/Storage';

const AuthContext = React.createContext(null);
const authPaths = ['/login', '/register', '/forgot_password', '/reset_password', '/privacy-policy', '/regulations', '/accessibility-declaration', '/information-clause'];

export const AuthContextProvider = () => {
	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [gFooterClosed, setGFooterClosed] = useState(false);

	useEffect(() => {
		let _user = Storage.get('user');
		if (_user) {
			setUser(_user);
			if (window.location.pathname === '/login') {
				history.push(Routes.Home);
			}
		}

		// check if footer is closed previously
		let isFooterClosed = Storage.get('accept_privacy_policy');
		if (isFooterClosed) setGFooterClosed(true);
	}, []);

	useEffect(() => {
		if (gFooterClosed) {
			Storage.set('accept_privacy_policy', 'YES');
		}
	}, [gFooterClosed]);

	useEffect(() => {
		if (authPaths.find(path => path === window.location.pathname)) {
			Storage.remove('access_token');
			Storage.remove('user');
			setUser(null);
		}
	}, [window.location.pathname]);

	const logIn = data => {
		if (!data?.access_token || !data?.user) {
			return logOut();
		}

		Storage.set('access_token', data.access_token);
		Storage.set('user', data.user);
		setUser(data.user);
		history.push(Routes.Home);
	};

	const logOut = () => {
		// Sometimes react-router-dom location is empty so used window location.
		if (authPaths.find(path => path === window.location.pathname)) return;

		Storage.remove('access_token');
		Storage.remove('user');
		setUser(null);
		// window.location.href = Routes.Auth.Login;
		history.push(Routes.Auth.Login);
	};

	const checkIsTokenValid = () => {
		API.auth.validateToken()
			.then(res => {
				setLoading(false);
				if (res.data.code !== 200) logOut();
			}).catch(() => {
				setLoading(false);
				logOut();
			});
	};

	useEffect(() => {
		API.interceptors.response.use(res => {
			if (res?.data?.code === 401) logOut();

			return res;
		}, err => {
			if (err.response?.status === 401) logOut();
			return err;
		});

		checkIsTokenValid();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider value={{ logIn, logOut, user, gFooterClosed, setGFooterClosed }}>
			{!loading &&
				<RoutesRouter />
			}
		</AuthContext.Provider>
	);
};

export default AuthContext;
