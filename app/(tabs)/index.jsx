import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import services from '../../utils/services';
import { client } from '../../utils/KindeConfig';
import { supabase } from '../../utils/SupabaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';
import CircularChart from '../../components/CircularChart';
import AntDesign from '@expo/vector-icons/AntDesign';
import CategoryList from '../../components/CategoryList';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();


export default function Home() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategoryList = async () => {
    setLoading(true);
    try {
      const user = await client.getUserDetails();
      console.log(user);
      const { data, error } = await supabase
        .from('Category')
        .select('*,CategoryItems(*)')
        .eq('created_by', user.email);

      if (data) {
        setCategoryList(data);
      }

      if (error) {
        console.error('Error fetching categories:', error.message);
      } else {
        setCategoryList(data);
      }
    } catch (error) {
      console.error('Error getting category list:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const loggedOut = await client.logout();
      if (loggedOut) {
        await services.storeData('login', 'false');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const checkUserAuth = async () => {
    try {
      const store = await services.getData('login');
      console.log('rr',store);

      const result = await services.getData('login');
      console.log('User authenticated status:', result);
      if (result !== 'true') {
        console.log('User not authenticated, redirecting to login');
        router.replace('/login');
      } else {
        console.log('User authenticated, fetching category list');

        getCategoryList();
      }
    } catch (error) {
      console.error('Error checking user authentication:', error.message);
    }
  };
  
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getCategoryList}
            colors={[Colors.PRIMARY]} 
          />
        }
      >
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.chartContainer}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Link href={'/AddNewCategory'} style={styles.btnContainer}>
        <AntDesign name="pluscircleo" size={54} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: Colors.PRIMARY,
  },
  chartContainer: {
    flex: 1,
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
