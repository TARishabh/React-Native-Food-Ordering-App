import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ProductDetailsScreen = () => {
  const {id} = useLocalSearchParams();
  return (
    <View>
      <Text style={{fontSize: 30}}>ProductDetailsScreen id {id}</Text>
    </View>
  )
}

export default ProductDetailsScreen;