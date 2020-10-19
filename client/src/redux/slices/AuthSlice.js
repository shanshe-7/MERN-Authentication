import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const jwtToken = localStorage.getItem('JWT_Token');
axios.defaults.headers.common['Authorization'] = jwtToken;

export const userSignUp = createAsyncThunk(
    'users/signUp',
    async (data) => {
        const response = await axios.post('https://mernauthentication.herokuapp.com/users/signup', data);
        localStorage.setItem('JWT_Token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        return response;
    }
);


export const userSignIn = createAsyncThunk(
    'users/signIn',
    async (data) => {
        const response = await axios.post('https://mernauthentication.herokuapp.com/users/signin', data);
        localStorage.setItem('JWT_Token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        return response;
    }
);


export const getSecretData = createAsyncThunk(
    'users/getSecretData',
    async () => {
        const response = await axios.get('https://mernauthentication.herokuapp.com/users/secret');
        return response;
    }
);



const AuthSlice = createSlice({
    name: 'Auth',
    initialState:
    {
        JWTToken: jwtToken,
        errorMessage: '',
        isSign: jwtToken ? true : false,
        secret: ''
    },
    reducers: {
        signOuth: {
            reducer: state => {
                localStorage.removeItem('JWT_Token');
                axios.defaults.headers.common['Authorization'] = '';
                return { ...state, isSign: false, JWTToken: '' }
            }
        },

        clearErrosMessages: {
            reducer: state => {
                return { ...state, isSign: false, errorMessage: '' }
            }
        }

    },
    extraReducers: {
        [userSignUp.fulfilled]: (state, action) => {
            if (action.payload) {
                return { ...state, isSign: true, errorMessage: '' };
            }
        },
        [userSignUp.rejected]: (state, action) => {
            return { ...state,  isSign: false, errorMessage: action.error.message };
        },
        

        [userSignIn.fulfilled]: state => {
            return { ...state,  isSign: true, errorMessage: '' };

        },
        
        [userSignIn.rejected]: (state, action) => {
            return { ...state,  isSign: false, errorMessage: action.error.message };
        },

        [getSecretData.fulfilled]: (state, action) => {
            return { ...state,  isSign: true, secret: action.payload.data.secret }
        },
       
        [getSecretData.rejected]: (state, action) => {
            return {...state, errorMessage: action.error.message}
        }

    }

});

export const { signOuth, setData, clearErrosMessages } = AuthSlice.actions;
export default AuthSlice.reducer;