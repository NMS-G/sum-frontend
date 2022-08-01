import React, { useState } from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

import Messages from 'utils/Messages';
import DeleteModal from 'components/Main/DeleteModal';
import Tooltip from 'components/Main/Tooltip';

import {
	EditIcon,
	TrashIcon,
	PlusRedIcon,
	CircleCheckIcon,
	NewsIcon,
	Message,
	CollapseCircleCheck,
	CheckRedIcon,
	PlusRedSmall,
	TimesIcon,
	CirCleExpand,
	TimesWhite
} from 'assets/svg';

const IconButton = props => {
	const { size = 'small', color = 'secondary', tooltip = '', children, disabled, ...rest } = props;
	const button = (
		<MuiIconButton size={size} color={color} disabled={disabled} {...rest}>
			{children}
		</MuiIconButton>
	);

	return (
		tooltip && !disabled
			? <Tooltip title={tooltip}>{button}</Tooltip>
			: button
	);
};

IconButton.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	tooltip: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
};

export default IconButton;

export const EditIconButton = props => (
	<IconButton {...props}>
		<EditIcon fontSize="small" alt="Ikona edycji wiersza" />
	</IconButton>
);

export const NewsIconButton = props => (
	<IconButton {...props}>
		<NewsIcon fontSize="small" />
	</IconButton>
);

export const MessageButton = props => (
	<IconButton {...props}>
		<Message fontSize="small" />
	</IconButton>
);

export const DeleteIconButton = props => {
	const { onClick, title = Messages.Delete, hideModal, ...rest } = props;
	const [openModal, setOpenModal] = useState(false);

	const handleClick = (e) => {
		e.stopPropagation();
		if (hideModal) {
			onClick();
		} else {
			setOpenModal(true);
		}
	};

	return (
		<>
			<IconButton onClick={handleClick} {...rest}>
				<TrashIcon fontSize="small" alt="Ikona usunięcia wiersza" />
			</IconButton>
			<DeleteModal
				title={title}
				openModal={openModal}
				handleClose={() => setOpenModal(false)}
				handleDelete={onClick}
			/>
		</>
	);
};

export const PlusIconButton = props => (
	<IconButton {...props}>
		<PlusRedIcon fontSize="small" />
	</IconButton>
);

export const SaveIconButton = props => (
	<IconButton {...props}>
		<CircleCheckIcon fontSize="small" alt="Ikona zatwierdzenia zmian" />
	</IconButton>
);

export const CollapseCircleIconButton = props => (
	<IconButton {...props}>
		<CollapseCircleCheck fontSize="small" alt="Ikona zwiniecia danych" />
	</IconButton>
);

export const ExpandCircleIconButton = props => (
	<IconButton {...props}>
		<CirCleExpand fontSize="small" alt="Ikona rozwinięcia danych" />
	</IconButton>
);

export const CheckRedIconButton = props => (
	<IconButton {...props}>
		<CheckRedIcon fontSize="small" />
	</IconButton>
);

export const TimesIconButton = props => (
	<IconButton {...props}>
		<TimesIcon fontSize="small" />
	</IconButton>
);

export const PlusRedSmallButton = props => (
	<IconButton {...props}>
		<PlusRedSmall fontSize="small" />
	</IconButton>
);

export const TimesWhiteButton = props => (
	<IconButton {...props}>
		<TimesWhite fontSize="small" />
	</IconButton>
);