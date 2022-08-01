import moment from 'moment-timezone';

export const formatDateTime = value => value ? moment(value).format('DD.MM.YYYY HH:mm') : '';
export const formatDate = value => value ? moment(value).format('DD.MM.YYYY') : '';
export const formatTime = value => value ? moment(value).format('HH:mm') : '';
export const formatBoolean = value => value ? 'TAK' : 'NIE';
export const formatNumber = (value, fractionDigits) => parseFloat(value).toLocaleString('pl',
	fractionDigits ? { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 } : undefined
);

const format = (value, type) => {
	let text = '';
	switch (type) {
	case 'date':
		text = formatDate(value);
		break;
	case 'time':
		text = formatTime(value);
		break;
	case 'datetime':
		text = formatDateTime(value);
		break;
	case 'number':
		text = formatNumber(value);
		break;
	case 'boolean':
		text = formatBoolean(value);
		break;
	default:
		text = value;
	}
	return text;
};

export default format;