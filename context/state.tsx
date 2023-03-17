import { createContext, useContext, useEffect, useState } from "react";
import { IColor } from "../public/common";

const AppContext = createContext(null);

export function AppWrapper({children}) {
  const [colorCache, setColorCache] = useState([]);

  function cacheColors(colors: IColor[]) {
    useEffect(() => {
      setColorCache(colors);
    }, []);
  }

  return (
    <AppContext.Provider value = {
      {
        colorCache,
        cacheColors,
      }
    }>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}