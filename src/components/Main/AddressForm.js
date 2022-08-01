import React from 'react';
import { Grid } from '@material-ui/core';

import FormInput from 'components/Form/FormInput';
import Typography from './Typography';

const AddressForm = props => {
	const {
		title,
		prefix,
		data,
		errors,
		onChange,
		vertical = false,
		sm = 4,
		disabled
	} = props;

	const keys = {
		street: `${prefix}_street`,
		building_number: `${prefix}_building_number`,
		apartment_number: `${prefix}_apartment_number`,
		postcode: `${prefix}_postcode`,
		city: `${prefix}_city`,
	};

	return (

		<Grid container spacing={1}>
			<Grid item xs={12} sm={vertical ? 12 : sm}>
				<Typography>{title}</Typography>
			</Grid>
			<Grid item xs={12} sm={vertical || !title ? 12 : 12 - sm}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={8}>
						<FormInput
							placeholder="Ulica"
							name={keys.street}
							value={data?.[keys.street]}
							onChange={onChange}
							error={errors?.[keys.street]}
							disabled={disabled}
							inputProps={{ 'aria-required': true }}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<FormInput
							placeholder="Nr budynku"
							name={keys.building_number}
							value={data?.[keys.building_number]}
							onChange={onChange}
							error={errors?.[keys.building_number]}
							disabled={disabled}
							inputProps={{ 'aria-required': true }}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<FormInput
							placeholder="Nr lokalu"
							name={keys.apartment_number}
							value={data?.[keys.apartment_number]}
							onChange={onChange}
							error={errors?.[keys.apartment_number]}
							disabled={disabled}
							inputProps={{ 'aria-required': true }}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormInput
							placeholder="Kod pocztowy"
							name={keys.postcode}
							value={data?.[keys.postcode]}
							onChange={onChange}
							error={errors?.[keys.postcode]}
							disabled={disabled}
							inputProps={{ 'aria-required': true }}
						/>
					</Grid>
					<Grid item xs={12} sm={8}>
						<FormInput
							placeholder="Miejscowość"
							name={keys.city}
							value={data?.[keys.city]}
							onChange={onChange}
							error={errors?.[keys.city]}
							disabled={disabled}
							inputProps={{ 'aria-required': true }}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default AddressForm;
