import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams,Stack, useRouter, Link } from 'expo-router'
import products from '@assets/data/products'
import { fallbackImage } from '@/components/ProductListItem'
import { useState } from 'react'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const sizes:PizzaSize[] = ['S','M','L','XL']

const ProductDetailsScreen = () => {
  const {id} = useLocalSearchParams();
  const {addItem} = useCart();
  const [selectedSize,setSelectedSize] = useState<PizzaSize>('M');
  const product = products.find((p)=>p.id.toString() === id);

  const router = useRouter();
  const addToCart = () =>{
    // console.warn('Adding to cart, size:', selectedSize);
    if (!product){
      return;
    }
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (!product){
    return <Text>Product Not Found !</Text>
  }
  return (
    <View style={styles.container}>
            <Stack.Screen options={{ title: 'Menu',
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )}} />
      <Stack.Screen options={{title:product.name}}/>
      <Image source={{uri:product.image || fallbackImage}} style={styles.image} />
      <Text style={styles.title}>${product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    padding:10,
  },
  image:{
    width:'100%',
    aspectRatio: 1,
  },
  price:{
    fontSize: 18,
    fontWeight:'bold',
  },
  title:{
    fontSize: 22,
    fontWeight:'bold',
  },
})

export default ProductDetailsScreen;