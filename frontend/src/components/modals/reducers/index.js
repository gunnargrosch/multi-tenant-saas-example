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
    SET_CURRENT_MODAL,
    CLOSE_MODAL,
    ERROR_MODAL,
    EDIT_PRODUCT_MODAL,
    DELETE_PRODUCT_MODAL,
    EDIT_USER_MODAL,
    DELETE_USER_MODAL,
    EDIT_TENANT_MODAL,
    DELETE_TENANT_MODAL,
} from '../actionTypes';

const initialState = {
    currentModal: null,
    params: null,
}

export const modal = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_MODAL:
            switch(action.currentModal) {
                case EDIT_PRODUCT_MODAL:
                    return {
                        ...state,
                        currentModal: EDIT_PRODUCT_MODAL,
                        product: action.product,
                    };
                case DELETE_PRODUCT_MODAL:
                        return {
                            ...state,
                            currentModal: DELETE_PRODUCT_MODAL,
                            product: action.product,
                    };
                case EDIT_USER_MODAL:
                    return {
                        ...state,
                        currentModal: EDIT_USER_MODAL,
                        user: action.user,
                    };
                case DELETE_USER_MODAL:
                        return {
                            ...state,
                            currentModal: DELETE_USER_MODAL,
                            user: action.user,
                    };
                    case EDIT_TENANT_MODAL:
                      return {
                          ...state,
                          currentModal: EDIT_TENANT_MODAL,
                          tenant: action.tenant,
                      };
                  case DELETE_TENANT_MODAL:
                          return {
                              ...state,
                              currentModal: DELETE_TENANT_MODAL,
                              tenant: action.tenant,
                      };
                case ERROR_MODAL:
                    return {
                        ...state,
                        currentModal: ERROR_MODAL,
                        error: action.error,
                    }
                default: 
                    return {
                        ...state,
                        currentModal: action.currentModal,
                    };
                }
        case CLOSE_MODAL: 
            return {
                ...state,
                currentModal: null,
            };
        default:
            return state;
    };    
};
