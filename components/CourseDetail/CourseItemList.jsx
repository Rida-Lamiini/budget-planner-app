import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';

export default function CourseItemList({ categoryData }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const shortenUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts.length > 2 ? `${urlParts[0]}//${urlParts[2]}` : url;
  };

  const handleUrlPress = (url) => {
    Linking.openURL(url);
    console.log(url);

  };

  const toggleExpandItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const onDeleteItem = async (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.from('CategoryItems').delete().eq('id', id);
              if (error) {
                throw error;
              }
              console.log(`Item with id ${id} deleted`);
              // Optionally, update local state or fetch updated data
            } catch (error) {
              console.error('Error deleting item:', error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Item List</Text>
      {categoryData.CategoryItems.length === 0 ? (
        <Text style={styles.noItemsText}>No items found.</Text>
      ) : (
        <View>
          {categoryData.CategoryItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => toggleExpandItem(index)} style={styles.itemHeader}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => handleUrlPress(item.url)}>
                    <Text style={styles.itemUrl}>{shortenUrl(item.url)}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemCost}>${item.coast}</Text>
              </TouchableOpacity>
              {expandedItem === index && (
                <View style={styles.itemExpanded}>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <Feather name="trash-2" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleUrlPress(item.url)}>
                    <FontAwesome name="external-link" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )}
              {index !== categoryData.CategoryItems.length - 1 && (
                <View style={styles.separator}></View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noItemsText: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemUrl: {
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  },
  itemCost: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  itemExpanded: {
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: Colors.GRAY,
    marginTop: 7,
  },
});
