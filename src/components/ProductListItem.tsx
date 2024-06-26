import { StyleSheet,Text, View, Image, Pressable} from 'react-native';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';

type ProductListItemProps = {
  product:Tables<'products'>
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png'
const ProductListItem = ({product}:ProductListItemProps) =>{
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image resizeMode='contain' source={{uri:product.image || defaultPizzaImage}} style={styles.image}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      </Pressable>
      </Link>
  )
};
export default ProductListItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:20,
    flex:1,
    margin:5,
    maxWidth:'50%'
  },

  image:{
    width:'100%',
    aspectRatio:1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color:Colors.light.tint,
    fontWeight: 'bold',
  },
});
