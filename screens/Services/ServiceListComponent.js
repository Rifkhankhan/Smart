import React from 'react'
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import ServicesCard from './ServicesCard';
import { StyleSheet, Text } from 'react-native';
import quickdelivery from './../../assets/images/service/quickdelivery.jpg'
import rent from './../../assets/images/service/rent.jpg'
import homemadethings from './../../assets/images/service/homemadethings.jpg'
import homemadefoods from './../../assets/images/service/homemadefood.jpg'
import { useNavigation } from '@react-navigation/native';

const ServiceListComponent = ({ title, subTitle }) => {
    const navigation = useNavigation()
    const onPressHandler = () => {
		navigation.navigate('ServiceListPage')
	}
    
	 const services = [{
            id:1,
            name:'Quick Delivery',
            availability:'yes',
            chargePerKM : 150,
            oldChargePerKM:400,
    
            type:'delivery',
            contact:'2758569360',
            address:'45 main road,palamunai',
            image:quickdelivery
        },{
            id:2,
            name:'Home Food Make',
            availability:'yes',
            ChargePerItem:500,
            oldChargePerItem:400,
            type:'food making',
            duration:'3 days',
            contact:'2758569360',
            address:'45 main road,palamunai',
            image:homemadefoods
        },{
            id:3,
            name:'Home Made Things',
            availability:'yes',
            type:'things making',
            duration:'3 days',
            contact:'2758569360',
            address:'45 main road,palamunai',
            image:homemadethings
        },{
            id:4,
            name:'Rent',
            availability:'yes',
            type:'things making',
            duration:'3 days',
            contact:'2758569360',
            address:'45 main road,palamunai',
            image:rent
        }]
	const renderItem = ({ item }) => <ServicesCard service={item} />;

  return  (
        <View style={styles.container}>
               <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={ onPressHandler}>
                            <Text  style={styles.subTitle}>
                                More Services 
                            </Text>
                        </TouchableOpacity>
                </View>
  
             <FlatList
                data={services} // Your array of services
                keyExtractor={(item, index) => index.toString()} // Ensure a unique key for each item
                horizontal // Enables horizontal scrolling
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                renderItem={renderItem}
                />
            );
        </View>
    )
}

export default ServiceListComponent



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        padding: 4,
        marginTop: 8,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 14 // For Android shadow
    },
    header: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 22,
        textTransform: 'capitalize',
        fontWeight: '700',
        color: '#333'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6F61' // Changed to a more modern color
    },
    list: {
        marginTop: 8 // Add some space between the header and the list
    },
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: 8 // Add some padding to the scroll container
    }
})
