import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Typography from 'components/Main/Typography';

import ExportButton from './ExportButton';
import PdfContent from './PdfContent';
import Excel from './Excel';

const useStyles = makeStyles(() => ({
	hidden: {
		display: 'none',
	},
}));

const ExportButtons = props => {
	const {
		filename = 'List',
		title = 'Pobierz listę jako:',
		endpoint
	} = props;
	const classes = useStyles();
	const pdfButtonRef = useRef();
	const csvButtonRef = useRef();
	const xlsxButtonRef = useRef();
	const [exportingData, setExportingData] = useState([]);
	const [exportingRef, setExportingRef] = useState(null);
	const [pdfElement, setPdfElement] = useState([]);

	useEffect(() => {
		if (!exportingRef) return;
		setPdfElement([<PdfContent
			key="pdfElement"
			data={exportingData}
			title={filename}
		/>]);

		setTimeout(() => {
			exportingRef.current.click();
			setExportingRef(null);
			setPdfElement([]);
		}, 100);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exportingData]);

	const handleClick = ref => () => {
		setExportingRef(ref);
		endpoint().then(res => {
			setExportingData(res.data?.data || []);
		});
	};

	return (
		<Box display={window.isMobile ? 'block' : 'flex'} alignItems="center" mt={4}>
			<Typography variant="bodyS" style={{ marginRight: 10 }}>{title}</Typography>

			<ExportButton onClick={handleClick(pdfButtonRef)}>pdf</ExportButton>
			<ExportButton onClick={handleClick(csvButtonRef)}>csv</ExportButton>
			<ExportButton onClick={handleClick(xlsxButtonRef)}>xlsx</ExportButton>

			<PDFDownloadLink
				document={pdfElement}
				fileName={`${filename}.pdf`}
			>
				<button ref={pdfButtonRef} className={classes.hidden}>pdf</button>
			</PDFDownloadLink>

			<CSVLink
				data={exportingData}
				filename={filename}
				asyncOnClick={true}
			>
				<button ref={csvButtonRef} className={classes.hidden}></button>
			</CSVLink>
			<Excel
				filename={filename}
				data={exportingData}
				ref={xlsxButtonRef}
			/>
		</Box>
	);
};

export default ExportButtons;
