import React from 'react';

import Typography from 'components/Main/Typography';

const TableLabel = React.forwardRef(({ children, ...rest }, ref) => (
	<Typography ref={ref} variant="tableLabel" {...rest}>{children}</Typography>
));
TableLabel.displayName = 'TableLabel';

export default TableLabel;