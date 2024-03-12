import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';

export default function OrderDetailsScreen() {
    const {id} = useLocalSearchParams();
    const order = orders.find((order)=>
        (order.id.toString()) === id.toString()
    )
    if (!order){
        return <Text>Order Id not Found</Text>
    }
  return (
    <View style={{padding:10, gap: 20}}> 
        <Stack.Screen options={{title:`Order #${id}`}}/>

        <OrderListItem order={order}/>

        <FlatList data={order.order_items} 
        renderItem={({item})=><OrderItemListItem item={item}/>}
        contentContainerStyle={{gap:10}} 
        scrollEnabled={true}/>
    </View>
  )
}