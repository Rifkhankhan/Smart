import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateIdea from '../../screens/CreateIdea'
import ItemsList from '../../screens/ItemsList'
import AdminHome from './../../screens/AdminHome'
import ProductDetails from './../../screens/ProductDetails'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import {
	FontAwesome,
	FontAwesome6,
	Ionicons,
	MaterialCommunityIcons
} from '@expo/vector-icons'
import CustomerListPage from '../../screens/CustomersListPage'
import CreatePerson from '../../screens/CreatePerson'
import ViewPerson from '../../screens/ViewPerson'
import EditPerson from '../../screens/EditPerson'
import SellerListPage from '../../screens/SellerListPage'
import CreateShop from '../../screens/CreateShop'
import ViewShop from '../../screens/ViewShop'
import EditShop from '../../screens/EditShop'
import EditProduct from '../../screens/product/EditProduct'
import ViewProduct from '../../screens/product/ViewProduct'
import CreateProduct from '../../screens/product/CreateProduct'
import ProductListPage from '../../screens/product/ProductListPage'
import IconButton from '../../UI/IconButton'
import Orders from '../../screens/Orders'
import Account from '../../screens/Account'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export const CustomerNavigators = () => {
	return (
		<Tab.Navigator
			initialRouteName="HomeOverView"
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#333333' },
				tabBarActiveTintColor: 'white',
				tabBarShowLabel: false
			}}>
			<Tab.Screen
				name="HomeOverView"
				component={HomeOverView}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={24} color="{color}" />
					)
				}}
			/>
			<Tab.Screen
				name="Card"
				component={Card}
				options={{
					tabBarIcon: ({ color, size }) => {
						return <AntDesign name="shoppingcart" size={32} color={color} />
					}
				}}
			/>
			<Tab.Screen
				name="AccountOverView"
				component={AccountOverView}
				options={{
					tabBarIcon: ({ color, size }) => {
						return (
							<MaterialCommunityIcons name="account" size={32} color={color} />
						)
					}
				}}
			/>
		</Tab.Navigator>
	)
}

const HomeOverView = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: true,
					headerStyle: { backgroundColor: '#333333' },
					// headerTintColor:'white',
					// headerTitleAlign: 'left',
					headerTitle: '',
					// headerRight:,
					headerLeft: ({ size, color }) => {
						return (
							<Text
								style={{
									color: 'white',
									fontFamily: 'monospace',
									fontSize: 30,
									paddingInline: 10
								}}>
								Smart
							</Text>
						)
					},
					headerRight: ({ size, color }) => {
						return <IconButton name="search" color="white" size={24} />
					}
				}}
			/>

			<Stack.Screen
				name="ProductDetails"
				component={ProductDetails}
				options={{
					headerShown: false,
					// headerTransparent: true,

					// headerTintColor: 'white',
					// headerTitle: () => <SearchBar width="0.6" />,
					headerTitleAlign: 'left'
				}}
			/>
			<Stack.Screen
				name="ItemsList"
				component={ItemsList}
				options={{
					headerShown: true,
					// headerTransparent: true,
					headerStyle: { backgroundColor: '#333333' },
					headerTintColor: 'white',
					headerTitle: 'Gifts',
					// headerTitle: () => <SearchBar width="0.6" />,
					headerTitleAlign: 'left'
				}}
			/>
		</Stack.Navigator>
	)
}

const AccountOverView = () => {
	return (
		<Stack.Navigator initialRouteName="Account">
			<Stack.Screen
				name="Account"
				component={Account}
				options={{
					headerShown: true,
					tabBarActiveTintColor: 'white',
					headerTitle: 'Mohammed Rifkhan',
					headerStyle: { backgroundColor: '#8B008B' },
					headerTintColor: 'white',
					headerRight: ({ size, color }) => {
						return (
							<IconButton name="settings-outline" color="white" size={24} />
						)
					},
					headerLeft: () => {
						return (
							<IconButton
								name="add"
								size={24}
								color="red"
								backgroundColor={true}
							/>
						)
					}
				}}
			/>
			<Stack.Screen
				name="Orders"
				component={Orders}
				options={{
					headerShown: true,
					tabBarActiveTintColor: 'white',
					headerTitle: 'My Orders',
					headerStyle: { backgroundColor: 'white' },
					headerTintColor: 'black'
				}}
			/>
		</Stack.Navigator>
	)
}
