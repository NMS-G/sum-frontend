import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import _ from 'lodash';

import API from 'apis/API';
import Typography from 'components/Main/Typography';
import { ChevronRight, ExpandMore } from '@material-ui/icons';

const AssignedTask = ({ assignedTasks, onChange }) => {
	const [data, setData] = useState({
		id: 'research_task',
		title: 'Zadania badawcze',
		children: []
	});
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		API.researchTasks.all().then(res => {
			setData(prev => ({ ...prev, children: res.data.data }));
		});
	}, []);

	useEffect(() => setSelected(assignedTasks), [assignedTasks]);

	useEffect(() => {
		if(_.isEqual(selected, assignedTasks)) return;
		onChange(_.without(selected, 'research_task'));
	}, [selected]);

	function handleChange(checked, nodes) {
		let allNode = [nodes.id];

		if (nodes?.children) {
			allNode = [data.id, ..._.map(nodes?.children || [], 'id')];
		}

		let array = checked
			? [...selected, ...allNode]
			: selected.filter(value => !allNode.includes(value));
		setSelected(_.uniq(array));
	}

	const renderTree = nodes => {
		return (
			<TreeItem
				key={nodes.id}
				nodeId={nodes.id.toString()}
				label={
					<FormControlLabel
						control={
							<Checkbox
								checked={_.includes(selected, +nodes.id)}
								onChange={e =>
									handleChange(e.currentTarget.checked, nodes)
								}
								onClick={e => e.stopPropagation()}
							/>
						}
						label={<>{nodes.acronym ? `${nodes.acronym} - ${nodes.title}` : nodes.title}</>}
						key={nodes.id}
					/>
				}
			>
				{_.isArray(nodes.children) ? nodes.children.map(renderTree) : null}
			</TreeItem>
		);
	};

	return (
		<Grid container>
			<Grid item sm={4} xs={12}>
				<Typography>Przypisane elementy</Typography>
			</Grid>
			<Grid item sm={8} xs={12}>
				<TreeView
					defaultCollapseIcon={<ExpandMore />}
					defaultExpandIcon={<ChevronRight />}
					defaultExpanded={['research_task']}
				>
					{renderTree(data)}
				</TreeView>
			</Grid>
		</Grid>
	);
};

export default AssignedTask;