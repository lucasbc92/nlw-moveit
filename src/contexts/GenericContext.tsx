import { createContext, ReactNode } from "react";

interface GenericContextData {

}

interface GenericProviderProps {
    children: ReactNode;
}

export const GenericContext = createContext({} as GenericContextData);

export function GenericProvider({children}: GenericProviderProps) {
    return (
        <GenericContext.Provider value={{
            
        }}>
            {children}
        </GenericContext.Provider>
    )
}