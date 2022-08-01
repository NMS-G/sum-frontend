import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, SvgIcon, Menu, MenuItem } from '@material-ui/core';
import Typography from 'components/Main/Typography';
import API from 'apis/API';
import { EditIcon, TrashIcon, DownloadRedIcon, FolderBlue, Share, RedLink } from 'assets/svg';
import FolderContext from 'context/FolderContext';
import AuthContext from 'context/AuthContext';
import _ from 'lodash';
import Tooltip from './Tooltip';
import useCheckPermissions from 'utils/useCheckPermissions';
import { toast } from 'react-toastify';

const FileView = (props) => {
	const useStyles = makeStyles({
		itemWrapper: {
			textAlign: 'center',
			cursor: 'pointer',
			marginBottom: 13
		},
		fileImage: {
			width: window.isMobile ? 142 : 158,
			height: window.isMobile ? 142 : 158,
			borderRadius: 4,
			objectFit: 'cover'
		},
		item: {
			border: '1px solid #002852',
			borderRadius: 4,
			marginBottom: 10,
			width: window.isMobile ? 142 : 158,
			height: window.isMobile ? 142 : 158,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			cursor: 'pointer'
		},
		fontStyle: {
			fontSize: 14,
			color: '#25272B',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			width: window.isMobile ? 142 : 160
		},
		folderIcon: {
			width: 50,
			height: 44
		},
		fileType: {
			color: '#002852',
			fontSize: 27.5,
			fontWeight: 'bold'
		},
		fileControlIcon: {
			marginRight: 15
		},
		fileControlItem: {
			paddingTop: 5,
			paddingBottom: 5,
			width: 200
		},
		borderStyle: {
			borderBottom: '1px solid #B4B4B4'
		},
		tooltip: {
			marginBottom: 0,
			background: '#17253FE5',
			borderRadius: 0,
			fontSize: 12
		},
	});

	const {
		setFolderId,
		foldersListWithoutChildren,
		setBreadcrumbsArr,
		setExpanded,
		setFolder,
		folderId } = useContext(FolderContext);
	const { user } = useContext(AuthContext);

	const classes = useStyles();
	const { data, onEdit, onDelete, onDownload, onFileSelected, onClickShare } = props;
	const [image, setImage] = useState('');
	const [loading, setLoading] = useState(false);
	const [contextMenu, setContextMenu] = useState(null);

	const canCreateFolders = useCheckPermissions('can_create_folders', true);
	const canUploadFiles = useCheckPermissions('can_upload_files', true);
	const canShareFolders = useCheckPermissions('can_share_folders', true);
	const canDeleteAllFiles = useCheckPermissions('can_delete_all_files', true);
	const canDeleteOwnFiles = useCheckPermissions('can_delete_own_files', true);
	const canFullyManageEntities = useCheckPermissions('can_fully_manage_entities', true);

	const handleContextMenu = (e) => {
		e.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
					mouseX: e.clientX - 2,
					mouseY: e.clientY - 4,
				}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
				// Other native context menus might behave different.
				// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
				null,
		);
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	const handleEdit = (data) => (e) => {
		e.stopPropagation();
		handleClose();
		onEdit(data);
	};

	const handleClickShare = (data) => (e) => {
		e.stopPropagation();
		handleClose();
		onClickShare(data);
	};

	const handleDelete = (data) => {
		handleClose();
		onDelete(data);
	};

	const copyToClipboard = async (data) => {
		const copyUrl = `${process.env.REACT_APP_API_ENDPOINT_URI}/files/${data?.uuid}/filename=${data?.name}`;
		await navigator.clipboard.writeText(copyUrl);
		toast.info('Skopiowane do schowka');
		handleClose();
	};

	const handleClickFolder = (data) => (e) => {
		if (!_.has(data, 'parent_id')) {
			onFileSelected(data);
			return;
		} else {
			setExpanded(expanded => _.uniq([...expanded, folderId?.toString()]));
			setFolder(data);
		}

		// Don't fire this event handler if target is popup root
		if (e.target.parentNode.classList.contains('MuiPopover-root')) {
			return;
		}

		if (e.target.parentNode.classList.contains('MuiMenu-list')) {
			return;
		}

		if (folderId === data.id) {
			return;
		}

		setFolderId(data.id);
		setBreadcrumbsArr(foldersListWithoutChildren[data.id]);
	};

	const handleDownload = (data) => {
		handleClose();
		onDownload(data);
	};

	useEffect(() => {
		if (!_.has(data, 'parent_id')) {
			setLoading(true);
			API.files.view(data?.uuid).then(res => {
				if (res?.data?.status === 'not_found') return;
				setImage(window.URL.createObjectURL(new Blob([res.data], { type: 'image/jpeg' })));
				setLoading(false);
			});
		}
	}, []);

	return (
		<Box
			mr={2}
			className={classes.itemWrapper}
			onContextMenu={handleContextMenu}
			onClick={handleClickFolder(data)}
		>
			<Box className={classes.item}>
				{_.has(data, 'parent_id')
					? <SvgIcon className={classes.folderIcon} viewBox="0 0 50 45"><FolderBlue /></SvgIcon>
					: (
						<>
							{(data?.type).toLowerCase() === 'png' || (data?.type).toLowerCase() === 'jpg'
								? loading
									? 'loading...'
									: <img src={image} alt={data?.type} className={classes.fileImage} />
								: <Typography className={classes.fileType}>{(data?.type).toUpperCase()}</Typography>
							}
						</>
					)
				}
			</Box>
			<Tooltip
				title={data.name}
				placement="top"
				classes={{ tooltip: classes.tooltip }}
			>
				<Typography className={classes.fontStyle}>
					{data.name}
				</Typography>
			</Tooltip>
			<Menu
				open={contextMenu !== null}
				onClose={() => handleClose(null)}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu !== null
						? { top: contextMenu.mouseY, left: contextMenu.mouseX }
						: undefined
				}
			>
				{_.has(data, 'parent_id')
					? (
						[
							...(((canCreateFolders && (data?.user_id === user?.id)) || canFullyManageEntities || (canCreateFolders && !folderId) || (canCreateFolders && !data?.read_only && _.has(data, 'read_only'))) ?
								[
									<MenuItem
										onClick={handleEdit(data)}
										className={classes.fileControlItem}
										key="menu-item-edit-folder"
									>
										<SvgIcon
											color="secondary"
											className={classes.fileControlIcon}>
											<EditIcon />
										</SvgIcon>
										Edytuj
									</MenuItem>
								] : [])
							,
							...(canShareFolders ?
								[
									<li key="menu-item-edit-folder-border" className={classes.fileControlItem}>
										<Box className={classes.borderStyle}></Box>
									</li>,
									<MenuItem
										onClick={handleClickShare(data)}
										className={classes.fileControlItem}
										key="menu-item-share-folder"
									>
										<SvgIcon
											color="secondary"
											viewBox="0 0 22 22"
											className={classes.fileControlIcon}
										>
											<Share />
										</SvgIcon>
										Udostępnij
									</MenuItem>
								] : [])
						]
					)
					: (
						[
							...(((canUploadFiles && (data?.user_id === user?.id)) || canFullyManageEntities) ?
								[
									<MenuItem
										onClick={handleEdit(data)}
										className={classes.fileControlItem}
										key="menu-item-upload-file"
									>
										<SvgIcon
											color="secondary"
											className={classes.fileControlIcon}>
											<EditIcon />
										</SvgIcon>
										Edytuj
									</MenuItem>,
									<li key="menu-item-upload-file-border" className={classes.fileControlItem}>
										<Box className={classes.borderStyle}></Box>
									</li>
								] : []
							),
							...([
								<MenuItem
									onClick={() => copyToClipboard(data)}
									className={classes.fileControlItem}
									key="menu-item-copy-to-clipboard-file-url"
								>
									<SvgIcon
										color="secondary"
										viewBox="0 0 22 22"
										className={classes.fileControlIcon}
									>
										<RedLink />
									</SvgIcon>
									Skopiuj link
								</MenuItem>,
								<li key="menu-item-copy-to-clipboard-border" className={classes.fileControlItem}>
									<Box className={classes.borderStyle}></Box>
								</li>,
								<MenuItem
									onClick={() => handleDownload(data)}
									className={classes.fileControlItem}
									key="menu-item-download-file"
								>
									<SvgIcon
										color="secondary"
										viewBox="0 0 22 22"
										className={classes.fileControlIcon}
									>
										<DownloadRedIcon />
									</SvgIcon>
									Pobierz
								</MenuItem>
							]),
						]
					)
				}

				{(canDeleteAllFiles || (canDeleteOwnFiles && user?.id === data?.user_id) || canFullyManageEntities) &&
					[
						<li key="menu-item-delete-border" className={classes.fileControlItem}>
							<Box className={classes.borderStyle}></Box>
						</li>,
						<MenuItem
							key="menu-item-delete-folder-and-file"
							onClick={() => handleDelete(data)}
							className={classes.fileControlItem}
						>
							<SvgIcon
								color="secondary"
								className={classes.fileControlIcon}>
								<TrashIcon />
							</SvgIcon>
							Usuń
						</MenuItem>
					]
				}
			</Menu>
		</Box>
	);
};

FileView.propTypes = {
	data: PropTypes.object,
	handleContextMenu: PropTypes.func
};

export default FileView;