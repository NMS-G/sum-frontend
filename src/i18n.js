import API from 'apis/API';
import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const loadResources = locale => API.translations.all(locale);

const backendOptions = {
	loadPath: '{{lng}}|{{ns}}',
	request: (options, url, payload, callback) => {
		try {
			const [lng] = url.split('|');
			loadResources(lng).then(res => {
				callback(null, {
					data: res.data?.data,
					status: 200,
				});
			});
		} catch (e) {
			console.error(e);
			callback(null, {
				status: 500,
			});
		}
	},
};

i18n
	.use(backend)
	.use(initReactI18next)
	.init({
		backend: backendOptions,
		lng: 'pl',
		fallbackLng: ['pl', 'en'],
		debug: true,
		ns: ['translations'],
		defaultNS: 'translations',
		keySeparator: '.',
		interpolation: {
			escapeValue: false,
			formatSeparator: ',',
		},
		react: {
			wait: true,
			bindI18n: 'languageChanged loaded',
			bindStore: 'added removed',
			nsMode: 'default',
		},
	});

export default i18n;
