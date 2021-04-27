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
    REQUEST_ALL_USERS,
    RECEIVE_ALL_USERS,
    REQUEST_ADD_USER,
    RECEIVE_ADD_USER,
    REQUEST_EDIT_USER,
    RECEIVE_EDIT_USER,
    REQUEST_DELETE_USER,
    RECEIVE_DELETE_USER,
} from '../actionTypes';

const initialState = {
    users: [],
    userCount: 0,
}

function addUser(users, user) {
    const usersCopy = users.slice();
    usersCopy.push(user);

    return usersCopy;
}

function updateUser(users, updatedUser) {
    const usersCopy = users.slice();
    return usersCopy.map(user => user.username === updatedUser.username ?  updatedUser : user);
}

function deleteUser(users, deletedUser) {
    const usersCopy = users.slice();
    return usersCopy.filter(user => user.username !== deletedUser.username);
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ALL_USERS:
            return null;
        case RECEIVE_ALL_USERS:
            return {
                ...state,
                users: action.users,
                userCount: action.users.length,
            }
        case REQUEST_ADD_USER:
                return null;
        case RECEIVE_ADD_USER: 
            const usersWithAdd = addUser(state.users, action.user);

            return {
                ...state,
                users: usersWithAdd,
                userCount: usersWithAdd.length,
            }
        case REQUEST_EDIT_USER:
                return null;
        case RECEIVE_EDIT_USER: 
            const usersWithUpdate = updateUser(state.users, action.user);

            return {
                ...state,
                users: usersWithUpdate,
                userCount: usersWithUpdate.length,
            }
        case REQUEST_DELETE_USER:
                return null;
        case RECEIVE_DELETE_USER: 
            const usersWithDelete = deleteUser(state.users, action.user);

            return {
                ...state,
                users: usersWithDelete,
                userCount: usersWithDelete.length,
            }
        default:
            return state;
    }    
};
