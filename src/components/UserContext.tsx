import { createContext, useContext } from 'react';

export type UserRole = 'ADMIN' | 'USER';

export interface UserContextValue {
    role: UserRole;
}

export const UserContext = createContext<UserContextValue | null>(null);

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error('useUser must be used inside UserContext.Provider');
    }
    return ctx;
};
