/*
A portion of the original code was written in TypeScript by Simon Grimm from  https://galaxies.dev/react-native-login-jwt-auth
YouTube video: https://www.youtube.com/watch?v=9vydY9SDtAo&t=1329s&ab_channel=SimonGrimm
*/

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

export const API_URL = 'http://34.205.33.41:3010';
const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
        user: null,
    });

    useEffect(() => {
        const loadTokenAndUser = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log('Stored Token:', token);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                    user: JSON.parse(await SecureStore.getItemAsync(USER_KEY)) || null,
                });
            }
        };
        loadTokenAndUser();
    }, []);

    const login = async (email, password) => {
        try {
            const result = await axios.post(`${API_URL}/signin`, { email, password });

            console.log("AuthContext", result.data.user);
            
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(result.data.user));

            setAuthState({
                token: result.data.token,
                authenticated: true,
                user: result.data.user,
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            return result;
        } catch (error) {
            return { error: true, msg: error.response.data.msg };
        }
    };

    const register = async (email, password) => {
        try {
            return await axios.post(`${API_URL}/signup`, { email, password });
        } catch (error) {
            return { error: true, msg: error.response.data.msg };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
            user: null,
        });
    };

    const performTopUp = async (amount) => {
    try {
        const result = await axios.post(`${API_URL}/topup`, { amount },
            {
                headers: {
                    Authorization: `Bearer ${authState.token}`
                }
            }
        );
        console.log("auth data: ", result.data.user.balance);
        setAuthState(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                balance: result.data.user.balance
            }
        }));
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify({ ...authState.user, balance: result.data.user.balance }));
        
        return result.data;
    } catch (error) {
        console.log(error);
        return { error: true, msg: error.response.data.msg };
    }
};

const updatePurchaseHistory = async () => {
    try {
        const result = await axios.post(`${API_URL}/viewCart`, {
            headers: {
                Authorization: `Bearer ${authState.token}` 
            }
        });

        setAuthState(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                purchases: result.data.user.purchases
            }
        }));

        await SecureStore.setItemAsync(USER_KEY, JSON.stringify({ ...authState.user, purchases: result.data.user.purchases }));

        return result.data;
    } catch (error) {
        console.log(error);
        return { error: true, msg: error.response.data.msg };
    }
};

const updateBalance = async () => {
    try {
        const result = await axios.post(`${API_URL}/updateBalance`, {
            headers: {
                Authorization: `Bearer ${authState.token}` 
            }
        });

        setAuthState(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                balance: result.data.user.balance
            }
        }));

        await SecureStore.setItemAsync(USER_KEY, JSON.stringify({ ...authState.user, balance: result.data.user.balance }));

        return result.data;
    } catch (error) {
        console.log(error);
        return { error: true, msg: error.response.data.msg };
    }
};

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        setUser: setAuthState,
        performTopUp,
        updatePurchaseHistory,
        updateBalance,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};