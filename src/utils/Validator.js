import moment from 'moment-timezone';

import Messages from './Messages';
import Constants from './Constants';

// Validation rules
export const Required = value => !value ? Messages.FieldMustBeFilled : '';
export const RequiredIf = (field, ...ifValues) => (value, state) => {
	const rules = { ...(typeof field === 'object' ? field : { [field]: ifValues }) };

	for (const key in rules) {
		const conditionFieldValue = state[key];
		const validValues = Array.isArray(rules[key]) ? rules[key] : [rules[key]];

		// if conditional values are set, should validate if it is same as conditional field value
		if (validValues.length && validValues.includes(conditionFieldValue))
			rules[key] = true;
		// if conditional value is not set, should validate if conditional field has value
		else if (!validValues.length && !!conditionFieldValue)
			rules[key] = true;
		// else, should not validate
		else
			rules[key] = false;
	}

	return Object.values(rules).every(shouldValidate => shouldValidate) ? Required(value) : '';
};
export const LengthLimit = (limit = Constants.DefaultStringLimit) => value => value && value.length > limit ? Messages.FieldTooLong : '';
export const Email = value => value && !Constants.EmailPattern.test(value) ? Messages.InvalidEmail : '';
export const Password = value => {
	return value && !Constants.PasswordPattern.test(value) ? Messages.InvalidPassword : '';
};
export const Equal = field => (value, state) => value !== state[field] ? Messages.Equal : '';
export const ValidISOString = (message = Messages.InvalidDateTime) => value => value && !moment(value).isValid() ? message : '';
export const AfterOrEqual = field => (value, state) => value && state[field] && value < state[field] ? Messages.AfterStartDate : '';
export const SiteUrl = value => value && !Constants.SiteUrlPattern.test(value) ? Messages.InvalidSiteUrl : '';
export const Boolean = value => typeof value !== 'boolean' ? Messages.InvalidBoolean : '';
export const Integer = value => (isNaN(value) || Number(value)) < 1 ? Messages.InvalidNumber : '';
export const FloatNumber = value => isNaN(value) ? Messages.InvalidNumber : '';
export const Unique = (array, key) => (value, state) => {
	let idKey = state?.id ? 'id' : 'index';
	return array.find(item => item?.[idKey] != state?.[idKey] && item[key] == value) ? Messages.MustBeUnique : '';
};

export const Custom = validator => validator;

/**
 * Runs validators for an object with values
 * @warn Does not support nested properties, values of type 'object' are considered as translation values (e.g. {en: '', pl: ''})
 * @param {object} values Object with subjects to validation, e.g. {email: 'some@test.email'}
 * @param {object} validators Object with validation rules, e.g. {email: new Validator(Required, Email, LengthLimit())}
 * @returns {object|null} Null if no errors or an object with error messages, e.g. {email: 'This field is invalid'}
 */
export const validate = (values, validators) => {
	let errors = null;

	Object.keys(validators).forEach(field => {
		const validator = validators[field];
		let value = values[field];
		if (value?.trim)
			value = value.trim();

		// translatable value
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			Object.keys(value).forEach(locale => {
				let localeValue = value[locale];
				if (localeValue?.trim)
					localeValue = localeValue.trim();
				const message = validator(localeValue, values);
				if (message) {
					if (!errors)
						errors = {};
					if (!errors[field])
						errors[field] = {};
					errors[field][locale] = message;
				}
			});
		}
		// regular value
		else {
			const message = validator(value, values);
			if (message) {
				if (!errors)
					errors = {};
				errors[field] = message;
			}
		}
	});

	return errors;
};

/**
 * Generates validator function with given validation rules
 * @param {...function} validators One of validation rules
 * @returns {string} Error message or empty string if no error
 * @constructor
 */
export default function Validator(...validators) {
	return function validate(value, state) {
		for (const validator of validators) {
			const message = validator(value, state);
			if (message)
				return message;
		}
		return '';
	};
}
