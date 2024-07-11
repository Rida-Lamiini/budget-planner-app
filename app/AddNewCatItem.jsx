import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Foundation } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { supabase } from '../utils/SupabaseConfig';
import uuid from 'react-native-uuid';
import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AddNewCatItem() {
  const [image, setImage] = useState('https://i.pinimg.com/564x/6a/f1/ec/6af1ec6645410a41d5339508a83b86f9.jpg');

  const {categoryId}  = useLocalSearchParams()
  const [itemName, setItemName] = useState('');
  const [cost, setCost] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [previewImage, setPreviewImage] = useState('https://i.pinimg.com/564x/6a/f1/ec/6af1ec6645410a41d5339508a83b86f9.jpg');
  const router = useRouter();
  const [loading,setLoading] = useState(false)


  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.7,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
      setPreviewImage(result.assets[0].uri);
    }
  };

  const onClickAdd = async () => {
    setLoading(true)

    const fileName = Date.now();
    
       const {data,error} = await supabase.storage.from('images').upload(fileName+'png' , decode(image),{
        contentType:'image/png'
       })
       if(data) {
        const fileUrl= 'https://jbfvkicqpepaklyozsis.supabase.co/storage/v1/object/public/images/'+fileName+'png';
        console.log(fileUrl);
        const {data,error} = await supabase.from('CategoryItems').insert([
            {name: itemName,
            coast: cost,
            url: url,
            image: fileUrl,
            note:note,
            category_Id: categoryId,
        }

        ]).select();
        console.log('file 55', data);
        setLoading(false)

        router.replace({
            pathname: '/CategoryDetails',
            params: {
              categoryId: categoryId, 
            },
          });

        

       }

        

       
       
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={onImagePick}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Foundation name="price-tag" size={24} color={Colors.GRAY} />
          <TextInput 
            placeholder='Item name' 
            style={styles.input} 
            value={itemName}
            onChangeText={setItemName}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Foundation name="price-tag" size={24} color={Colors.GRAY} />
          <TextInput 
            placeholder='Cost' 
            style={styles.input} 
            keyboardType='numeric' 
            value={cost}
            onChangeText={setCost}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Foundation name="link" size={24} color={Colors.GRAY} />
          <TextInput 
            placeholder='URL' 
            style={styles.input} 
            keyboardType='url' 
            value={url}
            onChangeText={setUrl}
          />
        </View>
        <View style={[styles.textInputContainer, styles.noteInputContainer]}>
          <Foundation name="clipboard-notes" size={24} color={Colors.GRAY} />
          <TextInput 
            placeholder='Note' 
            style={[styles.input, styles.noteInput]} 
            multiline 
            numberOfLines={4} 
            value={note}
            onChangeText={setNote}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onClickAdd}>
        {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Add</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  noteInputContainer: {
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
