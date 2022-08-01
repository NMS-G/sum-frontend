import React from 'react';
import {
	Modal,
	Backdrop,
	Fade,
	Grid,
	Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Typography from './Typography';
import PrimaryButton from 'components/Buttons/PrimaryButton';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		boxShadow: theme.shadows[5],
		padding: '25px',
		outline: 'none',
	},
}));


const FormModal = (props) => {
	const {
		openModal,
		handleClose,
		handleOk,
		title,
		okText = 'TAK',
		cancelText = 'NIE',
	} = props;
	const classes = useStyles();

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={openModal}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}} >
			<Fade in={openModal}>
				<Card className={classes.paper}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant="bodyL" align="center">{title}</Typography>
						</Grid>
						<Grid item xs={6}>
							<PrimaryButton
								color="secondary"
								fullWidth
								onClick={(e) => {
									e.stopPropagation();
									handleOk();
									handleClose();
								}}>
								{okText}
							</PrimaryButton>
						</Grid>
						<Grid item xs={6}>
							<PrimaryButton fullWidth onClick={(e) => {
								e.stopPropagation();
								handleClose();
							}}>
								{cancelText}
							</PrimaryButton>
						</Grid>
					</Grid>
				</Card>
			</Fade>
		</Modal>
	);
};

Modal.propTypes = {
	openModal: PropTypes.bool,
	handleClose: PropTypes.func,
	handleOk: PropTypes.func,
	title: PropTypes.string,
	okText: PropTypes.string,
	cancelText: PropTypes.string,
};

export default FormModal;
