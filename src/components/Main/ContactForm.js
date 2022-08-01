import React from 'react';
import { Grid } from '@material-ui/core';

import FormInput from 'components/Form/FormInput';
import Typography from 'components/Main/Typography';

const ContactForm = ({ title, data, inputs = ['name', 'phone_number', 'email'] }) => {
	const getValue = input => {
		let value = '';
		if (Array.isArray(input)) {
			input.map(i => value += `${data?.[i]} `);
		} else {
			value = data?.[input];
		}
		
		return value || '';
	};

	return (
		<>
			<Typography>{title}</Typography>
			<Grid container spacing={1}>
				{inputs.map((input, i) => (
					<Grid key={i} item xs={12} sm>
						<FormInput
							value={getValue(input)}
							disabled
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default ContactForm;