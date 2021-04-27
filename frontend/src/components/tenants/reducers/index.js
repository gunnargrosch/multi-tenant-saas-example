// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so.
// //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
import {
    REQUEST_ALL_TENANTS,
    RECEIVE_ALL_TENANTS,
    REQUEST_ADD_TENANT,
    RECEIVE_ADD_TENANT,
    REQUEST_EDIT_TENANT,
    RECEIVE_EDIT_TENANT,
    REQUEST_DELETE_TENANT,
    RECEIVE_DELETE_TENANT,
    REQUEST_TENANT_CATEGORIES,
    RECEIVE_TENANT_CATEGORIES,
} from '../actionTypes';

const initialState = {
    tenants: [],
    tenantCount: 0,
    categories: [],
}

function addTenant(tenants, tenant) {
    const tenantsCopy = tenants.slice();
    tenantsCopy.push(tenant);
    
    return tenantsCopy;
}

function updateTenant(tenants, updatedTenant) {
    const tenantsCopy = tenants.slice();
    return tenantsCopy.map(tenant => tenant.tenant_id === updatedTenant.tenant_id ?  updatedTenant : tenant);
}

function deleteTenant(tenants, deletedTenant) {
    const tenantsCopy = tenants.slice();
    return tenantsCopy.filter(tenant => tenant.tenant_id !== deletedTenant.tenant_id);
}

export const tenants = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TENANT_CATEGORIES:
            return null;
        case RECEIVE_TENANT_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }
        case REQUEST_ALL_TENANTS:
            return null;
        case RECEIVE_ALL_TENANTS:
            return {
                ...state,
                tenants: action.tenants,
                tenantCount: action.tenants.length,
            }
        case REQUEST_ADD_TENANT:
                return null;
        case RECEIVE_ADD_TENANT: 
            const tenantsWithAdd = addTenant(state.tenants, action.tenant);

            return {
                ...state,
                tenants: tenantsWithAdd,
                tenantCount: tenantsWithAdd.length,
            }
        case REQUEST_EDIT_TENANT:
                return null;
        case RECEIVE_EDIT_TENANT: 
            const tenantsWithUpdate = updateTenant(state.tenants, action.tenant);

            return {
                ...state,
                tenants: tenantsWithUpdate,
                tenantCount: tenantsWithUpdate.length,
            }
        case REQUEST_DELETE_TENANT:
                return null;
        case RECEIVE_DELETE_TENANT: 
            const tenantsWithDelete = deleteTenant(state.tenants, action.tenant);

            return {
                ...state,
                tenants: tenantsWithDelete,
                tenantCount: tenantsWithDelete.length,
            }
        default:
            return state;
    }    
};
