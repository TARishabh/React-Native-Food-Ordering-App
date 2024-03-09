import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { fallbackImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
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

    const onCreate = () => {
        console.warn("Creating Product");
        if (!validateInput()) {
            return;
        }
        // Save in Database
        resetFields();
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: image || fallbackImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input} />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder='$9.99' style={styles.input} keyboardType='numeric' />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button text='Create' onPress={onCreate} />
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