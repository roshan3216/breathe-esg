import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../../api/api";

interface User  {
    email: String,
    name: String,
    accessToken: String,
}


type InitialState = {
    loading :   boolean,
    user    :   User,
    error   :   string,
}


const initialState: InitialState = {
    loading: false,
    user: 
        {
            email: '',
            name: '',
            accessToken: '',
        },
    error: '',
}

export const loginThunk = createAsyncThunk('auth/loginThunk', async (payload: {email: string, password: string})=>{

    try {
        const resp = await loginUser(payload);
        return resp.data;

    } catch (err : any) {
        const response = err.response;
        console.log(response, '[response]-[loginThunk]');
        throw new Error(response.data);
    }
});

export const registerThunk = createAsyncThunk('auth/registerThunk', async (payload : {email: String, password: String, confirmPassword: String}) =>{

    try {
        const resp = await registerUser(payload);
        return resp.data;
    } catch (err : any) {
        const {response} = err;
        throw new Error(response.data);
    }
});

export const logoutThunk = createAsyncThunk('/auth/logoutThunk',async () => {
    try {
        const resp = await logoutUser ();
        console.log(resp.data,'[resp.data]-[logoutThunk]');
        // localStorage.removeItem('accessToken');
        return resp.data;
    } catch (error) {
        console.log(error, '[error]-[logout]');
        // localStorage.removeItem('accessToken');
        return new Error('Something went wrong');
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(loginThunk.pending,(state) =>{
            state.loading = true;
        });

        builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) =>{
            state.loading = false;
            console.log(action.payload, '[action.payload]-[loginThunk]');

            state.user.email = action.payload.email;
            state.user.name  = action.payload.name;
            state.user.accessToken = action.payload.accessToken;

            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            
        });

        builder.addCase(loginThunk.rejected, (state, action) =>{
            state.loading = false;

            state.error = action.error.message || 'Something went wrong';
            console.error(action.error, '[action.error]-[login.rejected]');

            console.log(action,'[action]-[login.rejected]');
        });


        builder.addCase(registerThunk.pending, (state) =>{
            state.loading = true;

        });

        builder.addCase(registerThunk.fulfilled, (state, action: PayloadAction<User>) =>{
            state.loading = false;
            state.user.email = action.payload.email;
            state.user.name  = action.payload.name;
            state.user.accessToken = action.payload.accessToken;

            localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));

        });

        builder.addCase(registerThunk.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });
        
        
        builder.addCase(logoutThunk.pending, (state) =>{
            state.loading = true;
        });

        builder.addCase(logoutThunk.fulfilled, (state) =>{
            state.loading = false;
            state.user.name = ''; 
            state.user.email = ''; 
            state.user.accessToken = '';
            localStorage.removeItem('accessToken');
        });

        builder.addCase(logoutThunk.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message || 'Something Went Wrong';
        })
    }
});


export default authSlice.reducer;
export const actions = authSlice.actions;
