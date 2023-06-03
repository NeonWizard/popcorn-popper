import React, { createContext, useContext } from "react";

export type ScreenShakeContextType = {
  screenShake: boolean;
  setScreenShake: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DefaultContext: ScreenShakeContextType = {
  screenShake: false,
  setScreenShake: () => {},
};

export const ScreenShakeContext =
  createContext<ScreenShakeContextType>(DefaultContext);

export const ScreenShakeContextProvider = (
  props: React.PropsWithChildren<ScreenShakeContextType>
) => {
  return (
    <ScreenShakeContext.Provider
      value={{
        screenShake: props.screenShake,
        setScreenShake: props.setScreenShake,
      }}
    >
      {props.children}
    </ScreenShakeContext.Provider>
  );
};

export const useScreenShakeContext = () => {
  return useContext(ScreenShakeContext);
};
