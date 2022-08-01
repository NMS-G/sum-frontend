import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ToastContainer } from 'react-toastify';
import MomentUtils from '@date-io/moment';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n';
import moment from 'moment-timezone';
import 'moment/locale/pl';

import 'react-toastify/dist/ReactToastify.min.css';
import 'assets/css/index.css';

import theme from 'theme';
import { AuthContextProvider } from 'context/AuthContext';
import Progress from 'components/Main/Progress';

moment.tz.setDefault(process.env.REACT_APP_TIMEZONE);

const App = () => (
	// <I18nextProvider i18n={i18n}>
	<MuiPickersUtilsProvider utils={MomentUtils} locale="pl">
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Suspense fallback={<Progress status={true} />}>
					<AuthContextProvider />
					<ToastContainer
						position="top-center"
						autoClose={10000}
						theme="colored"
						style={{ fontSize: 18 }}
					/>
				</Suspense>
			</BrowserRouter>
		</ThemeProvider>
	</MuiPickersUtilsProvider>
	// </I18nextProvider>
);

export default App;
