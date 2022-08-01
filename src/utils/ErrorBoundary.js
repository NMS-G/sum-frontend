import React from 'react';
import * as Sentry from '@sentry/browser';
import { Button, Typography } from '@material-ui/core';
import HasProblemSvg from 'assets/svg/has_problem.svg';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null, eventId: null, openSidebar: true };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}
	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			...this.state,
			error: error,
			errorInfo: errorInfo,
		});

		Sentry.withScope(scope => {
			scope.setExtras(errorInfo);
			const eventId = Sentry.captureException(error);
			this.setState({ eventId });
		});
		// You can also log error messages to an error reporting service here
	}

	handleGoBack() {
		window.open('/home', '_self');
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
					<Typography variant='h5' style={{ marginTop: 40, fontWeight: 'bold' }}>Coś poszło nie tak</Typography>
					<Typography style={{ marginTop: 30 }}>Zostaliśmy poinformowani o problemie, który napotkałeś. Postaramy się zweryfikować go jak najszybciej</Typography>
					<Button variant='contained' color='primary' style={{ marginTop: 20 }} onClick={this.handleGoBack}>Powrót na stronę główną</Button>
					<img src={HasProblemSvg} alt='has-problem' style={{ marginTop: 60, width: '100%' }} />
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;