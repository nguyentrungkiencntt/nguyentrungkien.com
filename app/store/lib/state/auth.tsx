import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthStateConfig{
    isLoggedIn: boolean,
    token: string | null,
    message: string | '',
}

const initialState: AuthStateConfig = {
    isLoggedIn: false,
    token: null,
    message: '',
}

// export const loginUser = createAsyncThunk<
//     string,
//     { username: string; password: string },
//     { rejectValue: string }
// >("auth/loginUser", async (credentials, { rejectWithValue }) => {
//     try {
//         const responsive = await apiLogin(credentials) as ResponseLogin;
//         if (responsive?.data?.error === 0 && responsive?.data?.access_token) {
//             await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}api/auth/loginweb`, {
//                 method: 'put',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });
//             const token = responsive?.data?.access_token;
//             localStorage.setItem("auth", JSON.stringify({ token, isLoggedIn: true }));
//             return token;
//         } else {
//             return rejectWithValue("Login failed");
//         }
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         return rejectWithValue("Network error");
//     }
// });


// export const getUserCurrent = createAsyncThunk<
//     string,
//     void,
//     { rejectValue: string }
// >("auth/getCurrentUser", async (_, { rejectWithValue }) => {
//     try {
//         const response = await apiUserCurrent() as ResponseUser;


//         if (response?.data?.error === 0 && response?.data?.data?.codeUser) {
//             const codeUser = response.data.data.codeUser;
//             console.log('first')
//             localStorage.setItem("code", JSON.stringify({ code: codeUser }));
//             return codeUser;
//         } else {
//             return rejectWithValue("Failed to fetch user data");
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return rejectWithValue("Network error");
//     }
// });

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            localStorage.setItem("auth", JSON.stringify({ token: null, isLoggedIn: false }));
            Cookies.remove("code");
        },
        addCodeUser(state, action) {

            state.message = 'Save code User'
            document.cookie = `code=${action.payload};path=/`
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginUser.fulfilled, (state, action) => {
    //             state.isLoggedIn = true;
    //             state.message = 'Logined'
    //             state.token = action.payload;
    //         })
    //         .addCase(getUserCurrent.fulfilled, (state, action) => {
    //             state.userId = action.payload;
    //             state.message = 'Get user code success'
    //         })

    // }
})

export const { logout, addCodeUser } = AuthSlice.actions;

export default AuthSlice.reducer;