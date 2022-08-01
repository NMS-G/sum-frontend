import React from 'react';
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
	tr: {
		flexDirection: 'row',
	},
	td: {
		fontSize: 12,
		borderBottom: 0.5,
		padding: 3,
	},
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	header: {
		fontSize: 16,
		marginBottom: 10,
		textAlign: 'left',
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'grey',
	},
});

const PdfContent = ({ data, title }) => {
	return (
		<Document>
			<Page style={styles.body}>
				<Text style={styles.header}>
					{title}
				</Text>

				<View>
					<View style={styles.tr}>
						{data[0] && Object.keys(data[0]).map((key) => (
							<Text style={{ ...styles.td, width: `${key === 'LP.' ? '11%' : '40%'}` }} key={key}>{key}</Text>
						))}
					</View>

					{data.map((item, i) => (
						<View style={styles.tr} key={i}>
							{Object.keys(item).map((key) => (
								<Text style={{ ...styles.td, width: `${key === 'LP.' ? '11%' : '40%'}` }} key={key}>{item[key]}</Text>
							))}
						</View>
					))}
				</View>

				<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
					`${pageNumber} / ${totalPages}`
				)} fixed />
			</Page>
		</Document>
	);
};

export default PdfContent;
