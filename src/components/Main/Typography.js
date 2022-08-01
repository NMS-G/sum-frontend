import React from 'react';
import { makeStyles, Typography as MuiTypography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
	h1: {
		fontFamily: 'Ubuntu',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 36,
		lineHeight: 1,
	},
	h2: {
		fontFamily: 'Ubuntu',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 28,
		lineHeight: 1,
	},
	h3: {
		fontFamily: 'Ubuntu',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 22,
		lineHeight: 1.3,
	},
	h4: {
		fontFamily: 'Ubuntu',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 1.1,
	},
	subtitle1: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 19,
		lineHeight: 1.25,
	},
	subtitle2: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: 17,
		lineHeight: 1.1,
	},
	headBody: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: 20,
		lineHeight: 1.6,
	},
	bodyL: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: 16,
		lineHeight: 1.5,
	},
	bodyM: {
		// fontFamily: 'Open Sans',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 16,
		lineHeight: 1.75,
	},
	bodyS: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 300,
		fontSize: 16,
		lineHeight: 1.75,
	},
	link: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: 15,
		lineHeight: 1.1,
	},
	label: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: 17,
		lineHeight: 1.1,
	},
	tableLabel: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 14,
		lineHeight: 1.2,
		textTransform: 'uppercase'
	},
	inputLabel: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 13,
		lineHeight: 1.1,
	},
	inputText: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 14,
		lineHeight: 1.2,
	},
	inputStatus: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 12,
		lineHeight: 1,
	},
	caption: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 12,
		lineHeight: 1.1,
	},
	menuLabel: {
		fontFamily: 'Open Sans',
		color: '#002582',
		fontWeight: 600,
		fontSize: 12,
		lineHeight: 1,
		letterSpacing: '0.04em',
		textTransform: 'uppercase'
	},
}));

const defaultVariants = [''];

const Typography = React.forwardRef((props, ref) => {
	const { variant = 'bodyM', className, ...rest } = props;
	const isCustom = defaultVariants.indexOf(variant) < 0;

	const classes = useStyles();
	return (
		<MuiTypography
			ref={ref}
			className={clsx(classes[variant], className)}
			variant={isCustom ? undefined : variant}
			{...rest}
		/>
	);
});
Typography.displayName = 'Typography';

Typography.propTypes = {
	variant: PropTypes.string,
	className: PropTypes.string,
};

export default Typography;
