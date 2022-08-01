const recursiveAppend = (formData, field, value) => {
	if (value instanceof File) {
		formData.append(field, value, value.name);
		return formData;
	}

	if (Array.isArray(value)) {
		value.forEach((val, index) => recursiveAppend(formData, field + '[' + index + ']', val));
		return formData;
	}

	if (value === null) {
		formData.append(field, '');
		return formData;
	}

	if (value && typeof value === 'object') {
		Object.keys(value).forEach(key => recursiveAppend(formData, field ? `${field}[${key}]` : key, value[key]));
		return formData;
	}

	if (typeof value === 'boolean') {
		formData.append(field, value ? '1' : '');
		return formData;
	}
	return formData.append(field, value);
};

export default function makeFormData(data) {
	return recursiveAppend(new FormData(), null, data);
}
