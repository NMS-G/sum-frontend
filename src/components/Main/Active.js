import React from 'react';
import { CheckIcon, TimesIcon } from 'assets/svg';

const Active = ({ active, activeAlt, deActiveAlt }) => {
	return (
		active ? <CheckIcon alt={activeAlt} /> : <TimesIcon alt={deActiveAlt} />
		// active ? <Check style={{ color: '#228861' }} /> : <Close color="secondary" />
	);
};

export default Active;

