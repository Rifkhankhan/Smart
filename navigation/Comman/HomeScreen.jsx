export const HomeOverView = () => {
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
