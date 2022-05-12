import {
  createContext,
} from "react";
// import { useCookies } from "react-cookie";

// import axios from "../services/axiosConfig.js";

// import { AddCountry} from "../services/Auth";
// import { ListCountry } from "../services/Create";
import { ListCountry, addTravel, addTransport, addProvince, addTerminal } from "../services/Create";


export const AppContext = createContext({});

export function AppProvider({ children }) {


  return (
    <AppContext.Provider
      value={{ ListCountry, addTravel, addTransport ,addProvince, addTerminal }}
    >
      {children}
    </AppContext.Provider>

  );
}