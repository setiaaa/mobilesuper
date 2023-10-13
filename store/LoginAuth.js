import { createSlice } from "@reduxjs/toolkit";
import { Login } from "../service/api";
import { setTokenValue } from "../service/session";

const LoginAuthSlice = createSlice({
    name: 'Login',
    initialState: {
        token: '',
        error: null,
        msg: ''
    },
    reducers: {
        setLogout: (state, action) => {
            state.token = '';
            state.error = null;
            state.msg = ''
        },
    },
    extraReducers(builder) {
        builder
            .addCase(Login.fulfilled, (state, action) => {
                setTokenValue(action.payload.token)
                state.token = action.payload;
                state.error = action.payload.error
                state.msg = action.payload.msg
                console.log('berhasil')
            })
            .addCase(Login.rejected, (state, action) => {
                console.log('gagal!')
                state.error = true
                state.msg = 'Username atau Password salah!'
            })
    }
})

export const {
    setLogout
} =
    LoginAuthSlice.actions;

export default LoginAuthSlice.reducer;