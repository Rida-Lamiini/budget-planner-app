import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { supabase } from '../../utils/SupabaseConfig';
import { useRouter } from 'expo-router';

export default function CourseInfo({ categoryData }) {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  const router = useRouter()

  const calculateTotalPerc = () => {
    let total = 0;
    categoryData.CategoryItems.forEach(element => {
      total += element.coast; 
    });
    setTotalCost(total);

    let perc = (total / categoryData.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }

    setPercTotal(perc);
  };

  const onDelete = async (categoryId) => {
    try {
      // Confirm deletion
      Alert.alert(
        "Delete Category",
        "Are you sure you want to delete this category?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            style:'destructive',
            onPress: async () => {
              const { data, error } = await supabase
                .from('Category')
                .delete()
                .eq('id', categoryId);

              if (error) {
                Alert.alert("Error", error.message);
              } else {
                Alert.alert("Success", "Category deleted successfully");
                // Optionally, you can navigate back or update the state to reflect changes
                // For example: router.replace("/categories");
                router.replace('/(tabs)')
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    calculateTotalPerc();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: categoryData.color }]}>
          <Text style={styles.iconText}>{categoryData.icon}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.categoryName}>{categoryData.name}</Text>
          <Text>{categoryData.CategoryItems.length} Items</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(categoryData.id)} style={styles.deleteButton}>
          <AntDesign name="delete" size={24} color={Colors.RED} />
        </TouchableOpacity>
      </View>
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetText}>${totalCost}</Text>
        <Text style={styles.budgetAmount}>Total Budget: ${categoryData.assigned_budget}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarSubContainer, { width: `${percTotal}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
    color: Colors.WHITE,
  },
  infoContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  budgetText: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },
  budgetAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.GREEN,
  },
  progressBarContainer: {
    width: '100%',
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 10,
  },
  progressBarSubContainer: {
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
});
