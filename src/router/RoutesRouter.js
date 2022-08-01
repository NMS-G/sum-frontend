import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Main from 'layouts/Main';
import Minimal from 'layouts/Minimal';
import Routes from './Routes';
import LogIn from 'pages/Auth/Login';
import Home from 'pages/Home';
import ForgotPassword from 'pages/Auth/ForgotPassword';
import ResetPassword from 'pages/Auth/ResetPassword';
import Users from 'pages/Users';
import UserForm from 'pages/Users/Form';
import Profile from 'pages/Users/Profile';
import Role from 'pages/Role';
import RoleForm from 'pages/Role/Form';
import Logs from 'pages/Logs';
import Pages from 'pages/Pages';
import PageEdit from 'pages/Pages/Edit';
import PagePreview from 'pages/Pages/Preview';
import Help from 'pages/Pages/Help';
import Show from 'pages/Pages/Show';
import NotFound from 'pages/NotFound';
import EditHome from 'pages/Pages/EditHome';
import EditLogin from 'pages/Pages/EditLogin';

const ComponentRoutes = [
	{
		component: Home,
		title: 'Home',
		path: Routes.Home,
	},
	{
		component: Users,
		title: 'Zarządzaj użytkownikami',
		path: Routes.Users.List,
	},
	{
		component: UserForm,
		title: 'Dodaj użytkownika',
		path: Routes.Users.Create,
	},
	{
		component: UserForm,
		title: 'Edytować użytkownika',
		path: Routes.Users.Edit(),
	},
	{
		component: Profile,
		title: 'Twój profil',
		path: Routes.Users.Profile,
	},
	{
		component: Role,
		title: 'Role',
		path: Routes.Role.List,
	},
	{
		component: RoleForm,
		title: 'Dodaj rolę',
		path: Routes.Role.Create,
	},
	{
		component: RoleForm,
		title: 'Edytować rolę',
		path: Routes.Role.Edit(),
	},
	{
		component: Logs,
		title: 'Logi',
		path: Routes.Logs.List,
	},
	{
		component: Pages,
		title: 'Strona',
		path: Routes.Pages.List,
	},
	{
		component: PageEdit,
		title: 'Treści stron',
		path: Routes.Pages.Edit(),
	},
	{
		component: PagePreview,
		title: 'Treści stron',
		path: Routes.Pages.Preview(),
	},
	{
		component: Help,
		title: 'Help page',
		path: Routes.Pages.Help,
	},
	{
		component: EditHome,
		title: 'Edit Home Page',
		path: Routes.Pages.EditHome,
	},
	{
		component: EditLogin,
		title: 'Edit Login Page',
		path: Routes.Pages.EditLogin,
	},
];

const MinimalLayoutRoutes = [
	{
		component: LogIn,
		title: 'Zaloguj się',
		path: Routes.Auth.Login,
	},
	{
		component: ForgotPassword,
		title: 'Zapomniałeś hasła',
		path: Routes.Auth.ForgotPassword,
	},
	{
		component: ResetPassword,
		title: 'Zresetuj hasło',
		path: Routes.Auth.ResetPassword,
	},
	{
		component: Show,
		title: 'Show page',
		path: Routes.Pages.PrivacyPolicy,
	},
	{
		component: Show,
		title: 'Show page',
		path: Routes.Pages.Regulations,
	},
	{
		component: Show,
		title: 'Show page',
		path: Routes.Pages.AccessibilityDeclaration,
	},
	{
		component: Show,
		title: 'Show page',
		path: Routes.Pages.InformationClause,
	},
];

const MainLayout = () => {
	return (
		<Switch>
			<Main>
				{ComponentRoutes.map((route, index) => (
					<Route key={index} exact {...route} />
				))}
			</Main>
		</Switch>
	);
};

const MinimalLayout = () => {
	return (
		<Switch>
			<Minimal>
				{MinimalLayoutRoutes.map((route, index) => (
					<Route key={index} exact {...route} />
				))}
			</Minimal>
		</Switch>
	);
};

const RoutesRouter = () => {
	return (
		<Switch>
			<Redirect exact from="/" to={Routes.Auth.Login} />

			<Route path={MinimalLayoutRoutes.map(route => route.path)} component={MinimalLayout} />
			<Route path={ComponentRoutes.map(route => route.path)} component={MainLayout} />

			<Route path={'*'} component={NotFound} />
		</Switch>
	);
};

export default RoutesRouter;