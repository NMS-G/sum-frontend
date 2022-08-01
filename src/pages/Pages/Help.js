import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Box } from '@material-ui/core';

import API from 'apis/API';
import Header from 'components/Main/Header';
import Breadcrumbs from 'components/Buttons/Breadcrumbs';

const useStyles = makeStyles(theme => ({
	section: {
		border: '1px solid #B4B4B4',
		background: theme.palette.white,
		padding: theme.spacing(4, 4, 4, 4),
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2)
		},
	},
	content: {
		fontFamily: 'Open Sans'
	}
}));

const Help = () => {
	const id = 5; // id of help page.
	const classes = useStyles();
	const [breadcrumbs, setBreadcrumbs] = useState([
		{ title: '', to: '' },
	]);

	const [helmet, setHelmet] = useState(null);

	const [data, setData] = useState({
		id: '',
		slug: '',
		title: '',
		content: '',
	});

	useEffect(() => {
		API.pages.get(id).then(res => {
			setData({ ...data, ...res.data.page });
			setBreadcrumbs(prev => {
				prev[0].title = res.data.page.title;
				return [...prev];
			});
		});
		setHelmet(
			<Helmet>
				<script>
					{`
					setTimeout(() => {
						$('a').each(function () {
							if ($(this).attr('href').indexOf('${process.env.REACT_APP_API_ENDPOINT_URI}') !== -1) {
							  const href = $(this).attr('href');
							  const filename = href.slice(href.indexOf('/filename') + 10);
							  const url = href.slice(0, href.indexOf('/filename'));
	
							  $(this).bind('click', function (e) {
								e.preventDefault();
								$.ajax({
								  url,
								  headers: {
									Authorization: '${'Bearer ' + JSON.parse(localStorage.getItem('access_token')) || ''}'
								  },cache: false,
								  xhr: function () {
									  var xhr = new XMLHttpRequest();
									  xhr.onreadystatechange = function () {
										  if (xhr.readyState == 2) {
											  if (xhr.status == 200) {
												  xhr.responseType = "blob";
											  } else {
												  xhr.responseType = "text";
											  }
										  }
									  };
									  return xhr;
								  },
								  success: function (data) {
									  //Convert the Byte Data to BLOB object.
									  var blob = new Blob([data], { type: "application/octetstream" });
				   
									  //Check the Browser type and download the File.
									  var isIE = false || !!document.documentMode;
									  if (isIE) {
										  window.navigator.msSaveBlob(blob, filename);
									  } else {
										  var url = window.URL || window.webkitURL;
										  link = url.createObjectURL(blob);
										  var a = $("<a />");
										  a.attr("download", filename);
										  a.attr("href", link);
										  $("body").append(a);
										  a[0].click();
										  $("body").remove(a);
									  }
								  }
								});
							  });
							}
						  });
					}, 500);
					`}
				</script>
			</Helmet>
		);
	}, []);

	return (
		<div className={classes.root}>
			<Header title={data.title} />
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<Box className={classes.section}>
				<div dangerouslySetInnerHTML={{ __html: data.content }} className={classes.content} />
			</Box>
			
			{helmet}
		</div>
	);
};

export default Help;
