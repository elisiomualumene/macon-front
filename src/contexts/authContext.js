/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  createContext,
  useState,
  useEffect,
  useRef
} from "react";
// import { useCookies } from "react-cookie";

import Cookies from 'universal-cookie';

import { toast } from 'react-toastify';

import api from "services/axiosConfig";
import { isUserAuthenticated, auth, logout, AddCountry } from "../services/Auth";

const APP_COOKIE_USER = process.env.REACT_APP_COOKIE_USER;
const APP_COOKIE_TOKEN = process.env.REACT_APP_COOKIE_TOKEN;

export const AuthContext = createContext({});

const cookies = new Cookies();

export function AuthProvider({ children }) {
 // const Navigate = useNavigate()
  const toastAuthId = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    setIsLoading(true);

    try {
      const request = await isUserAuthenticated();
      setIsAuthenticated(request);
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateUser = async (username, password) => {
    const closeTime = 2000;
    const delay = 1000;
    const cookieExpiresTime = 60 * 60 * 24; // 60 seconds x 60 minutes x 24 hours

    toastAuthId.current = toast.loading(`Autenticando ${username}...`, {
      closeButton: false,
    });

    try {
      const data  =  await auth(username, password);
      console.log("dados:", data);
      const success = data.data.success;
      const token = data.data.token

      toast.update(toastAuthId.current, {
        render: "message",
        type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        autoClose: closeTime,
        isLoading: false,
        delay: delay,
      });

      console.log(
        "Authentication Verify Recived Info: ",
        typeof success,
        token
      );

      if (success === true && token) {
        console.log('Token Saved!', APP_COOKIE_USER, APP_COOKIE_TOKEN);

        cookies.set(APP_COOKIE_USER, token, { path: '/', maxAge: cookieExpiresTime });
        cookies.set(APP_COOKIE_TOKEN, token, { path: '/', maxAge: cookieExpiresTime });


        api.defaults.headers.common.authorization = `Bearer ${token}`;
      }

      const authTimeout = setTimeout(() => {
        setIsAuthenticated(success);
        clearTimeout(authTimeout);
      }, closeTime + delay);

    } catch (ErrorMessage) {

    console.log("ErrorMessage: ", ErrorMessage, typeof ErrorMessage, ErrorMessage.message);

      const { response } =  ErrorMessage.request;
      const { message, success } = JSON.parse(response);  

      if (typeof success === "boolean")
        toast.update(toastAuthId.current, {
          render: message,
          type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
          autoClose: 4000,
          isLoading: false,
          delay: 1000,
        });
    }
  };

  const logoutUser = () => {
    return logout()
      .then((request) => {
        cookies.remove(APP_COOKIE_USER, { path: '/' });
        cookies.remove(APP_COOKIE_TOKEN, { path: '/' });
        window.location.reload();
        return request;
      }).catch((error) => {
        console.warn('-------Logout Error: ', error);
      })
      .finally(setIsLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{ authenticateUser, logoutUser, isAuthenticated, isLoading, AddCountry}}
    >
      {children}
    </AuthContext.Provider>
  );
}
