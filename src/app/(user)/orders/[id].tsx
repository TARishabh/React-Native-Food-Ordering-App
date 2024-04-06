import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { useOrder } from '@/api/orders';

export default function OrderDetailsScreen() {
    const {id:idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
    const {data:order,error,isLoading} = useOrder(id);

    if (isLoading){
      return <ActivityIndicator/>
    }

    if (error){
      <Text>Failed to Fetch</Text>
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