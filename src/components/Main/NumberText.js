import React from 'react';
import NumberFormat from 'react-number-format';

import Typography from 'components/Main/Typography';

const NumberText = React.forwardRef((props, ref) => {
	const {
		thousandSeparator = ' ',
		decimalSeparator = ',',
		decimalScale = 2,
		...rest
	} = props;
	return (
		<NumberFormat
			ref={ref}
			displayType="text"
			thousandSeparator={thousandSeparator}
			decimalSeparator={decimalSeparator}
			decimalScale={decimalScale}
			renderText={(value, customProps) =>
				<Typography {...customProps}>{isNaN(parseFloat(value)) ? 0 : value}</Typography>
			}
			{...rest}
		/>
	);
});
NumberText.displayName = 'NumberText';

export default NumberText;
