import { StyleSheet,Text, View, Image} from 'react-native';
import Colors from '@/constants/Colors';
import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';

const product = products[0];

const productListItemType = {
  product:1
}

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[5]}/>
      <ProductListItem product={products[3]}/>
    </View>    
  );
}
