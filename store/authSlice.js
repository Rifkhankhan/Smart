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
