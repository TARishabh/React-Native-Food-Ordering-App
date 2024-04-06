import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import OrderListItem from '@/components/OrderListItem'
import { useAdminOrderList } from '@/api/orders';


export default function OrderScreen() {

    const {data:orders, error, isLoading} =  useAdminOrderList({archived:true});

    if (isLoading){
        return <ActivityIndicator/>
    }
    
    if (error){
        return <Text>Failed to Fetch</Text>
    }
    
    return (
            <FlatList data={orders}
                renderItem={({item})=><OrderListItem order={item}/>}
                contentContainerStyle={{gap: 10, padding: 10}}/> 
    )
}

