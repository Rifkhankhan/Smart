import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		authData: null,
		didTryAutoLogin: false
	},
	reducers: {
		authenticate: (state, action) => {
			const { payload } = action
			state.token = payload.token
			state.authData = payload.userData
			state.didTryAutoLogin = true
		},
		setDidTryAutoLogin: (state, action) => {
			state.didTryAutoLogin = true
		},
		logout: (state, action) => {
			state.token = null
			state.authData = null
			state.didTryAutoLogin = false
		},
		updateLoggedInUserData: (state, action) => {
			state.authData = { ...state.authData, ...action.payload.newData }
		},
		setShopKey: (state, action) => {
			state.authData['shopKey'] = action.payload
		}
	}
})
export const {
	setDidTryAutoLogin,
	authenticate,
	updateLoggedInUserData,
	logout,
	setShopKey
} = authSlice.actions

export default authSlice.reducer


// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     authData: null,
//     didTryAutoLogin: false,
//   },
//   reducers: {
//     authenticate: (state, { payload }) => {
//       const { token, userData } = payload;
//       state.token = token;
//       state.authData = userData;
//       state.didTryAutoLogin = true;
//     },
//     setDidTryAutoLogin: (state) => {
//       state.didTryAutoLogin = true;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.authData = null;
//       state.didTryAutoLogin = false;
//     },
//     updateLoggedInUserData: (state, { payload }) => {
//       if (state.authData) {
//         // Only update the necessary fields, avoiding a full deep copy of the object
//         Object.assign(state.authData, payload.newData);
//       }
//     },
//     setShopKey: (state, { payload }) => {
//       if (state.authData) {
//         state.authData.shopKey = payload;
//       }
//     },
//   },
// });

// export const { setDidTryAutoLogin, authenticate, updateLoggedInUserData, logout, setShopKey } = authSlice.actions;

// export default authSlice.reducer;
