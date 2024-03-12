import { View, Text, FlatList } from 'react-native'
import React from 'react'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
export default function OrderScreen() {
    return (
            <FlatList data={orders}
                renderItem={({item})=><OrderListItem order={item}/>}
                // numColumns={2}
                contentContainerStyle={{gap: 10, padding: 10}}/> 
                // columnWrapperStyle={{gap:10}}
    )
}