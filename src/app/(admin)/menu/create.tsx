import { View, Text, StyleSheet, TextInput, Image, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const {id:idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
    const isUpdating = !!id;
    const {mutate: insertProduct} = useInsertProduct()
    const {mutate: UpdateProduct} = useUpdateProduct()
    const router = useRouter();
    const {data: updatingProduct} = useProduct(id);
    const {mutate: DeleteProduct} = useDeleteProduct();
    useEffect(()=>{
        if (updatingProduct){
            setName(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    },[updatingProduct])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors('Name is Required');
            return false;
        }
        if (!price) {
            setErrors('Price is Required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a Number');
            return false;
        }
        return true;
    }
    const onSubmit= () =>{
        if (isUpdating){
            onUpdateCreate()
        } else {
            onCreate()
        }
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }
        // Save in Database
        insertProduct({name,price:parseFloat(price),image},{
            onSuccess:()=>{
                resetFields();
                router.back();
            }
        })
        console.warn("Creating Product");
    }

    const onUpdateCreate = () => {
        if (!validateInput()) {
            return;
        }
        UpdateProduct({id,name,price:parseFloat(price),image},
        {onSuccess:()=>{
            resetFields();
            router.back();
        }}
        )
        console.warn("Updating Product");
        // Save in Database
    }

    const onDelete = () =>{
        DeleteProduct(id,{
            onSuccess:()=>{
                resetFields();
                router.replace('/(admin)')
            }
        })
        console.warn("Delete Item?")
    }
    const onConfirmation = () =>{
        Alert.alert('Confirm','Are you sure you want to delete this product?',[
            {
                text:'Cancel',
            },{
                text:'Delete',
                style:'destructive',
                onPress:onDelete,
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title:isUpdating ? 'Update Product' :'Create Product',headerTitleAlign: 'center',}} />
            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input} />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder='$9.99' style={styles.input} keyboardType='numeric' />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button text={isUpdating ? 'Update': 'Create'} onPress={onSubmit} />
            {isUpdating && <Text onPress={onConfirmation} style={styles.textButton}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'grey',
        fontSize: 16,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton:{
        alignSelf:'center',
        fontWeight:'bold',
        color:Colors.light.tint,
        marginVertical:10
    }
})

export default CreateProductScreen;