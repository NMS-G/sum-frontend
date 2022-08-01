import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import BaseInput from './BaseInput';
import FormInput from './FormInput';

const NumberInput = React.forwardRef((props, ref) => {
	const {
		name,
		value,
		onChange,
		inputType = 'base',
		thousandSeparator = ' ',
		decimalSeparator = ',',
		decimalScale = 2,
		...rest
	} = props;
	const [val, setVal] = useState(value);

	useEffect(() => {
		if (val === '' && value === 0) return;
		setVal(value);
	}, [value, val]);

	const handleChange = values => {
		let { floatValue } = values;
		setVal(floatValue || 0);
		if(floatValue === value || !onChange) return;
		
		onChange({ target: { name, value: floatValue || 0 } });
	};

	return (
		<NumberFormat
			ref={ref}
			name={name}
			value={val}
			onValueChange={handleChange}
			customInput={inputType === 'base' ? BaseInput : FormInput}
			thousandSeparator={thousandSeparator}
			decimalSeparator={decimalSeparator}
			decimalScale={decimalScale}
			{...rest}
		/>
	);
});
NumberInput.displayName = 'NumberInput';

export default NumberInput;