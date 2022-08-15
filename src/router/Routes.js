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
	AmountExpense: {
		Decision: {
			List: '/amount_expense/decision',
			Create: '/amount_expense/decision/create',
			Edit: (id = ':id') => `/amount_expense/decision/${id}/edit`,
		},
		Working: {
			List: '/amount_expense/working',
			Create: '/amount_expense/working/create',
			Edit: (id = ':id') => `/amount_expense/working/${id}/edit`,
		},
		Accepted: '/amount_expense/accepted'
	},
	BreakdownExpense: {
		Expense: {
			List: '/breakdown_expense/expense',
			Create: '/breakdown_expense/expense/create',
			Edit: (id = ':id') => `/breakdown_expense/expense/${id}/edit`,
		},
		Listings: {
			List: '/breakdown_expense/listings',
			Create: '/breakdown_expense/listings/create',
			Edit: (id = ':id') => `/breakdown_expense/listings/${id}/edit`,
		},
		Accepted: '/breakdown_expense/accepted'
	},
	CommunesPoviats: {
		Division: {
			List: '/communes_poviats/division',
			Create: '/communes_poviats/division/create',
			Edit: (id = ':id') => `/communes_poviats/division/${id}/edit`,
		},
		Working: {
			List: '/communes_poviats/workings',
			Create: '/communes_poviats/workings/create',
			Edit: (id = ':id') => `/communes_poviats/workings/${id}/edit`,
		},
		Accepted: '/communes_poviats/accepted'
	},
	Paragraphs: {
		List: '/paragraphs',
		Create: '/paragraphs/create',
		Edit: (id = ':id') => `/paragraphs/${id}/edit`,
	},
	UnitsGroups: {
		List: '/units_groups',
		Create: '/units_groups/create',
		Edit: (id = ':id') => `/units_groups/${id}/edit`,
	},
	Units: {
		List: (groupId = ':groupId') => `/units_groups/${groupId}/units`,
		Create: (groupId = ':groupId') => `/units_groups/${groupId}/units/create`,
		Edit: (groupId = ':groupId', id = ':id') => `/units_groups/${groupId}/units/${id}/edit`,
	},
};

export default Routes;
