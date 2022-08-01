import React, {useState} from 'react';
import {
	Modal,
	Backdrop,
	Fade,
	Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import FileManager from 'pages/Folders/FileManager';
import Typography from 'components/Main/Typography';

const FilePickModal = (props) => {
	const { openModal, handleClose, selectedFile } = props;
	const classes = useStyles();
	const [fileManagerKey, setFileManagerKey] = useState((new Date()).getTime());

	const handleSelectedFile = (file) => {
		selectedFile(file);
		handleClose();
	};
	
	const refreshFileManager = () => {
		setFileManagerKey((new Date()).getTime());
	};

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
					<Typography variant='h3' style={{ marginBottom: 20 }}>
						File picker
					</Typography>
					<FileManager key={fileManagerKey} onFileSelected={handleSelectedFile} refreshFileManager={refreshFileManager} />
				</Card>
			</Fade>
		</Modal>
	);
};

FilePickModal.propTypes = {
	openModal: PropTypes.bool,
	handleClose: PropTypes.func,
	selectedFile: PropTypes.func,
};

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
		backgroundColor: '#EEEEEE',
		height: '90vh',
		overflow: 'auto',
		width: 1210,
		margin: 'auto'
	}
}));

export default FilePickModal;
