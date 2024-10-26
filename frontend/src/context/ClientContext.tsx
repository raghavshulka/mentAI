import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClientContextType {
    clientId: number | null;
    setClientId: (id: number) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [clientId, setClientId] = useState<number | null>(null);

    return (
        <ClientContext.Provider value={{ clientId, setClientId }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = (): ClientContextType => {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useClientContext must be used within a ClientProvider');
    }
    return context;
};
