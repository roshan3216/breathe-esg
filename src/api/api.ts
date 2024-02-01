import axios, { AxiosHeaders } from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:9000/internal",
    baseURL : 'https://breathe-esg-backend.onrender.com/internal',
    withCredentials: true,
});

type FormData = {
    email: String,
    password: String,
    confirmPassword?: String,
}

export const registerUser = async (formData: FormData) =>{
    return api.post('/signup', formData);

}

export const loginUser = async (formData: FormData) =>{
    return api.post('/signin',formData);

}

export const logoutUser = async () =>{
    const headers: AxiosHeaders = new AxiosHeaders();
    const token = 'Bearer ' + localStorage.getItem('accessToken')?.trim()?.replace(/"/g, '')    ;
    headers.set('Authorization', token);
    return api.get('/logout',{headers: headers});
}

export const getDataEntryData = async () =>{
    const headers: AxiosHeaders = new AxiosHeaders();
    const token = 'Bearer ' + localStorage.getItem('accessToken')?.trim()?.replace(/"/g, '');
    headers.set('Authorization', token);
    return api.get('/data',{headers: headers});
}


export const getTrackChangesData = async () =>{
    const headers: AxiosHeaders = new AxiosHeaders();
    const token = 'Bearer ' + localStorage.getItem('accessToken')?.trim()?.replace(/"/g, '')    ;
    headers.set('Authorization', token);
    return api.get('/track',{headers: headers});
}

