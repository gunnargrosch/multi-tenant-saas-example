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
    RECEIVE_ALL_USERS,
    RECEIVE_ADD_USER,
    RECEIVE_EDIT_USER,
    RECEIVE_DELETE_USER,
} from '../actionTypes';
import {
    closeModal,
    errorModal,
 } from '../../modals/actions';

Axios.defaults.baseURL = config.api.base_url;

export const addUserFinished = (user) => {
    return {
        type: RECEIVE_ADD_USER,
        user,
    };
};

export const editUserFinished = (user) => {
    return {
        type: RECEIVE_EDIT_USER,
        user,
    };
};

export const deleteUserFinished = (user) => {
    return {
        type: RECEIVE_DELETE_USER,
        user,
    };
};

export const receiveAllUsers = users => {
    return {
        type: RECEIVE_ALL_USERS,
        users,
    };
};

export const fetchUsers = () => {
    return function(dispatch) {
        const url = '/users';
    
        const instance = createAxiosInstance();

        instance.get(url)
            .then(response => {
                dispatch(receiveAllUsers(response.data))
            }, error => console.error(error));
    };
};

export const addUser = (user) => {
    return function(dispatch) {
        const url = '/users';
        const instance = createAxiosInstance();
        
        dispatch(closeModal());

        instance.post(url, user)
            .then(response => {
                dispatch(addUserFinished(response.data));
            })
            .catch(error => {
                const errorText = `The user was not added. (${error.message})`;

                dispatch(errorModal(errorText));
            });
    };
};

export const editUser = (user) => {
    return function(dispatch) {
        const url = `/users/${user.username}`;
        const instance = createAxiosInstance();

        instance.put(url, user)
            .then(response => {
                dispatch(editUserFinished(response.data));
            }, error => console.error(error))
            .then(() => {
                dispatch(closeModal());
            }, error => console.error(error));
    }
};

export const deleteUser = (user) => {
    return function(dispatch) {
        const url = `/users/${user.username}`;
        const instance = createAxiosInstance();

        instance.delete(url, { data: user })
            .then(response => {
                dispatch(deleteUserFinished(user));
            }, error => console.error(error))
            .then(() => {
                dispatch(closeModal());
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
