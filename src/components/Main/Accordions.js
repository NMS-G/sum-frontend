import React from 'react';
import { makeStyles, Accordion as MuiAccordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Typography from 'components/Main/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
	accordion: {
		boxShadow: 'none',
		borderBottom: '1px solid #D0D0D0',
		'&:last-child': {
			borderBottom: 'none',
		},
		'&:before': {
			content: 'none',
		},
		'&.Mui-expanded': {
			margin: 0,
		},
		'& .MuiAccordionSummary-root': {
			minHeight: 48,
			padding: 0,
			'& .MuiAccordionSummary-content.Mui-expanded': {
				margin: '12px 0',
			},
		},
		'& .MuiAccordionDetails-root': {
			paddingInline: 0,
			display: 'block'
		},
	}
}));

export const Accordion = props => {
	const classes = useStyles();
	const { title, children, variant = 'h3', className, ...rest } = props;

	return (
		<MuiAccordion className={clsx(classes.accordion, className)} square {...rest}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant={variant}>{title}</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</MuiAccordion>
	);
};

const Accordions = props => {
	const { items, className, ...rest } = props;

	return items.map((item, index) =>
		<Accordion key={index} title={item.title} variant={item?.variant} className={className} defaultExpanded={item?.defaultExpanded || false} {...rest}>
			{item.child}
		</Accordion>
	);
};

export default Accordions;
