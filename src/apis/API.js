import axios from 'axios';
import Storage from 'utils/Storage';

const API = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT_URI
});

API.interceptors.request.use(config => {
	const token = Storage.get('access_token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, error => Promise.reject(error));

/**
 * Auth
 */
API.auth = {
	login: data => API.post('/auth/login', data),
	forgot: email => API.post('/auth/forgot_password', { email }),
	resetPassword: data => API.post('/auth/reset_password', data),
	validateToken: () => API.get('/auth/validate_token'),
	refreshToken: () => API.get('/auth/refresh_token'),
	updatePassword: data => API.post('/auth/update_password', data),
};

API.permissions = {
	all: () => API.get('/permissions/all')
};

API.logs = {
	index: params => API.get('/log_activities', { params })
};

/**
 * Roles
 */
API.roles = {
	index: params => API.get('/roles', { params }),
	all: () => API.get('/roles/all'),
	show: id => API.get(`/roles/${id}`),
	store: data => API.post('/roles', data),
	update: (data, id) => API.put(`/roles/${id}`, data),
	delete: id => API.delete(`/roles/${id}`)
};

/**
 * Users
 */
API.users = {
	index: params => API.get('/users', { params }),
	all: () => API.get('/users/all'),
	show: id => API.get(`/users/${id}`),
	store: data => API.post('/users', data),
	update: (data, id) => API.put(`/users/${id}`, data),
	delete: id => API.delete(`/users/${id}`)
};

/**
 * Pages
 */
API.pages = {
	all: () => API.get('/pages'),
	get: id => API.get(`/pages/${id}`),
	update: (data, id) => API.put(`/pages/${id}`, data)
};

/**
 * Paragraphs
 */
API.paragraphs = {
	index: params => API.get('/paragraphs', { params }),
	show: id => API.get(`/paragraphs/${id}`),
	store: data => API.post('/paragraphs', data),
	update: (data, id) => API.put(`/paragraphs/${id}`, data),
	delete: id => API.delete(`/paragraphs/${id}`)
};

export default API;
