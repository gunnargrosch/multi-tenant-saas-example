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
import Axios from "axios";
import { Auth } from "aws-amplify";
import jwt from "jsonwebtoken";
import config from "../../../shared/config";
import {
  RECEIVE_AUTHENTICATE_USER,
  RECEIVE_REGISTER_USER,
} from "../actionTypes";
import { closeModal } from "../../modals/actions";

Axios.defaults.baseURL = config.cognito.base_url;

const registerUserFinished = (user) => {
  return {
    type: RECEIVE_REGISTER_USER,
    user,
  };
};

const receiveUserAuthentication = (user) => {
  return {
    type: RECEIVE_AUTHENTICATE_USER,
    user,
  };
};

export const authenticateUser = (userChallenge) => {
  return async function (dispatch) {  
    try {
      await Auth.signIn(userChallenge);
      Auth.currentSession()
      .then(
        data => {
          const idToken = data.idToken.jwtToken;
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("idToken", idToken);
          const decoded = jwt.decode(idToken);
          const user = {
            firstName: decoded.given_name,
            lastName: decoded.family_name,
            email: decoded.email,
            company: decoded['custom:company_name'],
            tenantId: decoded['custom:tenant_id'],
            role: decoded['custom:role'],
            idToken,
            isAuthenticated: true,
          };
          sessionStorage.setItem("name", user.firstName + ' ' + user.lastName);
          sessionStorage.setItem("tenant_id", user.tenantId);
          dispatch(receiveUserAuthentication(user));
        }
      )
      .catch(err => console.log(err));
    } catch (e) {
      alert(e.message);
    }
    dispatch(closeModal());
  }
};

export const registerUser = (user) => {
  return function (dispatch) {
    const url = "/register";

    Axios.post(url, user)
      .then(
        (response) => {
          dispatch(registerUserFinished(response.data));
        },
        (error) => console.error(error)
      )
      .then(
        () => {
          dispatch(closeModal());
        },
        (error) => console.error(error)
      );
  };
};

export const signOutUser = () => {
  return async function (dispatch) {
    const user = {
      isAuthenticated: false,
    };
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("tenant_id");
    try {
      await Auth.signOut();
    } catch (e) {
      alert(e.message);
    }
    dispatch(receiveUserAuthentication(user));
  };
};
