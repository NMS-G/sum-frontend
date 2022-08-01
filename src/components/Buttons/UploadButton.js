import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
	button: {
		borderRadius: 3,
		padding: '11px 18px',

		'& .MuiButton-label': {
			fontFamily: 'Open Sans',
			fontWeight: 'bold',
			fontSize: 13,
			lineHeight: 1.1,
		}
	},
}));

const UploadButton = (props) => {
	const ref = useRef();
	const classes = useStyles();
	const { children, className, acceptFiles, handleCapture, ...rest } = props;

	const handleChange = (e) => {
		handleCapture(e);
		ref.current.value = '';
	};

	return (
		<Button
			variant="contained"
			color="primary"
			className={clsx(classes.button, className)}
			component='label'
			{...rest}
		>
			{children}
			<input
				accept={acceptFiles}
				type='file'
				multiple
				hidden
				onChange={handleChange}
				ref={ref}
			/>
		</Button>
	);
};

UploadButton.displayName = 'UploadButtonButton';
UploadButton.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	handleCapture: PropTypes.func
};

export default UploadButton;