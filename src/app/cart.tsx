import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItems';
import Button from '@/components/Button';

const CartScreen = () => {
    const {items,total,checkout} = useCart();

  return (
    <View style={{padding:10}} >
      {/* <Text>Cart Items Length: {items.length}</Text> */}
      <FlatList data={items} 
      renderItem={({item})=><CartListItem cartItem={item}/>}
      contentContainerStyle={{gap:10}}
      />
      <Text style={{marginTop:20, fontSize:20, fontWeight:'500'}} >Total: ${total}</Text>
      <Button onPress={checkout}  text='checkout'/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen;