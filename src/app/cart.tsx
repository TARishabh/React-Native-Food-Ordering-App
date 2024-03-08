import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItems';

const CartScreen = () => {
    const {items} = useCart();

  return (
    <View>
      {/* <Text>Cart Items Length: {items.length}</Text> */}
      <FlatList data={items} 
      renderItem={({item})=><CartListItem cartItem={item}/>}
      contentContainerStyle={{padding:10, gap:10}}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen;