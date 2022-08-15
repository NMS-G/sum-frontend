import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import API from 'apis/API';

const UnitsContext = React.createContext(null);

export const Provider = ({ children }) => {

	const [parentUnits, setParentUnits] = useState([]);

	useEffect(() => {
		API.units.parentUnits().then(res => {
			setParentUnits(res.data?.data || []);
		});
	}, []);

	const value = {
		parentUnits
	};

	return (
		<UnitsContext.Provider value={value}>
			{children}
		</UnitsContext.Provider>
	);
};

export const UnitsContextProvider = withRouter(Provider);

export default UnitsContext;
