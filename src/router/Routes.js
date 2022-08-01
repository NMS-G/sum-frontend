const Routes = {
	Home: '/home',
	Auth: {
		Login: '/login',
		Register: '/register',
		ForgotPassword: '/forgot_password',
		ResetPassword: '/reset_password',
	},
	Users: {
		List: '/users',
		Create: '/users/create',
		Edit: (id = ':id') => `/users/${id}/edit`,
		Profile: '/users/profile',
	},
	Role: {
		List: '/roles',
		Create: '/roles/create',
		Edit: (id = ':id') => `/roles/${id}/edit`,
	},
	Logs: {
		List: '/logs'
	},
	Pages: {
		List: '/pages',
		Preview: (id = ':id') => `/pages/preview/${id}`,
		Edit: (id = ':id') => `/pages/${id}/edit`,
		EditHome: '/pages/edit-home',
		EditLogin: '/pages/edit-login',
		Help: '/pages/help',
		PrivacyPolicy: '/privacy-policy',
		Regulations: '/regulations',
		AccessibilityDeclaration: '/accessibility-declaration',
		InformationClause: '/information-clause',
	},
	Others: {
		NotFound: '/not-found',
		HasProblem: '/has-problem',
	},
	SubSystem: {
		Parameters: {
			List: '/subsystem/parameters',
			Create: '/subsystem/parameters/create',
			Edit: (id = ':id') => `/subsystem/parameters/${id}/edit`,
		},
		Types: {
			List: '/subsystem/types',
			Create: '/subsystem/types/create',
			Edit: (id = ':id') => `/subsystem/types/${id}/edit`,
		},
	},
	FinancialPlan: {
		Statements: {
			List: '/financial_plan/statements',
			Create: '/financial_plan/statements/create',
			Edit: (id = ':id') => `/financial_plan/statements/${id}/edit`,
		},
		Summaries: {
			List: '/financial_plan/summaries',
			Create: '/financial_plan/summaries/create',
			Edit: (id = ':id') => `/financial_plan/summaries/${id}/edit`,
		},
	},
};

export default Routes;
