import React, { useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigator from './MainNavigator'
import AuthScreen from '../screens/AuthScreen'
import { useSelector } from 'react-redux'
import StartUpScreen from '../screens/StartUpScreen'
import BuyNowBottomSheet from '../components/BuyNowBottomSheet'

// Memoize components to avoid unnecessary re-renders
const MemoizedBuyNowBottomSheet = React.memo(BuyNowBottomSheet)
const MemoizedMainNavigator = React.memo(MainNavigator)
const MemoizedAuthScreen = React.memo(AuthScreen)
const MemoizedStartUpScreen = React.memo(StartUpScreen)


const AppNavigator = props => {
	const isAuth = useSelector(
		state => state.auth.token !== null && state.auth.token !== ''
	)
	const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)

  // Memoize rendering logic to avoid recalculating unnecessary conditions
  // const screenToRender = useMemo(() => {
  //   // if (isAuth) {
  //   //   return <MemoizedBuyNowBottomSheet />
  //   // }
  //   if (!isAuth && didTryAutoLogin) {
  //     return <MemoizedAuthScreen />
  //   }
  //   if (!isAuth && !didTryAutoLogin) {
  //     return <MemoizedStartUpScreen />
  //   }
  //   return null
  // }, [isAuth, didTryAutoLogin])

	return (
		<NavigationContainer>
			{/* bottomSheet */}

			{isAuth && <MemoizedBuyNowBottomSheet />}
			{isAuth && <MemoizedMainNavigator />}
			{!isAuth && didTryAutoLogin && <MemoizedAuthScreen />}
			{!isAuth && !didTryAutoLogin && <MemoizedStartUpScreen />}
  
		</NavigationContainer>
	)
}

export default AppNavigator






// const AppNavigator = props => {


//   return (
//     <NavigationContainer>
//       {isAuth && <MemoizedBuyNowBottomSheet />}
//       {isAuth && <MemoizedMainNavigator />}
//       {screenToRender}
//     </NavigationContainer>
//   )
// }

// export default AppNavigator
