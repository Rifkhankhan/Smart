export const products = [
	{
		name: 'Smartphone X500',
		description:
			'Latest smartphone with high-resolution display and powerful processor.',
		price: 699.99,
		category: 'Electronics',
		brand: 'TechMaster',
		stock: 150,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Smartphone Front' },
			{ url: 'https://via.placeholder.com/150', alt: 'Smartphone Back' }
		],
		ratings: [
			{
				userId: 'user001',
				rating: 5,
				review: 'Amazing performance and display.'
			}
		],
		comments: [
			{
				userId: 'user002',
				comment: "Best phone I've ever owned!",
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop001',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Bluetooth Speaker Pro',
		description:
			'Portable Bluetooth speaker with high sound quality and long battery life.',
		price: 89.99,
		category: 'Electronics',
		brand: 'SoundWave',
		stock: 200,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Bluetooth Speaker' },
			{ url: 'https://via.placeholder.com/150', alt: 'Speaker Features' }
		],
		ratings: [
			{
				userId: 'user003',
				rating: 4,
				review: 'Great sound quality, a bit bulky.'
			}
		],
		comments: [
			{
				userId: 'user004',
				comment: 'Perfect for parties.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop002',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Electric Toothbrush',
		description:
			'Rechargeable electric toothbrush with multiple brushing modes.',
		price: 49.99,
		category: 'Health & Beauty',
		brand: 'BrightSmile',
		stock: 300,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Electric Toothbrush' },
			{ url: 'https://via.placeholder.com/150', alt: 'Toothbrush Modes' }
		],
		ratings: [
			{ userId: 'user005', rating: 5, review: 'Makes brushing so much easier.' }
		],
		comments: [
			{
				userId: 'user006',
				comment: 'Very effective and gentle.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop003',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Air Fryer XL',
		description:
			'Large capacity air fryer with digital controls and multiple cooking presets.',
		price: 129.99,
		category: 'Home Appliances',
		brand: 'CookMaster',
		stock: 85,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Air Fryer XL' },
			{ url: 'https://via.placeholder.com/150', alt: 'Air Fryer Controls' }
		],
		ratings: [
			{ userId: 'user007', rating: 5, review: 'Fantastic for healthy cooking.' }
		],
		comments: [
			{
				userId: 'user008',
				comment: 'Great for making crispy snacks.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop004',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Leather Wallet',
		description:
			'Genuine leather wallet with multiple compartments for cards and cash.',
		price: 59.99,
		category: 'Accessories',
		brand: 'ClassicLeather',
		stock: 150,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Leather Wallet Front' },
			{ url: 'https://via.placeholder.com/150', alt: 'Wallet Compartments' }
		],
		ratings: [{ userId: 'user009', rating: 4, review: 'Stylish and durable.' }],
		comments: [
			{
				userId: 'user010',
				comment: 'Love the quality.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop005',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Running Shoes',
		description: 'Comfortable and lightweight running shoes with good grip.',
		price: 89.99,
		category: 'Footwear',
		brand: 'RunFast',
		stock: 200,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Running Shoes' },
			{ url: 'https://via.placeholder.com/150', alt: 'Shoe Side View' }
		],
		ratings: [
			{ userId: 'user011', rating: 5, review: 'Perfect for long runs.' }
		],
		comments: [
			{
				userId: 'user012',
				comment: 'Very comfortable.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop006',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Digital Thermometer',
		description: 'Quick and accurate digital thermometer with LCD display.',
		price: 19.99,
		category: 'Health & Beauty',
		brand: 'HealthTech',
		stock: 250,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Digital Thermometer' },
			{ url: 'https://via.placeholder.com/150', alt: 'Thermometer LCD Display' }
		],
		ratings: [
			{ userId: 'user013', rating: 4, review: 'Accurate and easy to use.' }
		],
		comments: [
			{
				userId: 'user014',
				comment: 'Great for home use.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop007',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Office Desk Chair',
		description:
			'Ergonomic office desk chair with adjustable height and lumbar support.',
		price: 159.99,
		category: 'Furniture',
		brand: 'ComfortChair',
		stock: 70,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Office Desk Chair' },
			{ url: 'https://via.placeholder.com/150', alt: 'Chair Adjustments' }
		],
		ratings: [
			{
				userId: 'user015',
				rating: 5,
				review: 'Very comfortable for long hours.'
			}
		],
		comments: [
			{
				userId: 'user016',
				comment: 'Perfect for my home office.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop008',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Smartwatch Z100',
		description:
			'Smartwatch with fitness tracking, notifications, and heart rate monitoring.',
		price: 199.99,
		category: 'Electronics',
		brand: 'TechWear',
		stock: 90,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Smartwatch Z100' },
			{ url: 'https://via.placeholder.com/150', alt: 'Smartwatch Features' }
		],
		ratings: [
			{
				userId: 'user017',
				rating: 5,
				review: 'Great for tracking workouts and staying connected.'
			}
		],
		comments: [
			{
				userId: 'user018',
				comment: 'Amazing features for the price.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop009',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Yoga Mat',
		description: 'Non-slip yoga mat with extra cushioning for comfort.',
		price: 29.99,
		category: 'Fitness',
		brand: 'FlexiYoga',
		stock: 120,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Yoga Mat' },
			{ url: 'https://via.placeholder.com/150', alt: 'Mat Texture' }
		],
		ratings: [
			{
				userId: 'user019',
				rating: 4,
				review: 'Good quality mat, but a bit bulky to carry.'
			}
		],
		comments: [
			{
				userId: 'user020',
				comment: 'Great for yoga and stretching.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop010',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Leather Backpack',
		description:
			'Stylish leather backpack with multiple compartments and adjustable straps.',
		price: 139.99,
		category: 'Accessories',
		brand: 'UrbanLeather',
		stock: 80,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Leather Backpack' },
			{ url: 'https://via.placeholder.com/150', alt: 'Backpack Compartments' }
		],
		ratings: [
			{ userId: 'user021', rating: 5, review: 'Stylish and spacious.' }
		],
		comments: [
			{
				userId: 'user022',
				comment: 'Perfect for daily use.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop011',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Kitchen Knife Set',
		description:
			'Professional kitchen knife set with durable stainless steel blades.',
		price: 89.99,
		category: 'Home Appliances',
		brand: 'SharpEdge',
		stock: 65,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Kitchen Knife Set' },
			{ url: 'https://via.placeholder.com/150', alt: 'Knife Blades' }
		],
		ratings: [
			{
				userId: 'user023',
				rating: 4,
				review: 'Good set of knives for the price.'
			}
		],
		comments: [
			{
				userId: 'user024',
				comment: 'Very sharp and reliable.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop012',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Gaming Mouse',
		description:
			'High-precision gaming mouse with customizable buttons and RGB lighting.',
		price: 69.99,
		category: 'Electronics',
		brand: 'GamePro',
		stock: 110,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Gaming Mouse' },
			{ url: 'https://via.placeholder.com/150', alt: 'Mouse RGB Lighting' }
		],
		ratings: [
			{
				userId: 'user025',
				rating: 5,
				review: 'Excellent for gaming, responsive and comfortable.'
			}
		],
		comments: [
			{
				userId: 'user026',
				comment: 'Great mouse for esports.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop013',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Electric Grill',
		description: 'Compact electric grill with adjustable temperature control.',
		price: 119.99,
		category: 'Home Appliances',
		brand: 'GrillMaster',
		stock: 95,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Electric Grill' },
			{ url: 'https://via.placeholder.com/150', alt: 'Grill Cooking' }
		],
		ratings: [
			{
				userId: 'user027',
				rating: 5,
				review: 'Easy to use and clean. Perfect for grilling indoors.'
			}
		],
		comments: [
			{
				userId: 'user028',
				comment: 'Great for quick meals.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop014',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Travel Mug',
		description:
			'Insulated travel mug with spill-proof lid and easy-grip handle.',
		price: 24.99,
		category: 'Home Appliances',
		brand: 'TravelMate',
		stock: 180,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Travel Mug' },
			{ url: 'https://via.placeholder.com/150', alt: 'Mug Lid' }
		],
		ratings: [
			{ userId: 'user029', rating: 4, review: 'Keeps my coffee hot for hours.' }
		],
		comments: [
			{
				userId: 'user030',
				comment: 'Perfect for my commute.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop015',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Wireless Earbuds',
		description:
			'Compact wireless earbuds with noise cancellation and long battery life.',
		price: 79.99,
		category: 'Electronics',
		brand: 'SoundBuds',
		stock: 140,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Wireless Earbuds' },
			{ url: 'https://via.placeholder.com/150', alt: 'Earbuds Charging Case' }
		],
		ratings: [
			{
				userId: 'user031',
				rating: 5,
				review: 'Excellent sound quality and battery life.'
			}
		],
		comments: [
			{
				userId: 'user032',
				comment: 'Very comfortable and great for workouts.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop016',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Blender Pro',
		description:
			'High-power blender with multiple speed settings and a durable glass jar.',
		price: 99.99,
		category: 'Home Appliances',
		brand: 'BlendMaster',
		stock: 75,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Blender Pro' },
			{ url: 'https://via.placeholder.com/150', alt: 'Blender Glass Jar' }
		],
		ratings: [
			{
				userId: 'user033',
				rating: 4,
				review: 'Great for smoothies, a bit noisy.'
			}
		],
		comments: [
			{
				userId: 'user034',
				comment: 'Love the power and durability.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop017',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Fitness Tracker',
		description:
			'Wearable fitness tracker with heart rate monitoring and step counting.',
		price: 59.99,
		category: 'Fitness',
		brand: 'FitTrack',
		stock: 100,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Fitness Tracker' },
			{ url: 'https://via.placeholder.com/150', alt: 'Tracker Display' }
		],
		ratings: [
			{
				userId: 'user035',
				rating: 4,
				review: 'Accurate tracking and easy to use.'
			}
		],
		comments: [
			{
				userId: 'user036',
				comment: 'Great for monitoring workouts.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop018',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Portable Charger',
		description:
			'High-capacity portable charger with fast charging capability.',
		price: 39.99,
		category: 'Electronics',
		brand: 'PowerBoost',
		stock: 220,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Portable Charger' },
			{ url: 'https://via.placeholder.com/150', alt: 'Charger Ports' }
		],
		ratings: [
			{ userId: 'user037', rating: 5, review: 'Very handy and reliable.' }
		],
		comments: [
			{
				userId: 'user038',
				comment: 'Great for traveling.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop019',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Camping Tent',
		description: 'Durable camping tent with waterproof fabric and easy setup.',
		price: 159.99,
		category: 'Outdoor',
		brand: 'OutdoorGear',
		stock: 60,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Camping Tent' },
			{ url: 'https://via.placeholder.com/150', alt: 'Tent Setup' }
		],
		ratings: [
			{ userId: 'user039', rating: 4, review: 'Spacious and easy to assemble.' }
		],
		comments: [
			{
				userId: 'user040',
				comment: 'Perfect for camping trips.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop020',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Electric Kettle',
		description:
			'Fast-boiling electric kettle with automatic shut-off and temperature control.',
		price: 34.99,
		category: 'Home Appliances',
		brand: 'QuickBoil',
		stock: 150,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Electric Kettle' },
			{
				url: 'https://via.placeholder.com/150',
				alt: 'Kettle Temperature Control'
			}
		],
		ratings: [
			{
				userId: 'user041',
				rating: 5,
				review: 'Boils water quickly and efficiently.'
			}
		],
		comments: [
			{
				userId: 'user042',
				comment: 'Great for making tea.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop021',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Bluetooth Headphones',
		description:
			'Wireless Bluetooth headphones with noise cancellation and long battery life.',
		price: 129.99,
		category: 'Electronics',
		brand: 'SoundBliss',
		stock: 80,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Bluetooth Headphones' },
			{
				url: 'https://via.placeholder.com/150',
				alt: 'Headphones Noise Cancellation'
			}
		],
		ratings: [
			{
				userId: 'user043',
				rating: 5,
				review: 'Excellent sound and noise cancellation.'
			}
		],
		comments: [
			{
				userId: 'user044',
				comment: 'Perfect for music lovers.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop022',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Cordless Drill',
		description:
			'Powerful cordless drill with multiple speed settings and accessories.',
		price: 89.99,
		category: 'Tools',
		brand: 'DrillMaster',
		stock: 45,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Cordless Drill' },
			{ url: 'https://via.placeholder.com/150', alt: 'Drill Accessories' }
		],
		ratings: [
			{ userId: 'user045', rating: 4, review: 'Great for DIY projects.' }
		],
		comments: [
			{
				userId: 'user046',
				comment: 'Powerful and reliable.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop023',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Wireless Keyboard',
		description:
			'Compact wireless keyboard with backlit keys and rechargeable battery.',
		price: 49.99,
		category: 'Electronics',
		brand: 'TypeMaster',
		stock: 100,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Wireless Keyboard' },
			{ url: 'https://via.placeholder.com/150', alt: 'Keyboard Backlight' }
		],
		ratings: [
			{ userId: 'user047', rating: 5, review: 'Great for typing in low light.' }
		],
		comments: [
			{
				userId: 'user048',
				comment: 'Very comfortable to type on.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop024',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Coffee Maker',
		description:
			'Drip coffee maker with programmable timer and keep-warm function.',
		price: 69.99,
		category: 'Home Appliances',
		brand: 'BrewMaster',
		stock: 140,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Coffee Maker' },
			{ url: 'https://via.placeholder.com/150', alt: 'Coffee Maker Features' }
		],
		ratings: [
			{
				userId: 'user049',
				rating: 4,
				review: 'Brews great coffee, a bit noisy.'
			}
		],
		comments: [
			{
				userId: 'user050',
				comment: 'Perfect for my morning routine.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop025',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	},
	{
		name: 'Electric Blanket',
		description:
			'Soft electric blanket with adjustable heat settings for comfort.',
		price: 89.99,
		category: 'Home Appliances',
		brand: 'CozyWarm',
		stock: 60,
		images: [
			{ url: 'https://via.placeholder.com/150', alt: 'Electric Blanket' },
			{ url: 'https://via.placeholder.com/150', alt: 'Blanket Heat Settings' }
		],
		ratings: [
			{ userId: 'user051', rating: 5, review: 'Keeps me warm on cold nights.' }
		],
		comments: [
			{
				userId: 'user052',
				comment: 'Very cozy and warm.',
				timestamp: '2024-07-21T00:00:00Z'
			}
		],
		shopId: 'shop026',
		createdAt: '2024-07-21T00:00:00Z',
		updatedAt: '2024-07-21T00:00:00Z'
	}
]

const productModel = {
	name: 'Product Name',
	description: 'Detailed description of the product',
	price: 29.99,
	category: 'Electronics',
	brand: 'Brand Name',
	stock: 100,
	images: [
		{
			url: 'https://example.com/image1.jpg',
			alt: 'Image description'
		},
		{
			url: 'https://example.com/image2.jpg',
			alt: 'Image description'
		}
	],
	ratings: [
		{
			userId: 'user123',
			rating: 5,
			review: 'Great product!'
		},
		{
			userId: 'user456',
			rating: 4,
			review: 'Good value for the price.'
		}
	],
	comments: [
		{
			userId: 'user789',
			comment: 'This product is amazing!',
			timestamp: '2024-07-21T00:00:00Z'
		}
	],
	shopId: 'shop123',
	createdAt: '2024-07-21T00:00:00Z',
	updatedAt: '2024-07-21T00:00:00Z'
}
