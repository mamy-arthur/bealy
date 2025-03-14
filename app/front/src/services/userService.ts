import { apiUrl } from "@/constants/apiContant";
import { credentialType } from "@/types/credentialType";

export const login = async (credential: credentialType) => {
    return await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
        credentials: 'include'
    });
};

export const getCurrentUser = async () => {
    return await fetch(`${apiUrl}/users/current`, {
        credentials: 'include',
    });
};

export const logoutApi = async () => {
    return await fetch(`${apiUrl}/logout`, {
        credentials: 'include'
    });
};

export const register = async (data: any) => {
    return await fetch(`${apiUrl}/register`, {
        method: 'POST',
        body: data
    });
};

export const getOtherUsers = async () => {
    return await fetch(`${apiUrl}/users/public`, {
        method: 'GET',
        credentials: 'include'
    });
};

export const updateUser = async (data: any, id: number) => {
    return await fetch(`${apiUrl}/users/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });
}

export const updateUserImage = async (data: any, id: number) => {
    return await fetch(`${apiUrl}/users/update-image/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include'
    })
};

export const getUser = async (id: number) => {
    return await fetch(`${apiUrl}/users/${id}`, {
        method: 'GET',
        credentials: 'include'
    });
}