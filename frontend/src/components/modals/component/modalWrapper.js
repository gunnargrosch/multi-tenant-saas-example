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
import React from 'react';
import { connect } from 'react-redux';
import {
    SIGN_IN_MODAL,
    SIGN_UP_MODAL,
    ERROR_MODAL,
    ADD_PRODUCT_MODAL,
    DELETE_PRODUCT_MODAL,
    EDIT_PRODUCT_MODAL,
    ADD_USER_MODAL,
    DELETE_USER_MODAL,
    EDIT_USER_MODAL,
    ADD_TENANT_MODAL,
    DELETE_TENANT_MODAL,
    EDIT_TENANT_MODAL,
} from '../actionTypes';
import {
    SignInModal,
    SignUpModal,
    ErrorModal,
    AddProductModal,
    DeleteProductModal,
    EditProductModal,
    AddUserModal,
    DeleteUserModal,
    EditUserModal,
    AddTenantModal,
    DeleteTenantModal,
    EditTenantModal,
} from '../';

function ModalWrapper(props) {
    switch (props.currentModal) {
        case SIGN_IN_MODAL:
            return <SignInModal />
        case SIGN_UP_MODAL:
            return <SignUpModal />
        case ERROR_MODAL:
            return <ErrorModal />
        case ADD_PRODUCT_MODAL:
            return <AddProductModal />
        case DELETE_PRODUCT_MODAL:
            return <DeleteProductModal />
        case EDIT_PRODUCT_MODAL:
            return <EditProductModal />
        case ADD_USER_MODAL:
            return <AddUserModal />
        case DELETE_USER_MODAL:
            return <DeleteUserModal />
        case EDIT_USER_MODAL:
            return <EditUserModal />
        case ADD_TENANT_MODAL:
            return <AddTenantModal />
        case DELETE_TENANT_MODAL:
            return <DeleteTenantModal />
        case EDIT_TENANT_MODAL:
            return <EditTenantModal />
        default:
            return null;
    }
}
 
const mapStateToProps = state => {
    return {
        currentModal: state.modal.currentModal,
    };
}

export default connect(mapStateToProps)(ModalWrapper);
