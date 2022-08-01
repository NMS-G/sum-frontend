import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import * as serviceWorker from './serviceWorker';
import App from './App';
import mobileAndTabletCheck from 'utils/mobileAndTabletCheck';

window.isMobile = mobileAndTabletCheck();

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
