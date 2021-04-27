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
import Axios from 'axios';
import config from '../../../shared/config';
import {
    REQUEST_ALL_TENANTS,
    RECEIVE_ALL_TENANTS,
    RECEIVE_TENANT_CATEGORIES,
    RECEIVE_ADD_TENANT,
    RECEIVE_EDIT_TENANT,
    RECEIVE_DELETE_TENANT,
 } from '../actionTypes';
import {
    closeModal,
    errorModal,
 } from '../../modals/actions';

Axios.defaults.baseURL = config.api.base_url;

export const requestAllTenants = () => {
    return {
        type: REQUEST_ALL_TENANTS,
    };
};

export const receiveAllTenants = tenants => {
    return {
        type: RECEIVE_ALL_TENANTS,
        tenants,
    };
};

export const receiveTenantCategories = categories => {
    return {
        type: RECEIVE_TENANT_CATEGORIES,
        categories,
    };
};

export const addTenantFinished = (tenant) => {
    return {
        type: RECEIVE_ADD_TENANT,
        tenant,
    };
};

export const editTenantFinished = (tenant) => {
    return {
        type: RECEIVE_EDIT_TENANT,
        tenant,
    };
};

export const deleteTenantFinished = (tenant) => {
    return {
        type: RECEIVE_DELETE_TENANT,
        tenant,
    };
};

export const fetchTenants = () => {
    return function(dispatch) {
        const url = '/tenants';
        const instance = createAxiosInstance();

        instance.get(url)
            .then(response => {
                dispatch(receiveAllTenants(response.data))
            }, error => console.error(error));
    };
};

export const fetchTenantCategories = () => {
    return function(dispatch) {
        const url = '/categories';
        const instance = createAxiosInstance();

        instance.get(url)
        .then(response => {
            dispatch(receiveTenantCategories(response.data))
        }, error => console.error(error));
    };
};

export const addTenant = (tenant) => {
    return function(dispatch) {
        const url = '/tenants';
        const instance = createAxiosInstance();

        instance.post(url, tenant)
            .then(response => {
                dispatch(addTenantFinished(response.data));
            }, error => console.error(error))
            .then(() => {
                dispatch(closeModal());
            }, error => console.error(error));
    };
};

export const editTenant = (tenant) => {
    return function(dispatch) {
        const url = `/tenants/${tenant.tenant_id}`;
        const instance = createAxiosInstance();

        instance.put(url, tenant)
            .then(() => {
                dispatch(editTenantFinished(tenant));
            }, error => console.error(error))
            .then(() => {
                dispatch(closeModal());
            }, error => console.error(error));
    }
};

export const deleteTenant = (tenant) => {
    return function(dispatch) {
        const url = `/tenants/${tenant.tenant_id}`;
        const instance = createAxiosInstance();

        dispatch(closeModal());

        instance.delete(url, { data: tenant })
            .then(response => {
                const deletedTenant = response.data;
                if (deletedTenant && deletedTenant.tenant_id) {
                    dispatch(deleteTenantFinished(deletedTenant));
                } else {
                    dispatch(errorModal("The tenant was not deleted."));
                }
            }, error => console.error(error))
            .then(() => {
            }, error => console.error(error));
    };
};

function createAxiosInstance () {
    const token = sessionStorage.getItem('idToken');

        const instance = Axios.create({
            headers: {'Authorization': `Bearer ${token}`},
        });

        return instance;
}
