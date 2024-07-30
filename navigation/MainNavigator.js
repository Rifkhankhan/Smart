import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AdminNavigator } from './Admin/AdminNavigators'
import { SellerNavigators } from './Client/ClientNavigators'
import { CustomerNavigators } from './Customer/CustomerNavigator'

import { KeyboardAvoidingView, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

AsyncStorage.clear()

const MainNavigator = props => {
	const { authData } = useSelector(state => state.auth)

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			{authData.role === 'admin' && <AdminNavigator />}
			{authData.role === 'shop' && <SellerNavigators />}
			{authData.role === 'customer' && <CustomerNavigators />}
		</KeyboardAvoidingView>
	)
}

export default MainNavigator
