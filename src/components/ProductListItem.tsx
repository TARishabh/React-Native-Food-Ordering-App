import { StyleSheet,Text, View, Image, Pressable} from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Link } from 'expo-router';

type ProductListItemProps = {
  product:Product
}

const fallbackImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png'

const ProductListItem = ({product}:ProductListItemProps) =>{
  return (
    <Link href={`${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image resizeMode='contain' source={{uri:product.image || fallbackImage}} style={styles.image}/>
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
