import React, { useEffect, useState, useContext } from 'react';
import { Box, makeStyles, SvgIcon } from '@material-ui/core';
import Tooltip from './Tooltip';
import { FolderTree } from 'assets/svg';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from 'prop-types';
import { PlusIconButton, EditIconButton, DeleteIconButton } from 'components/Buttons/IconButtons';
import FormModal from 'pages/Folders/FormModal';
import FolderContext from 'context/FolderContext';
import AuthContext from 'context/AuthContext';
import _ from 'lodash';
import useCheckPermissions from 'utils/useCheckPermissions';

const CustomTreeView = props => {
	const { folderId, expanded, setExpanded } = useContext(FolderContext);
	const { user } = useContext(AuthContext);

	const classes = useStyles();
	const { data, collapseIcon, expandIcon, handleDelete, handleClickTreeItem } = props;
	const [visibleNodeId, setVisibleNodeId] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [fid, setFid] = useState(null);
	const [isCreate, setIsCreate] = useState(true);
	const [selected, setSelected] = useState([]);

	const canCreateFolders = useCheckPermissions('can_create_folders', true);
	const canDeleteAllFiles = useCheckPermissions('can_delete_all_files', true);
	const canDeleteOwnFiles = useCheckPermissions('can_delete_own_files', true);
	const canFullyManageEntities = useCheckPermissions('can_fully_manage_entities', true);

	const handleClick = (nodeId, isCreate) => e => {
		e.stopPropagation();
		setFid(nodeId);
		setModalVisible(true);
		setIsCreate(isCreate);
	};

	useEffect(() => {
		setSelected([folderId?.toString()]);
	}, [folderId]);

	const handleClickItem = (nodeId, data) => (e) => {
		e.preventDefault();
		setFid(nodeId);
		handleClickTreeItem(data);

		const prevExpanded = [...expanded];
		const exIndex = prevExpanded.findIndex(item => item === nodeId);

		if (exIndex !== -1) {
			prevExpanded.splice(exIndex, 1);
		} else {
			prevExpanded.push(nodeId);
		}
		setExpanded(_.uniq(prevExpanded));
	};

	const TreeRender = (data, filePath) => {
		let path = !filePath ? data.name : `${filePath}/${data.name}`;

		const nodeId = data.id.toString();

		return (
			<TreeItem
				key={path}
				nodeId={nodeId}
				onClick={handleClickItem(nodeId, data)}
				label={
					<Box
						className={classes.box}
						onMouseOver={() => setVisibleNodeId(nodeId)}
						onMouseLeave={() => setVisibleNodeId(null)}
						style={{ margin: 3 }}
					>
						<Tooltip
							title={data.name}
							placement="top"
							classes={{ tooltip: classes.tooltip }}
						>
							<Box className={classes.folderName}>
								<SvgIcon viewBox="0 0 23 21" className={classes.folderIcon}><FolderTree /></SvgIcon>{data.name}
							</Box>
						</Tooltip>
						{visibleNodeId === nodeId &&
							<Box>
								{(canCreateFolders && (data?.user_id === user?.id) || canFullyManageEntities || (canCreateFolders && !data?.read_only && _.has(data, 'read_only'))) &&
									<>
										<PlusIconButton onClick={handleClick(nodeId, true)} alt="Ikona dodawania subfolderu" />
										<EditIconButton tooltip="Edytuj" onClick={handleClick(nodeId, false)} />
									</>
								}

								{(canDeleteAllFiles || (canDeleteOwnFiles && user?.id === data?.user_id) || canFullyManageEntities) &&
									<DeleteIconButton tooltip="Usuń" onClick={() => handleDelete(nodeId)} />
								}
							</Box>
						}
					</Box>
				}
			>
				{data?.children?.map((node) => TreeRender(node, path))}
			</TreeItem>
		);
	};

	return (
		<>
			<TreeView
				style={{ marginTop: '5px' }}
				defaultCollapseIcon={collapseIcon}
				defaultExpandIcon={expandIcon}
				expanded={expanded}
				selected={selected}
			>
				{data?.map(item => TreeRender(item))}
			</TreeView>

			<FormModal
				isCreate={isCreate}
				fId={fid}
				openModal={modalVisible}
				handleClose={() => setModalVisible(false)}
			/>
		</>
	);
};

const useStyles = makeStyles(() => ({
	folderIcon: {
		marginRight: 10,
		marginLeft: 5,
		float: 'left'
	},
	tooltip: {
		marginBottom: 0,
		background: '#17253FE5',
		borderRadius: 0,
		fontSize: 12
	},
	folderName: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		flex: '1 1'
	},
	box: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 33
	}
}));

CustomTreeView.propTypes = {
	data: PropTypes.array,
	collapseIcon: PropTypes.element,
	expandIcon: PropTypes.element,
	handleClickTreeItem: PropTypes.func,
	handleDelete: PropTypes.func
};

export default CustomTreeView;
