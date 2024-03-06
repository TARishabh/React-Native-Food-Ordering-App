import { StyleSheet,Text, View, Image} from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types';

type ProductListItemProps = {
  product:Product
}

const fallbackImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png'

const ProductListItem = ({product}:ProductListItemProps) =>{
  return (
    <View style={styles.container}>
      <Image source={{uri:product.image || fallbackImage}} style={styles.image}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
};
export default ProductListItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:20
  },

  image:{
    width:'100%',
    height:400,
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
