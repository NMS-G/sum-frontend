import React, { useState } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';

import FormInput from './FormInput';

const PasswordInput = props => {
	const { hideAdornment = false, name = 'password', ...rest } = props;
	const [show, setShow] = useState(false);

	const EndAdornment = (
		<InputAdornment position="end">
			<IconButton
				aria-label="toggle password visibility"
				onClick={() => setShow(!show)}
				onMouseDown={e => e.preventDefault()}
			>
				{show ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
			</IconButton>
		</InputAdornment>
	);

	return (
		<FormInput
			{...rest}
			name={name}
			type={show ? 'text' : 'password'}
			InputProps={hideAdornment ? null : { endAdornment: EndAdornment }}
			inputProps={{ 'aria-required': true }}
		/>
	);
};

PasswordInput.propTypes = {
	hideAdornment: PropTypes.bool,
	name: PropTypes.string,
};

export default PasswordInput;
