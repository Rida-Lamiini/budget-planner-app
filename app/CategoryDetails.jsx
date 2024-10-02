import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../utils/SupabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemList from '../components/CourseDetail/CourseItemList';
import Colors from '../utils/Colors';

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (categoryId) {
      getCategoryDetail();
    }
  }, [categoryId]);

  const getCategoryDetail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('Category')
        .select('*, CategoryItems(*)')
        .eq('id', categoryId)
        .single();

      if (error) {
        console.error('Error fetching category details:', error.message);
      } else {
        console.log('Category Details:', data.id);
        setCategoryDetail(data);
      }
    } catch (error) {
      console.error('Error getting category detail:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.replace('/(tabs)');
  };

  if (loading || !categoryDetail) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-sharp" size={44} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryDetail} />
     <CourseItemList categoryData={categoryDetail}/> 
     <Link
     href={{
      pathname:'/AddNewCatItem',
      params:{
        categoryId:categoryDetail.id
      }

     }}
     
      style={styles.floatingbtn}
     >
      <Ionicons name="add-circle-outline" size={54} color={Colors.PRIMARY} />
     </Link>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  floatingbtn:{
    position:'absolute',
    bottom:20,
    right:16
  }
});
