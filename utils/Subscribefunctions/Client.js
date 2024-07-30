// get user Carts

import { child, onValue } from 'firebase/database'
import { setCarts } from '../../store/cartSlice'
import { setOrders } from '../../store/orderSlice'
import { setProducts } from '../../store/productSlice'
import { setOrderedUsers } from '../../store/userSlice'

export const getUserCarts = (dbRef, cartIdsRef, refs) => {
	return dispatch => {
		// Fetch user cart IDs
		onValue(cartIdsRef, cartSnapshot => {
			const rawCartData = cartSnapshot.val() || {}

			const cartsIds = Object.values(rawCartData)

			// Fetch products
			const productsRef = child(dbRef, 'products')
			refs.push(productsRef)

			onValue(productsRef, productsRefSnapshot => {
				const productsObjects = productsRefSnapshot.val() || {}

				// Flatten the nested products map
				const products = []
				for (const [shopKey, productsByShop] of Object.entries(
					productsObjects
				)) {
					for (const [productKey, productData] of Object.entries(
						productsByShop
					)) {
						// Only include products whose keys are in cartsIds

						if (cartsIds.includes(productKey)) {
							const key = findKeyByValue(rawCartData, productKey)
							if (key) {
								products.push({
									...productData,
									productKey,
									cartkey: key
								})
							}
						}
					}
				}

				// Dispatch the final cart data
				dispatch(setCarts({ carts: products }))
			})
		})
	}
}

// Function to find the key by value
function findKeyByValue(obj, value) {
	return Object.keys(obj).find(key => obj[key] === value)
}

// Function to find product by key
function findProductByKey(data, key) {
	for (const item of data) {
		if (item[key]) {
			return item
		}
	}
	return null
}

export const getProductOfaShop = productsRef => {
	return dispatch => {
		onValue(productsRef, productsSnapShot => {
			const productsObjects = productsSnapShot.val() || {}

			const products = []

			// Iterate over each product using Object.entries()
			Object.entries(productsObjects).forEach(([productKey, product]) => {
				// Add the productKey to the product data
				product['productKey'] = productKey
				products.push(product)
			})
			dispatch(setProducts({ products }))
		})
	}
}

export const getOrdersOfaShop = (dbRef, orderRef, orderId, refs) => {
	return dispatch => {
		// get orders for the shop
		// console.log(refs.length)

		onValue(orderRef, orderRefSnapshot => {
			const order = orderRefSnapshot.val() || {}
			dispatch(setOrders({ order: { ...order, orderKey: orderId } }))

			const userRef = child(dbRef, `users/${order?.uid}`)
			refs.push(userRef)

			const userAction = getOrderedUsers(userRef)
			dispatch(userAction)
		})
	}
}

export const getOrderedUsers = userRef => {
	return dispatch => {
		// get orders for the shop
		onValue(userRef, userRefSnapshot => {
			const user = userRefSnapshot.val() || {}

			dispatch(setOrderedUsers({ user }))
		})
	}
}
