import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import { useRouter } from 'expo-router';

export default function CategoryList({ categoryList = [] }) {
  const router = useRouter();

  const onCategoryClick = (category) => {
    router.push({
      pathname: '/CategoryDetails',
      params: {
        categoryId: category.id, 
      },
    });
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onCategoryClick(item)} style={[styles.categoryContainer, { backgroundColor: item.color }]}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.categoryDetails}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.budget}>${item.assigned_budget}</Text>
        <Text style={styles.itemCount}>{item.CategoryItems.length} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latest Budget</Text>
      <FlatList
        data={categoryList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
  grid: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    flex: 1,
    margin: 5,
  },
  icon: {
    marginRight: 10,
    fontSize: 24,
    color: Colors.WHITE,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  budget: {
    fontSize: 16,
    color: Colors.WHITE,
  },
  itemCount: {
    fontSize: 14,
    color: Colors.WHITE,
  },
});
