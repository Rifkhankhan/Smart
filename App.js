import React, { useCallback, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LogBox, StatusBar as RNStatusBar, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './store/store'

// Ignore specific logs
LogBox.ignoreLogs(['AsyncStorage has been extracted'])

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync()

export default function App() {
	const [appIsLoaded, setAppIsLoaded] = useState(false)

	useEffect(() => {
		const prepare = async () => {
			try {
				await Font.loadAsync({
					black: require('./assets/fonts/Roboto-Black.ttf'),
					blackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
					bold: require('./assets/fonts/Roboto-Bold.ttf'),
					boldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
					italic: require('./assets/fonts/Roboto-Italic.ttf'),
					light: require('./assets/fonts/Roboto-Light.ttf'),
					lightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
					medium: require('./assets/fonts/Roboto-Medium.ttf'),
					mediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
					regular: require('./assets/fonts/Roboto-Regular.ttf'),
					thin: require('./assets/fonts/Roboto-Thin.ttf'),
					thinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf')
				})
			} catch (error) {
				console.error('Error loading fonts:', error)
			} finally {
				setAppIsLoaded(true)
			}
		}

		prepare()
	}, [])

	const onLayout = useCallback(async () => {
		if (appIsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [appIsLoaded])

	if (!appIsLoaded) {
		return null // Show nothing until the fonts are loaded
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			<Provider store={store}>
				<SafeAreaProvider style={styles.container} onLayout={onLayout}>
					<RNStatusBar barStyle="dark-content" backgroundColor="#fff" />
					<AppNavigator />
				</SafeAreaProvider>
			</Provider>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
