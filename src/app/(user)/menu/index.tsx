import { View, FlatList, ActivityIndicator} from 'react-native';
import ProductListItem from '@/components/ProductListItem';
import { Text } from 'react-native-elements';
import { useProductList } from '@/api/products';


export default function MenuScreen() {

  const {data:products,error,isLoading} = useProductList();

  if (isLoading){
    return <ActivityIndicator/>
  }
  if (error){
    <Text>Failed to Fetch</Text>
  }

  return (
    <View>
      {/* <ProductListItem product={products[5]}/>
      <ProductListItem product={products[3]}/> */}
    <FlatList data={products} 
    renderItem={({item})=> <ProductListItem product={item}/>}
    numColumns={2}
    contentContainerStyle={{gap: 10, padding: 10}}
    columnWrapperStyle={{gap:10}}
    />
    
    </View>    
  );
}
