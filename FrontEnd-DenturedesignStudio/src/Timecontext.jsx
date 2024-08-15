import React, { createContext, useContext, useState } from "react";

const TimeContext = createContext();

export const useTime = () => useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [watchVideoTime, setWatchVideoTime] = useState(0);

  return (
    <TimeContext.Provider value={{ watchVideoTime, setWatchVideoTime }}>
      {children}
    </TimeContext.Provider>
  );
};
