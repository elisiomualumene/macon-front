/* eslint-disable no-undef */
import React from "react";
require('dotenv').config()
import styles from './App.module.scss';

import "react-toastify/dist/ReactToastify.css";



import { AuthProvider } from "./contexts/authContext";
import { AppProvider } from "./contexts/appContext";

import { Routes } from "./Routes";

function App() {
    return (
      <div className={styles.contentWrapper}>
         <AuthProvider>
            <AppProvider>
              <Routes />
            </AppProvider>
        </AuthProvider>
      </div>
    );
}
export default App;

