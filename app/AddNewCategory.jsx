import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ToastAndroid, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker'; // Corrected import path
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { supabase } from '../utils/SupabaseConfig';
import { client } from '../utils/KindeConfig';
import { useRouter } from 'expo-router';

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState('Ic');
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const router = useRouter();
  const [loading,setLoading] = useState(false)


  const onCreateCategory = async () => {
    setLoading(true)
    const user = await client.getUserDetails();
    const { data, error } = await supabase.from('Category').insert([{
      name: categoryName,
      assigned_budget: totalBudget,
      icon: selectedIcon,
      color: selectedColor,
      created_by: user.email
    }]).select();
    
    setLoading(false)
    if (data) {

      router.replace({
        pathname:'/CategoryDetails',
        params:{
          categoryId: data[0].id
        }
      })
      ToastAndroid.show('Category Created', ToastAndroid.SHORT);

    } else {
      console.error(error);
      ToastAndroid.show('Failed to Create Category', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          value={selectedIcon}
          onChangeText={setSelectedIcon}
          maxLength={2}
          placeholder="Icon"
          placeholderTextColor={Colors.GRAY}
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </View>

      <View style={styles.categoryInputWrapper}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} style={styles.icon} />
        <TextInput
          style={styles.categoryInput}
          placeholder="Category Name"
          placeholderTextColor={Colors.GRAY}
          onChangeText={setCategoryName}
        />
      </View>
      <View style={styles.categoryInputWrapper}>
        <FontAwesome name="dollar" size={24} color={Colors.GRAY} style={styles.icon} />
        <TextInput
          style={styles.categoryInput}
          placeholder="Total Budget"
          placeholderTextColor={Colors.GRAY}
          keyboardType='numeric'
          onChangeText={setTotalBudget}
        />
      </View>
      <TouchableOpacity
        onPress={onCreateCategory}
        style={styles.button}
        disabled={!categoryName || !totalBudget}
      >
       
        {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 20, color: Colors.WHITE }}>Create</Text>          )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,
    marginBottom: 10,
  },
  categoryInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
  },
  icon: {
    marginRight: 10,
  },
  categoryInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    color: 'black',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  }
});
