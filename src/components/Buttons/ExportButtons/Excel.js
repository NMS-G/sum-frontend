import React from 'react';
import ExportExcel from 'js-export-xlsx';
import _ from 'lodash';

const Excel = React.forwardRef((props, ref) => {
	const { filename, data } = props;
	const header = _.keys(data[0]);
	const exportingData = _.map(data, item => _.values(item));
	
	const handleExport = () => {
		ExportExcel.outPut({
			header: header,
			data: exportingData,
			name: filename
		});
	};

	return (
		<button ref={ref} onClick={handleExport}></button>
	);
});

Excel.displayName = 'Excel';

export default Excel;
