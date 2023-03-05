import React, { createContext, useContext, useState } from "react";

interface UtilsData {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
}

const UtilsContext = createContext<UtilsData>({} as UtilsData);

interface ProviderProps {
    children: React.ReactNode;
}

export const UtilsProvider: React.FC<ProviderProps> = ({ children }) => {

    const [load, setLoad] = useState(true);

    return (
        <UtilsContext.Provider value={{ setLoading: setLoad, isLoading: load }}>
            {children}
        </UtilsContext.Provider>
    );
};

export function useUtils(){
    const context = useContext(UtilsContext);
    return context;
}