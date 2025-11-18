import { getCookie } from "@/services/auth/tokenHandler";

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';

const serverFetchHelper = async (endpoint: string, options: RequestInit):Promise<Response> => {
  
    const {headers, ...restOptions} = options;
    
    const accessToken = await getCookie('accessToken');

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            ...headers,
            // ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
            // ...(accessToken ? { 'Authorization': accessToken } : {})
            Cookie : accessToken ? `accessToken=${accessToken}` : ''
        },
        ...restOptions
    });
    return response;
}


export const serverFetch ={
    get:async (endpoint: string, options: RequestInit = {}) => {
        return serverFetchHelper(endpoint, {
            method: 'GET',
            ...options
        });
    },
    post: async (endpoint: string, options: RequestInit = {}) => {
        return serverFetchHelper(endpoint, {
            method: 'POST',
            ...options
        });
    },
    put: async (endpoint: string, options: RequestInit = {}) => {
        return serverFetchHelper(endpoint, {
            method: 'PUT',
            ...options
        });
    },
    // patch: async (endpoint: string, options: RequestInit = {}) => {
    //     return serverFetchHelper(endpoint, { method: 'PATCH',...options});
    // },
    delete: async (endpoint: string, options: RequestInit = {}) => {
        return serverFetchHelper(endpoint, {
            method: 'DELETE',
            ...options
        });
    }
        
}


/**
 * 
 * serverFetch.get('/api/some-endpoint')
 * serverFetch.post("/auth/login", { body: JSON.stringify({username, password}) })
 */