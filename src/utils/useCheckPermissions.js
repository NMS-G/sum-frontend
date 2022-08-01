import { useContext } from 'react';
import _ from 'lodash';
import AuthContext from 'context/AuthContext';

/**
 * Check if the user has permission.
 * 
 * @param {string|string[]} permissions required permission
 * @param {boolean|null} onlyCheck don't logout even the user doesn't have permission
 * @returns {boolean|permissions}
 */
const useCheckPermissions = (permissions, onlyCheck) => {
	const { user, logOut } = useContext(AuthContext);
	const userPermissions = (user?.permissions || []);

	let permissionsArray = _.isString(permissions) ? [permissions] : permissions;
	permissionsArray.push('can_fully_manage_entities');
	
	const includesPermissions = _.intersection(permissionsArray, userPermissions);
	
	if(includesPermissions.length > 0) {
		return includesPermissions;
	}

	if(!onlyCheck) logOut();
	return false;
};

export default useCheckPermissions;